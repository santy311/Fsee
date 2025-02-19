import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { Fsee } from "../target/types/fsee";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {  createMint, getAssociatedTokenAddress, getAssociatedTokenAddressSync, getMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { SendTransactionError } from "@solana/web3.js";
import { ComputeBudgetProgram } from "@solana/web3.js";
import { calculate_price_at_trade, get_price, print_all_accounts } from './utils';
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


    try {
      
      const tx = await program.methods
        .initializeMarket(SEED, description)
        .accounts({
          creator: market_creator.publicKey,
          usdcMint: USDC_MINT,
        }).signers([market_creator])
        .rpc({commitment: "confirmed"});

      console.log("Market created");

      const tx2 = await program.methods
        .initializeNoMints()
        .accountsPartial({
          creator: market_creator.publicKey,
          market: market,
        }).signers([market_creator])
        .rpc({commitment: "confirmed"});

      console.log("No mint created");

      const tx3 = await program.methods
        .initializeYesMints()
        .accountsPartial({
          creator: market_creator.publicKey,
          market: market,
        }).signers([market_creator])
        .rpc({commitment: "confirmed"});

      console.log("Yes mint created");

      console.log("All market accounts created");
      await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);
    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
        throw e;
      }
    }
  });

  it("create ATAs", async () => {
    const market_account = await program.account.market.fetch(market);
    const yes_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.yesMint, lp.publicKey);
    const no_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.noMint, lp.publicKey);
    const lp_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.lpMint, lp.publicKey);
    console.log("Yes ata", yes_ata.address.toBase58());
    console.log("No ata", no_ata.address.toBase58());
    console.log("Lp ata", lp_ata.address.toBase58());
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
      .accountsPartial({
        liquidityProvider: lp.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([lp])
      .rpc({commitment: "confirmed"});

    await connection.confirmTransaction(tx);

    console.log("Adding liquidity");
    await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);
    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
      }
      throw e;
    }
  });

  it("Get price at time of trade", async () => {
    console.log(await calculate_price_at_trade(
        connection,
        program,
        market,
        BigInt(25*100),
        true,
        0
    ));
  });

  it("Buy yes", async () => {
    try {
    let tx = await program.methods
      .buy(true, new BN(25*100))
      .accountsPartial({
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
    await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);

  });

  it("Get price 2", async () => {
    console.log(await get_price(connection, program, market, lp, market_creator));
  });

  it("Buy no", async () => {
    try {
    let tx = await program.methods
      .buy(false, new BN(5000))
      .accountsPartial({
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
    await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);

    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
      }
      throw e;
    }

    console.log("Buying no");
    await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);

  });

  it("Get price 3", async () => {
    console.log(await get_price(connection, program, market, lp, market_creator));
  });

  // it("Remove liquidity", async () => {
  //   try {
  //   let tx = await program.methods
  //     .removeLiquidity(new BN(500*100))
  //     .accounts({
  //       liquidityProvider: lp.publicKey,
  //       usdcMint: USDC_MINT,
  //       market: market,
  //     })
  //     .signers([lp])
  //     .rpc({commitment: "confirmed"});

  //     await connection.confirmTransaction(tx);

  //     const tx_detail = await connection.getTransaction(tx, {
  //       commitment: "confirmed",
  //     });
  //     // console.log("Tx detail", tx_detail);
  //     console.log("Removing liquidity");
  //     await print_all_accounts();
  //   } catch (e: any) {
  //     console.log("Error", e);
  //     if (e instanceof SendTransactionError) {
  //       console.log("Error",await  e.logs);
  //     }
  //     throw e;
  //   }
  // });

  it("Resolve market", async () => {
    let tx = await program.methods
      .resolveMarket(false)
      .accountsPartial({
        predictor: market_creator.publicKey,
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
      .accountsPartial({
        predictor: buyer.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([buyer])
      .rpc({commitment: "confirmed"});

      await connection.confirmTransaction(tx);
      console.log("Redeeming buyer yes");
      await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);


    let buyer_no_ata = await getOrCreateAssociatedTokenAccount(connection, buyer_no, market_account.noMint, buyer_no.publicKey);
    let buyer_no_balance = await connection.getTokenAccountBalance(buyer_no_ata.address);
   
    tx = await program.methods
      .redeemTokens(new BN(0), new BN(buyer_no_balance.value.amount))
      .accountsPartial({
        predictor: buyer_no.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([buyer_no])
      .rpc({commitment: "confirmed"});

    await connection.confirmTransaction(tx);

    console.log("Redeeming buyer no");
    await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);

    let lp_yes_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.yesMint, lp.publicKey);
    let lp_yes_balance = await connection.getTokenAccountBalance(lp_yes_ata.address);
    console.log("LP yes balance", lp_yes_balance.value.amount);

    let lp_no_ata = await getOrCreateAssociatedTokenAccount(connection, lp, market_account.noMint, lp.publicKey);
    let lp_no_balance = await connection.getTokenAccountBalance(lp_no_ata.address);
    console.log("LP no balance", lp_no_balance.value.amount);
   
    tx = await program.methods
      .redeemTokens(new BN(lp_yes_balance.value.amount), new BN(lp_no_balance.value.amount))
      .accountsPartial({
        predictor: lp.publicKey,
        usdcMint: USDC_MINT,
        market: market,
      })
      .signers([lp])
      .rpc({commitment: "confirmed"});

      await connection.confirmTransaction(tx);


      console.log("Redeeming LP tokens");
      await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);
    });

      it("Remove liquidity", async () => {
    try {
    let tx = await program.methods
      .removeLiquidity(new BN(500*100))
      .accountsPartial({
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
      await print_all_accounts(connection, program, market, market_creator, lp, buyer, buyer_no, USDC_MINT);
    } catch (e: any) {
      console.log("Error", e);
      if (e instanceof SendTransactionError) {
        console.log("Error",await  e.logs);
      }
      throw e;
    }
  });
});
