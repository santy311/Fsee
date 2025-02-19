import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { Fsee } from "../target/types/fsee";
import { PublicKey, Connection, Keypair } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

const PRECISION = BigInt(10000); // 4 decimal places

export interface PriceResult {
    priceA: number;
    priceB: number;
    priceABigInt: bigint;
    priceBBigInt: bigint;
}

export interface TradeResult {
    inputAmountAfterFee: bigint;
    outputTokens: bigint;
    newPriceA: number;
    newPriceB: number;
    newSharesA: bigint;
    newSharesB: bigint;
}

export async function calculate_price_at_trade(
    connection: Connection,
    program: Program<Fsee>,
    market: PublicKey,
    input_amount: bigint,
    buying_yes: boolean,
    fee_percentage: number
): Promise<TradeResult> {
    const market_account = await program.account.market.fetch(market);
    const market_yes_ata = await getAssociatedTokenAddressSync(market_account.yesMint, market, true);
    const market_no_ata = await getAssociatedTokenAddressSync(market_account.noMint, market, true);
    const yes_pool_balance = BigInt((await connection.getTokenAccountBalance(market_yes_ata)).value.amount);
    const no_pool_balance = BigInt((await connection.getTokenAccountBalance(market_no_ata)).value.amount);

    // Input validation
    if (yes_pool_balance <= BigInt(0) || no_pool_balance <= BigInt(0)) {
        throw new Error('Pool balances must be positive');
    }
    if (input_amount <= BigInt(0)) {
        throw new Error('Input amount must be positive');
    }
    if (fee_percentage < 0 || fee_percentage > 0.05) {
        throw new Error('Fee must be between 0 and 5%');
    }

    // Calculate fee
    const fee_multiplier = BigInt(Math.floor((1 - fee_percentage) * Number(PRECISION)));
    const input_after_fee = (input_amount * fee_multiplier) / PRECISION;

    let new_shares_a: bigint;
    let new_shares_b: bigint;

    if (buying_yes) {
        new_shares_b = no_pool_balance + input_after_fee;
        new_shares_a = (yes_pool_balance * no_pool_balance) / new_shares_b;
        const output_tokens = yes_pool_balance - new_shares_a;
        const result = calculate_outcome_shares(new_shares_a, new_shares_b);

        return {
            inputAmountAfterFee: input_after_fee,
            outputTokens: output_tokens,
            newPriceA: result.priceA,
            newPriceB: result.priceB,
            newSharesA: new_shares_a,
            newSharesB: new_shares_b
        };
    } else {
        new_shares_a = yes_pool_balance + input_after_fee;
        new_shares_b = (yes_pool_balance * no_pool_balance) / new_shares_a;
        const output_tokens = no_pool_balance - new_shares_b;
        const result = calculate_outcome_shares(new_shares_a, new_shares_b);

        return {
            inputAmountAfterFee: input_after_fee,
            outputTokens: output_tokens,
            newPriceA: result.priceA,
            newPriceB: result.priceB,
            newSharesA: new_shares_a,
            newSharesB: new_shares_b
        };
    }
}

export async function get_price(
    connection: Connection,
    program: Program<Fsee>,
    market: PublicKey,
    lp: Keypair,
    market_creator: Keypair
): Promise<PriceResult> {
    const market_account = await program.account.market.fetch(market);
    const market_yes_ata = await getAssociatedTokenAddressSync(market_account.yesMint, market, true);
    const market_no_ata = await getAssociatedTokenAddressSync(market_account.noMint, market, true);
    const yes_pool_balance = BigInt((await connection.getTokenAccountBalance(market_yes_ata)).value.amount);
    const no_pool_balance = BigInt((await connection.getTokenAccountBalance(market_no_ata)).value.amount);

    return calculate_outcome_shares(yes_pool_balance, no_pool_balance);
}

export function calculate_outcome_shares(
    yes_pool_balance: bigint,
    no_pool_balance: bigint,
): PriceResult {
    if (yes_pool_balance <= BigInt(0) || no_pool_balance <= BigInt(0)) {
        throw new Error('Share amounts must be positive');
    }

    const totalShares = yes_pool_balance + no_pool_balance;
    const priceABigInt = (no_pool_balance * PRECISION) / totalShares;
    const priceBBigInt = (yes_pool_balance * PRECISION) / totalShares;
    const priceA = Number(priceABigInt) / Number(PRECISION);
    const priceB = Number(priceBBigInt) / Number(PRECISION);

    if (Math.abs(priceA + priceB - 1) > 0.0001) {
        throw new Error('Invalid prices - must sum to 1');
    }

    return {
        priceA,
        priceB,
        priceABigInt,
        priceBBigInt
    };
}

