import { Program, AnchorProvider, Idl, setProvider, BN } from "@coral-xyz/anchor";
import {
  PublicKey,
  Connection,
  Keypair,
  ConfirmOptions,
  TransactionMessage,
  VersionedTransaction,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import idl from "../solana/idl/fsee.json";
import { Fsee } from "../solana/types/fsee";
import { getAccount, getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction, TokenAccountNotFoundError, TokenInvalidAccountOwnerError } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export const CONFIRM_OPTIONS: ConfirmOptions = { commitment: "finalized" };

// Types
export interface Market {
  creator: PublicKey;
  title: string;
  desc: string;
  icon: string;
  seed: number;
  publicKey: PublicKey;
  resolved: boolean;
  outcome: boolean | null;
  liquidity: number;
  yesAmount: number;
  noAmount: number;
  userYesBalance?: number;
  userNoBalance?: number;
  userLpBalance?: number;
}

interface PriceResult {
  priceA: number;
  priceB: number;
  priceABigInt: bigint;
  priceBBigInt: bigint;
}

export class ProgramUtils {
  private program: Program<Fsee>;
  private provider: AnchorProvider;
  private readonly PRECISION = BigInt(10000);

  constructor(connection: Connection, wallet: any) {
    this.provider = new AnchorProvider(
      connection,
      wallet,
      AnchorProvider.defaultOptions()
    );
    setProvider(this.provider);

    const programId = new PublicKey(idl.address);
    console.log("Program ID from IDL:", programId.toString());

    this.program = new Program(idl as Idl, this.provider) as unknown as Program<Fsee>;

  }

  async initializeMarket(
    seed: number,
    title: string,
    description: string,
    icon: string,
  ): Promise<PublicKey> {
    try {

      const descriptionJSON = {
        title: title,
        desc: description,
        icon: icon,
      }
      const descriptionString = JSON.stringify(descriptionJSON);

      const seed_bn = new BN(seed);

      const market = PublicKey.findProgramAddressSync(
        [
          Buffer.from("market"),
          this.provider.wallet.publicKey.toBuffer(),
          Buffer.from(seed_bn.toArrayLike(Buffer, "le", 8)),
        ],
        new PublicKey(idl.address)
      )[0];

      const transaction = new Transaction();

      const tx_ix1 = await this.program.methods
        .initializeMarket(
          seed_bn,
          descriptionString,
        )
        .accounts({
          creator: this.provider.wallet.publicKey,
          usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
        })
        .instruction();

      const tx_ix2 = await this.program.methods
        .initializeNoMints()
        .accountsPartial({
          creator: this.provider.wallet.publicKey,
          market: market,
        })
        .instruction();

      const tx_ix3 = await this.program.methods
        .initializeYesMints()
        .accountsPartial({
          creator: this.provider.wallet.publicKey,
          market: market,
        })
        .instruction();

      transaction.add(tx_ix1, tx_ix2, tx_ix3);

      const hash = await this.provider.sendAll([{tx: transaction}], {commitment: "finalized"});

      console.log("Transaction hash:", hash);

      console.log("Market created with address:", market.toBase58());

      console.log("market", await this.getMarket(market));


      return market;
    } catch (error) {
      console.error("Error in initializeMarket:", error);
      throw error;
    }
  }

  async addLiquidity(market: PublicKey, amount: number): Promise<string> {
    console.log("Adding liquidity to market:", market.toBase58());
    console.log("Amount:", amount);
    console.log("user", this.provider.wallet.publicKey);
    const ata_ixs = await this.createATAs(market, this.provider.wallet.publicKey);
    console.log("ata_ixs", ata_ixs);
    const ix = await this.program.methods
    .addLiquidity(new BN(amount))
    .accountsPartial({
        liquidityProvider: this.provider.wallet.publicKey,
        usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
        market: market,
    })
    .instruction();

    const latestBlockhash = await this.provider.connection.getLatestBlockhash()

    // Create a new TransactionMessage with version and compile it to version 0
    const messageV0 = new TransactionMessage({
        payerKey: this.provider.wallet.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: [...ata_ixs, ix],
    }).compileToV0Message();

    // Create a new VersionedTransacction to support the v0 message
    const transaction = new VersionedTransaction(messageV0)

    // Send transaction and await for signature
    const signature = await this.provider.sendAll([{tx: transaction}], CONFIRM_OPTIONS);

    console.log("Signature:", signature);

    return signature[0];
  }

  async buy(
    market: PublicKey,
    buyingYes: boolean,
    amount: number
  ): Promise<string> {
    const tx = await this.program.methods
    .buy(buyingYes, new BN(amount))
    .accountsPartial({
        predictor: this.provider.wallet.publicKey,
        usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
        market: market,
    })
    .rpc(CONFIRM_OPTIONS);
    console.log("tx", tx);

    return tx;
  }

  async resolveMarket(market: PublicKey, outcome: boolean): Promise<string> {
    const tx = await this.program.methods
    .resolveMarket(outcome)
    .accountsPartial({
        predictor: this.provider.wallet.publicKey,
        market: market,
    })
    .rpc(CONFIRM_OPTIONS);
    console.log("tx", tx);

    return tx;
  }

  async redeemTokens(
    market: PublicKey,
    yesAmount: number,
    noAmount: number
  ): Promise<string> {
    const tx = await this.program.methods
    .redeemTokens(new BN(yesAmount), new BN(noAmount))
    .accountsPartial({
        predictor: this.provider.wallet.publicKey,
        usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
        market: market,
    })
    .rpc(CONFIRM_OPTIONS);
    console.log("tx", tx);

    return tx;
  }

  async removeLiquidity(market: PublicKey, amount: number): Promise<string> {
    const tx = await this.program.methods
    .removeLiquidity(new BN(amount))
    .accountsPartial({
        liquidityProvider: this.provider.wallet.publicKey,
        usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
        market: market,
    })
    .rpc(CONFIRM_OPTIONS);
    console.log("tx", tx);

    return tx;
  }

  private async createATAs(market: PublicKey, user: PublicKey): Promise<TransactionInstruction[]> {
    const marketAccount = await this.program.account.market.fetch(market);
    const yes_ix = await this.createTokenAccountInstruction(market, user, marketAccount.yesMint);
    const no_ix = await this.createTokenAccountInstruction(market, user, marketAccount.noMint);
    const lp_ix = await this.createTokenAccountInstruction(market, user, marketAccount.lpMint);
    const ixs = [yes_ix, no_ix, lp_ix];
    // Filter out null instructions and match the return type
    return ixs.filter((ix) => ix !== null) as TransactionInstruction[];
  }

  private async getAtas(market: PublicKey, user: PublicKey): Promise<[PublicKey, PublicKey, PublicKey, PublicKey]> {
    const marketAccount = await this.program.account.market.fetch(market);
    const yesAta = await getAssociatedTokenAddressSync(marketAccount.yesMint, user, true);
    const noAta = await getAssociatedTokenAddressSync(marketAccount.noMint, user, true);
    const lpAta = await getAssociatedTokenAddressSync(marketAccount.lpMint, user, true);
    const usdcAta = await getAssociatedTokenAddressSync(new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!), user, true);
    return [yesAta, noAta, lpAta, usdcAta];
  }

  private async createTokenAccountInstruction(market: PublicKey, user: PublicKey, mint: PublicKey): Promise<TransactionInstruction | null> {
    const associatedToken = await getAssociatedTokenAddressSync(
        mint,
        user,
    );
    
    let account;
    try {
        account = await getAccount(this.provider.connection, associatedToken);
        return null;
    } catch (error: unknown) {
      if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
        try {
            const ix = createAssociatedTokenAccountInstruction(
                        user,
                        associatedToken,
                        user,
                        mint,
                    );

            return ix;
        } catch (error: unknown) {
            throw error;
        }
      } else {
        throw error;
      }
    }
    return account;
  }

  public async getMarkets(): Promise<Market[]> {
    const markets = await this.program.account.market.all();
    const market_pdas = await Promise.all(markets.map((market) => market.publicKey));
    const markets_with_data = await Promise.all(market_pdas.map((market) => this.getMarket(market)));
    return markets_with_data.filter((market) => market !== null);
  }

  public async getPrice(
        market: PublicKey, 
    ): Promise<PriceResult> {
        const market_account = await this.program.account.market.fetch(market);
        
        const market_yes_ata = await getAssociatedTokenAddressSync(market_account.yesMint, market, true);
        const market_no_ata = await getAssociatedTokenAddressSync(market_account.noMint, market, true);
        const yes_pool_balance = BigInt((await this.provider.connection.getTokenAccountBalance(market_yes_ata)).value.amount);
        const no_pool_balance = BigInt((await this.provider.connection.getTokenAccountBalance(market_no_ata)).value.amount);
        const prices = await this.calculateOutcomeShares(yes_pool_balance, no_pool_balance);
        return prices;
    }

    private async calculateOutcomeShares(
        yes_pool_balance: bigint, 
        no_pool_balance: bigint, 
    ): Promise<PriceResult> {
        // Input validation
        if (yes_pool_balance <= BigInt(0) || no_pool_balance <= BigInt(0)) {
            if (yes_pool_balance == BigInt(0) && no_pool_balance == BigInt(0)) {
                return {
                    priceA: 0.5,
                    priceB: 0.5,
                    priceABigInt: BigInt(5000),
                    priceBBigInt: BigInt(5000)
                };
            } else if (yes_pool_balance == BigInt(0)) {
                return {
                    priceA: 0,
                    priceB: 1,
                    priceABigInt: BigInt(0),
                    priceBBigInt: BigInt(10000)
                };
            } else {
                return {
                    priceA: 1,
                    priceB: 0,
                    priceABigInt: BigInt(10000),
                    priceBBigInt: BigInt(0)
                };
            }
        }
  
        const totalShares = yes_pool_balance + no_pool_balance;
        const priceABigInt = (no_pool_balance * this.PRECISION) / totalShares;
        const priceBBigInt = (yes_pool_balance * this.PRECISION) / totalShares;
  
        const priceA = Number(priceABigInt) / Number(this.PRECISION);
        const priceB = Number(priceBBigInt) / Number(this.PRECISION);
  
        const sum = priceA + priceB;
        if (Math.abs(sum - 1) > 0.0001) {
            throw new Error('Invalid prices - must sum to 1');
        }
  
        return {
            priceA,
            priceB,
            priceABigInt,
            priceBBigInt
        };
    }

  private async getUserTokenBalances(market: PublicKey, user: PublicKey): Promise<[number, number, number]> {
    try {
      const marketAccount = await this.program.account.market.fetch(market);
      const yesAta = await getAssociatedTokenAddressSync(marketAccount.yesMint, user, true);
      const noAta = await getAssociatedTokenAddressSync(marketAccount.noMint, user, true);
      const lpAta = await getAssociatedTokenAddressSync(marketAccount.lpMint, user, true);
      
      const [yesBalance, noBalance, lpBalance] = await Promise.all([
        this.getTokenBalance(yesAta),
        this.getTokenBalance(noAta),
        this.getTokenBalance(lpAta)
      ]);

      return [yesBalance, noBalance, lpBalance];
    } catch (error) {
      console.error("Error getting user token balances:", error);
      return [0, 0, 0];
    }
  }

  private async getTokenBalance(ata: PublicKey): Promise<number> {
    try {
      const account = await getAccount(this.provider.connection, ata);
      return Number(account.amount);
    } catch (e) {
      return 0;
    }
  }

  public async getMarket(marketPda: PublicKey): Promise<Market | null> {
    const market = await this.program.account.market.fetch(marketPda);
    console.log("market", market);
    const description = JSON.parse(market.description);
    
    const [usdcAta] = await this.getAtas(marketPda, marketPda);
    const usdcBalance = await this.provider.connection.getTokenAccountBalance(usdcAta);
    const prices = await this.getPrice(marketPda);
    
    let userYesBalance = 0;
    let userNoBalance = 0;
    let userLpBalance = 0;
    if (this.provider.wallet.publicKey) {
      [userYesBalance, userNoBalance, userLpBalance] = await this.getUserTokenBalances(
        marketPda, 
        this.provider.wallet.publicKey
      );
    }

    return {
      creator: market.creator,
      title: description.title,
      desc: description.desc,
      icon: description.icon,
      publicKey: marketPda,
      resolved: market.resolved,
      outcome: market.outcome,
      seed: Number(market.seed),
      liquidity: Number(usdcBalance.value.amount),
      yesAmount: prices.priceA,
      noAmount: prices.priceB,
      userYesBalance,
      userNoBalance,
      userLpBalance,
    };
  }
}

// Hook to create ProgramUtils instance
export const useProgramUtils = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  
  if (!publicKey || !signTransaction || !signAllTransactions) {
    return null;
  }

  const wallet = {
    publicKey,
    signTransaction,
    signAllTransactions,
    payer: Keypair.generate(),
  };

  return new ProgramUtils(connection, wallet);
};
