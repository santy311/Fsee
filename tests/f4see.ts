import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { Fsee } from "../target/types/fsee";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {  createMint, getAssociatedTokenAddress, getAssociatedTokenAddressSync, getMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { SendTransactionError } from "@solana/web3.js";
import { ComputeBudgetProgram } from "@solana/web3.js";
let USDC_MINT;

describe("fsee", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  const connection = provider.connection;
  const SEED = new anchor.BN(4);
  
  const program = anchor.workspace.Fsee as Program<Fsee>;

  let minter = Keypair.generate();
  let market_creator = Keypair.generate();
  let lp = Keypair.generate();
  let buyer = Keypair.generate();
  let buyer_no = Keypair.generate();
  let market: PublicKey;

  before(async () => {
    // Request and confirm airdrops
    const airdrop1 = await connection.requestAirdrop(minter.publicKey, 10 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdrop1);

    const airdrop2 = await connection.requestAirdrop(market_creator.publicKey, 10 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdrop2);

    const airdrop3 = await connection.requestAirdrop(lp.publicKey, 10 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdrop3);

    const airdrop4 = await connection.requestAirdrop(buyer.publicKey, 10 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdrop4);

    const airdrop5 = await connection.requestAirdrop(buyer_no.publicKey, 10 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdrop5);

    console.log("Balances");
    console.log("minter:" + minter.publicKey.toBase58() + " balance:" + await connection.getBalance(minter.publicKey));
    console.log("market_creator", market_creator.publicKey.toBase58() + " balance:" + await connection.getBalance(market_creator.publicKey));
    console.log("lp", lp.publicKey.toBase58() + " balance:" + await connection.getBalance(lp.publicKey));
    console.log("buyer", buyer.publicKey.toBase58() + " balance:" + await connection.getBalance(buyer.publicKey));
    console.log("buyer_no", buyer_no.publicKey.toBase58() + " balance:" + await connection.getBalance(buyer_no.publicKey));
    // create a token called "USDC"
    const mint = await createMint(
      connection,
      minter,
      minter.publicKey,
      minter.publicKey,
      2
    );

    USDC_MINT = new PublicKey(mint.toBase58());

    const creatorTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      market_creator,
      mint,
      market_creator.publicKey
    )

    await mintTo(
      connection,
      minter,
      mint,
      creatorTokenAccount.address,
      minter.publicKey,
      10000
    )

    let balance = await connection.getTokenAccountBalance(creatorTokenAccount.address);

    console.log("Balance: " + balance.value.amount);
    console.log("Creator token account: "+ creatorTokenAccount.address.toBase58() + " and balance: " + balance.value.amount);

    const lpTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      lp,
      mint,
      lp.publicKey
    )

    await mintTo(
      connection,
      minter,
      mint,
      lpTokenAccount.address,
      minter.publicKey,
      50000
    )

    const buyerTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      buyer,
      mint,
      buyer.publicKey
    )

    await mintTo(
      connection,
      minter,
      mint,
      buyerTokenAccount.address,
      minter.publicKey,
      10000
    )

    const buyerBalance = await connection.getTokenAccountBalance(buyerTokenAccount.address);

    // console.log("Buyer token account", buyerTokenAccount.address.toBase58());
    // console.log("Buyer token account balance", buyerBalance.value.amount);
    // console.log("Mint created", mint.toBase58());

    const buyer_no_token_account = await getOrCreateAssociatedTokenAccount(
      connection,
      buyer_no,
      mint,
      buyer_no.publicKey
    )

    await mintTo(
      connection,
      minter,
      mint,
      buyer_no_token_account.address,
      minter.publicKey,
      5000
    )

    const buyer_no_balance = await connection.getTokenAccountBalance(buyer_no_token_account.address);
    // console.log("Buyer no token account", buyer_no_token_account.address.toBase58());
    // console.log("Buyer no token account balance", buyer_no_balance.value.amount);
  });

  it("Is initialized!", async () => {
    const description = "Test market";

    // Derive PDAs
    market = PublicKey.findProgramAddressSync(
      [
        Buffer.from("market"),
        market_creator.publicKey.toBuffer(),
        Buffer.from(SEED.toArrayLike(Buffer, "le", 8)),
      ],
      program.programId
    )[0];

    const liquidity_amt = new anchor.BN(0*100);

    try {
      
      const tx = await program.methods
        .initializeMarket(SEED, description, liquidity_amt)
        .accounts({
          creator: market_creator.publicKey,
          usdcMint: USDC_MINT,
        }).signers([market_creator])
        .rpc({commitment: "confirmed"});

      await connection.confirmTransaction(tx);

      console.log("Market created");
      await print_all_accounts();
    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
        throw e;
      }
    }
  });

  it("Add liquidity", async () => {

    try {
    const liquidity_amt = new anchor.BN(500*100);

    market = PublicKey.findProgramAddressSync(
      [
        Buffer.from("market"),
        market_creator.publicKey.toBuffer(),
        Buffer.from(SEED.toArrayLike(Buffer, "le", 8)),
      ],
      program.programId
    )[0];
    
    const tx = await program.methods
      .addLiquidity(liquidity_amt)
      .accounts({
        liquidityProvider: lp.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([lp])
      .rpc({commitment: "confirmed"});

    await connection.confirmTransaction(tx);

    console.log("Adding liquidity");
    await print_all_accounts();
    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
      }
      throw e;
    }
  });

  it("Get price at time of trade", async () => {
    console.log(await calculate_price_at_trade(market, BigInt(25*100), true, 0));
  });

  it("Buy yes", async () => {
    try {
    let tx = await program.methods
      .buy(true, new BN(25*100))
      .accounts({
        predictor: buyer.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([buyer])
      .rpc({commitment: "confirmed"});
    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
      }
      throw e;
    }

    console.log("Buying yes");
    await print_all_accounts();

  });

  it("Get price 2", async () => {
    console.log(await get_price(market, true));
  });

  it("Buy no", async () => {
    try {
    let tx = await program.methods
      .buy(false, new BN(5000))
      .accounts({
        predictor: buyer_no.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([buyer_no])
      .rpc({commitment: "confirmed"});

    const tx_detail = await connection.getTransaction(tx, {
      commitment: "confirmed",
    });
    // console.log("Tx detail", tx_detail);
    console.log("Buying no");
    await print_all_accounts();

    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
      }
      throw e;
    }

    console.log("Buying no");
    await print_all_accounts();

  });

  it("Get price 3", async () => {
    console.log(await get_price(market, true));
  });

  it("Remove liquidity", async () => {
    try {
    let tx = await program.methods
      .removeLiquidity(new BN(500*100))
      .accounts({
        liquidityProvider: lp.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([lp])
      .rpc({commitment: "confirmed"});

      await connection.confirmTransaction(tx);

      const tx_detail = await connection.getTransaction(tx, {
        commitment: "confirmed",
      });
      // console.log("Tx detail", tx_detail);
      console.log("Removing liquidity");
      await print_all_accounts();
    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
      }
      throw e;
    }
  });

  it("Resolve market", async () => {
    let tx = await program.methods
      .resolveMarket(true)
      .accounts({
        predictor: market_creator.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([market_creator])
      .rpc({commitment: "confirmed"});

      await connection.confirmTransaction(tx);

      const market_account = await program.account.market.fetch(market);
      // console.log("Market account", market_account);
  });

  it("Redeem tokens", async () => {
    let market_account = await program.account.market.fetch(market);
    let buyer_yes_ata = await getOrCreateAssociatedTokenAccount(connection, buyer, market_account.yesMint, buyer.publicKey);
    let buyer_yes_balance = await connection.getTokenAccountBalance(buyer_yes_ata.address);
    
    let tx = await program.methods
      .redeemTokens(new BN(buyer_yes_balance.value.amount), new BN(0))
      .accounts({
        predictor: buyer.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([buyer])
      .rpc({commitment: "confirmed"});

      await connection.confirmTransaction(tx);
      console.log("Redeeming buyer yes");
      await print_all_accounts();


    let buyer_no_ata = await getOrCreateAssociatedTokenAccount(connection, buyer_no, market_account.noMint, buyer_no.publicKey);
    let buyer_no_balance = await connection.getTokenAccountBalance(buyer_no_ata.address);
   
    tx = await program.methods
      .redeemTokens(new BN(0), new BN(buyer_no_balance.value.amount))
      .accounts({
        predictor: buyer_no.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([buyer_no])
      .rpc({commitment: "confirmed"});

    await connection.confirmTransaction(tx);

    console.log("Redeeming buyer no");
    await print_all_accounts();

    let lp_yes_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.yesMint, lp.publicKey);
    let lp_yes_balance = await connection.getTokenAccountBalance(lp_yes_ata.address);
    console.log("LP yes balance", lp_yes_balance.value.amount);

    let lp_no_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.noMint, lp.publicKey);
    let lp_no_balance = await connection.getTokenAccountBalance(lp_no_ata.address);
    console.log("LP no balance", lp_no_balance.value.amount);
   
    tx = await program.methods
      .redeemTokens(new BN(lp_yes_balance.value.amount), new BN(lp_no_balance.value.amount))
      .accounts({
        predictor: lp.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([lp])
      .rpc({commitment: "confirmed"});

      await connection.confirmTransaction(tx);


      console.log("Redeeming LP tokens");
      await print_all_accounts();
    });

  const PRECISION = BigInt(10000); // 4 decimal places

  interface PriceResult {
      priceA: number;
      priceB: number;
      priceABigInt: bigint;
      priceBBigInt: bigint;
  }

  interface TradeResult {
      inputAmountAfterFee: bigint;
      outputTokens: bigint;
      newPriceA: number;
      newPriceB: number;
      newSharesA: bigint;
      newSharesB: bigint;
  }

  async function calculate_price_at_trade(
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

    console.log("yes pool balance", yes_pool_balance);
    console.log("no pool balance", no_pool_balance);
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
          // When buying YES outcome:
          // 1. Add input_after_fee to NO pool (user provides tokens)
          new_shares_b = no_pool_balance + input_after_fee;
          
          // 2. Calculate new YES pool size maintaining constant product
          new_shares_a = (yes_pool_balance * no_pool_balance) / new_shares_b;
          
          // 3. Calculate tokens user receives (reduction in YES pool)
          const output_tokens = yes_pool_balance - new_shares_a;

          // Calculate new prices
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
          // When buying NO outcome:
          // 1. Add input_after_fee to YES pool (user provides tokens)
          new_shares_a = yes_pool_balance + input_after_fee;
          
          // 2. Calculate new NO pool size maintaining constant product
          new_shares_b = (yes_pool_balance * no_pool_balance) / new_shares_a;
          
          // 3. Calculate tokens user receives (reduction in NO pool)
          const output_tokens = no_pool_balance - new_shares_b;

          // Calculate new prices
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

  async function get_price(
      market: PublicKey, 
      option: boolean, 
  ): Promise<PriceResult> {
      const market_account = await program.account.market.fetch(market);
      const total_liquidity_shares = market_account.totalLiquidityShares;
      
      const market_yes_ata = await getAssociatedTokenAddressSync(market_account.yesMint, market, true);
      const market_no_ata = await getAssociatedTokenAddressSync(market_account.noMint, market, true);
      const yes_pool_balance = BigInt((await connection.getTokenAccountBalance(market_yes_ata)).value.amount);
      const no_pool_balance = BigInt((await connection.getTokenAccountBalance(market_no_ata)).value.amount);

  

      const lp_yes_shares = await getOrCreateAssociatedTokenAccount(
          connection, 
          lp, 
          market_account.yesMint, 
          lp.publicKey
      );
      
      const creator_yes_shares = await getOrCreateAssociatedTokenAccount(
          connection, 
          market_creator, 
          market_account.yesMint, 
          market_creator.publicKey
      );

      const prices = calculate_outcome_shares(yes_pool_balance, no_pool_balance);
      console.log("prices", prices);
      return prices;
  }

  function calculate_outcome_shares(
      yes_pool_balance: bigint, 
      no_pool_balance: bigint, 
  ): PriceResult {
      // Input validation
      if (yes_pool_balance <= BigInt(0) || no_pool_balance <= BigInt(0)) {
          throw new Error('Share amounts must be positive');
      }

      const totalShares = yes_pool_balance + no_pool_balance;
      // console.log("total shares", totalShares.toString());

      // Calculate prices with high precision
      // Multiply by PRECISION before division to maintain precision
      const priceABigInt = (no_pool_balance * PRECISION) / totalShares;
      const priceBBigInt = (yes_pool_balance * PRECISION) / totalShares;

      // console.log("priceA (fixed point)", priceABigInt.toString());
      // console.log("priceB (fixed point)", priceBBigInt.toString());

      // Convert to decimal for display/calculations
      const priceA = Number(priceABigInt) / Number(PRECISION);
      const priceB = Number(priceBBigInt) / Number(PRECISION);

      // console.log("priceA (decimal)", priceA.toFixed(4));
      // console.log("priceB (decimal)", priceB.toFixed(4));
      // console.log("sum", (priceA + priceB).toFixed(4));

      // Validate prices sum to 1 (within small epsilon due to floating point)
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

  // Helper function to convert from high precision BigInt to number
  function fromFixedPoint(value: bigint): number {
      return Number(value) / Number(PRECISION);
  }

  // Helper function to convert from number to high precision BigInt
  function toFixedPoint(value: number): bigint {
      return BigInt(Math.floor(value * Number(PRECISION)));
  }

  async function print_all_accounts() {
    // Get market account data
    const market_account = await program.account.market.fetch(market);
    
    // Get all relevant token accounts
    const market_yes_ata = await getAssociatedTokenAddressSync(market_account.yesMint, market, true);
    const market_no_ata = await getAssociatedTokenAddressSync(market_account.noMint, market, true);
    const market_usdc_ata = await getAssociatedTokenAddressSync(USDC_MINT, market, true);

    // Get balances for market creator
    const creator_yes_ata = await getOrCreateAssociatedTokenAccount(connection, market_creator, market_account.yesMint, market_creator.publicKey);
    const creator_no_ata = await getOrCreateAssociatedTokenAccount(connection, market_creator, market_account.noMint, market_creator.publicKey);
    const creator_usdc_ata = await getOrCreateAssociatedTokenAccount(connection, market_creator, USDC_MINT, market_creator.publicKey);

    // Get balances for LP
    const lp_yes_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.yesMint, lp.publicKey);
    const lp_no_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.noMint, lp.publicKey);
    const lp_usdc_ata = await getOrCreateAssociatedTokenAccount(connection, lp, USDC_MINT, lp.publicKey);
    const lp_mint_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.lpMint, lp.publicKey);

    // Get balances for buyers
    const buyer_yes_ata = await getOrCreateAssociatedTokenAccount(connection, buyer, market_account.yesMint, buyer.publicKey);
    const buyer_no_ata = await getOrCreateAssociatedTokenAccount(connection, buyer, market_account.noMint, buyer.publicKey);
    const buyer_usdc_ata = await getOrCreateAssociatedTokenAccount(connection, buyer, USDC_MINT, buyer.publicKey);

    const buyer_no_yes_ata = await getOrCreateAssociatedTokenAccount(connection, buyer_no, market_account.yesMint, buyer_no.publicKey);
    const buyer_no_no_ata = await getOrCreateAssociatedTokenAccount(connection, buyer_no, market_account.noMint, buyer_no.publicKey);
    const buyer_no_usdc_ata = await getOrCreateAssociatedTokenAccount(connection, buyer_no, USDC_MINT, buyer_no.publicKey);

    // Helper function to format USDC amount
    const formatUSDC = (amount: string) => (Number(amount) / 100).toFixed(2);

    // Format data for table
    const data = [
        {
            Account: "Market",
            YES: (await connection.getTokenAccountBalance(market_yes_ata)).value.amount,
            NO: (await connection.getTokenAccountBalance(market_no_ata)).value.amount,
            USDC: formatUSDC((await connection.getTokenAccountBalance(market_usdc_ata)).value.amount),
            "LP Mint": "N/A"
        },
        {
            Account: "Creator",
            YES: (await connection.getTokenAccountBalance(creator_yes_ata.address)).value.amount,
            NO: (await connection.getTokenAccountBalance(creator_no_ata.address)).value.amount,
            USDC: formatUSDC((await connection.getTokenAccountBalance(creator_usdc_ata.address)).value.amount),
            "LP Mint": "N/A"
        },
        {
            Account: "LP",
            YES: (await connection.getTokenAccountBalance(lp_yes_ata.address)).value.amount,
            NO: (await connection.getTokenAccountBalance(lp_no_ata.address)).value.amount,
            USDC: formatUSDC((await connection.getTokenAccountBalance(lp_usdc_ata.address)).value.amount),
            "LP Mint": formatUSDC((await connection.getTokenAccountBalance(lp_mint_ata.address)).value.amount)
        },
        {
            Account: "Buyer",
            YES: (await connection.getTokenAccountBalance(buyer_yes_ata.address)).value.amount,
            NO: (await connection.getTokenAccountBalance(buyer_no_ata.address)).value.amount,
            USDC: formatUSDC((await connection.getTokenAccountBalance(buyer_usdc_ata.address)).value.amount),
            "LP Mint": "N/A"
        },
        {
            Account: "Buyer NO",
            YES: (await connection.getTokenAccountBalance(buyer_no_yes_ata.address)).value.amount,
            NO: (await connection.getTokenAccountBalance(buyer_no_no_ata.address)).value.amount,
            USDC: formatUSDC((await connection.getTokenAccountBalance(buyer_no_usdc_ata.address)).value.amount),
            "LP Mint": "N/A"
        }
    ];

    // Print market state
    console.log("\nMarket State:");
    console.log("Total Liquidity Shares:", formatUSDC(market_account.totalLiquidityShares.toString()));

    // Print balances table
    console.log("\nBalances:");
    console.table(data);
  }
});