export async function print_all_accounts(
    connection: Connection,
    program: Program<Fsee>,
    market: PublicKey,
    market_creator: Keypair,
    lp: Keypair,
    buyer: Keypair,
    buyer_no: Keypair,
    USDC_MINT: PublicKey
) {
    const market_account = await program.account.market.fetch(market);
    
    // Get all ATAs and format data
    const accounts = await get_all_atas(connection, program, market, market_account, market_creator, lp, buyer, buyer_no, USDC_MINT);
    
    // Print market state
    console.log("\nMarket State:");
    console.log("Total Liquidity Shares:", formatUSDC(market_account.totalLiquidityShares.toString()));

    // Print balances table
    console.log("\nBalances:");
    console.table(accounts);
}

async function get_all_atas(
    connection: Connection,
    program: Program<Fsee>,
    market: PublicKey,
    market_account: any,
    market_creator: Keypair,
    lp: Keypair,
    buyer: Keypair,
    buyer_no: Keypair,
    USDC_MINT: PublicKey
) {
    // Helper function to get token account balances
    const getBalance = async (ata: any) => (await connection.getTokenAccountBalance(ata.address || ata)).value.amount;

    const [market_yes_ata, market_no_ata, market_usdc_ata] = await Promise.all([
        getAssociatedTokenAddressSync(market_account.yesMint, market, true),
        getAssociatedTokenAddressSync(market_account.noMint, market, true),
        getAssociatedTokenAddressSync(USDC_MINT, market, true)
    ]);

    // Get all account balances in parallel
    const accounts = await Promise.all([
        // Market accounts
        Promise.all([
            getBalance(market_yes_ata),
            getBalance(market_no_ata),
            getBalance(market_usdc_ata)
        ]),
        // Creator accounts
        Promise.all([
            getOrCreateAssociatedTokenAccount(connection, market_creator, market_account.yesMint, market_creator.publicKey),
            getOrCreateAssociatedTokenAccount(connection, market_creator, market_account.noMint, market_creator.publicKey),
            getOrCreateAssociatedTokenAccount(connection, market_creator, USDC_MINT, market_creator.publicKey)
        ]).then(accounts => Promise.all(accounts.map(acc => getBalance(acc)))),
        // LP accounts
        Promise.all([
            getOrCreateAssociatedTokenAccount(connection, lp, market_account.yesMint, lp.publicKey),
            getOrCreateAssociatedTokenAccount(connection, lp, market_account.noMint, lp.publicKey),
            getOrCreateAssociatedTokenAccount(connection, lp, USDC_MINT, lp.publicKey),
            getOrCreateAssociatedTokenAccount(connection, lp, market_account.lpMint, lp.publicKey)
        ]).then(accounts => Promise.all(accounts.map(acc => getBalance(acc)))),
        // Buyer accounts
        Promise.all([
            getOrCreateAssociatedTokenAccount(connection, buyer, market_account.yesMint, buyer.publicKey),
            getOrCreateAssociatedTokenAccount(connection, buyer, market_account.noMint, buyer.publicKey),
            getOrCreateAssociatedTokenAccount(connection, buyer, USDC_MINT, buyer.publicKey)
        ]).then(accounts => Promise.all(accounts.map(acc => getBalance(acc)))),
        // Buyer NO accounts
        Promise.all([
            getOrCreateAssociatedTokenAccount(connection, buyer_no, market_account.yesMint, buyer_no.publicKey),
            getOrCreateAssociatedTokenAccount(connection, buyer_no, market_account.noMint, buyer_no.publicKey),
            getOrCreateAssociatedTokenAccount(connection, buyer_no, USDC_MINT, buyer_no.publicKey)
        ]).then(accounts => Promise.all(accounts.map(acc => getBalance(acc))))
    ]);

    return [
        {
            Account: "Market",
            YES: accounts[0][0],
            NO: accounts[0][1],
            USDC: formatUSDC(accounts[0][2]),
            "LP Mint": "N/A"
        },
        {
            Account: "Creator",
            YES: accounts[1][0],
            NO: accounts[1][1],
            USDC: formatUSDC(accounts[1][2]),
            "LP Mint": "N/A"
        },
        {
            Account: "LP",
            YES: accounts[2][0],
            NO: accounts[2][1],
            USDC: formatUSDC(accounts[2][2]),
            "LP Mint": formatUSDC(accounts[2][3])
        },
        {
            Account: "Buyer",
            YES: accounts[3][0],
            NO: accounts[3][1],
            USDC: formatUSDC(accounts[3][2]),
            "LP Mint": "N/A"
        },
        {
            Account: "Buyer NO",
            YES: accounts[4][0],
            NO: accounts[4][1],
            USDC: formatUSDC(accounts[4][2]),
            "LP Mint": "N/A"
        }
    ];
}

function formatUSDC(amount: string): string {
    return (Number(amount) / 100).toFixed(2);
} 