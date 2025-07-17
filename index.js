import {
    Connection,
    Keypair,
    PublicKey,
  } from "@solana/web3.js";
  import {
    createMint,
    getMint,
    createAssociatedTokenAccount,
    getAccount,
    mintToChecked,
    transferChecked,
  } from "@solana/spl-token";
  import bs58 from "bs58";
  import "@dotenvx/dotenvx/config";
   
  (async () => {
    // create connection
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const connection = new Connection("https://testnet.dev2.eclipsenetwork.xyz", "confirmed");

    const feePayer = Keypair.fromSecretKey(
      bs58.decode(
        process.env.FEE_PAYER_PRIVATE_KEY,
      ),
    );

    const alice = Keypair.fromSecretKey(
      bs58.decode(
        process.env.ALICE_PRIVATE_KEY,
      ),
    );
   
    // 1.1 create mint account
    let mintPubkey = await createMint(
      connection, // connection
      feePayer, // fee payer
      alice.publicKey, // mint authority
      alice.publicKey, // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
      8, // decimals
    );
    console.log(`mintPubkey: ${mintPubkey.toBase58()}`);

    // 1.2 get mint account info
    let mintAccountInfo = await getMint(connection, mintPubkey);
    console.log(mintAccountInfo);

    // 2.1 create token account - ata
    let ata = await createAssociatedTokenAccount(
      connection, // connection
      feePayer, // fee payer
      mintPubkey, // mint
      alice.publicKey // owner,
    );
    console.log(`feePayer: ${feePayer.publicKey.toBase58()}, mint: ${mintPubkey.toBase58()}, alice: ${alice.publicKey.toBase58()}, ATA: ${ata.toBase58()}`);

    // 2.2 get token account balance
    let tokenAmount = await connection.getTokenAccountBalance(ata);
    console.log(tokenAmount);

    // 2.3 get token account info
    let tokenAccount = await getAccount(connection, ata);
    console.log(tokenAccount);

    // 3.1 mint token
    let txhash = await mintToChecked(
      connection, // connection
      feePayer, // fee payer
      mintPubkey, // mint
      ata, // receiver (should be a token account)
      alice, // mint authority
      2 * 1e8, // amount. if your decimals is 8, you mint 10^8 for 1 token.
      8 // decimals
    );
    console.log(`mint txhash: ${txhash}`);
    
    // 4 transfer token
    // error msg: invalid account data for instruction
    const bob = new PublicKey(
      process.env.BOB_PUBLIC_KEY
    );

    let ata_bob = await createAssociatedTokenAccount(
      connection, // connection
      feePayer, // fee payer
      mintPubkey, // mint
      bob // owner
    );
    console.log(`ATA BOB: ${ata_bob.toBase58()}`);

    let trans_txhash = await transferChecked(
      connection, // connection
      feePayer, // payer
      ata, // from (should be a token account)
      mintPubkey, // mint
      ata_bob, // to (should be a token account)
      alice, // from's owner
      1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
      8 // decimals
    );
    console.log(`transfer txhash: https://explorer.dev.eclipsenetwork.xyz/tx/${trans_txhash}/?cluster=testnet, bob: ${bob.toBase58()}, ata_bob: ${ata_bob.toBase58()}`);
    
  })();