# 🪙 SPL Token Issuer on Eclipse Testnet by [HackQuest](https://www.hackquest.io/)

A minimal JS script  to **create, mint, and transfer SPL tokens** using Solana-compatible blockchain **Eclipse Testnet**, with secure environment variable support.

This is ideal for learning how to interact with the SPL Token Program and for building minting tools, airdrop scripts, or Solana-based apps.

---

## 📁 Project Structure

- Uses [`@solana/web3.js`](https://www.npmjs.com/package/@solana/web3.js) for Solana blockchain interaction
- Uses [`@solana/spl-token`](https://www.npmjs.com/package/@solana/spl-token) for token operations
- Uses [`@dotenvx/dotenvx`](https://www.npmjs.com/package/@dotenvx/dotenvx) for loading private keys securely via `.env`

---

## ⚙️ Prerequisites

- Node.js ≥ 18
- NPM or Yarn
- `.env` file containing private/public keys

---

## 🧪 What It Does

This script:

1. Connects to **Eclipse Testnet**
2. Creates a new **SPL token mint**
3. Creates **associated token accounts (ATA)** for the mint authority (`alice`) and the recipient (`bob`)
4. Mints 2 tokens (with 8 decimals) to Alice's ATA
5. Transfers 1 token to Bob's ATA

---

## 📥 Installation

```bash
npm install
```

Install missing packages if needed:

```bash
npm install @solana/web3.js @solana/spl-token bs58 @dotenvx/dotenvx
```

---

🔐 Environment Setup

Create a .env file in the project root: (Or you can also rename the .env.example file into .env)

```.env
FEE_PAYER_PRIVATE_KEY=base58-encoded-private-key
ALICE_PRIVATE_KEY=base58-encoded-private-key
BOB_PUBLIC_KEY=your-bob-public-key
```

You can use tools like solana-keygen or wallets like Phantom/Backpack to export private keys (in base58).

> ❗ Important: Never share your private keys or commit your .env file.




---

▶️ Running the Script

```bash
node index.js
```

If successful, you will see:

```bash
Mint address

Associated token accounts for Alice and Bob

Mint and transfer transaction hashes
```


---

🔎 Explorer

You can inspect transactions or token mint using:

```bash
https://explorer.dev.eclipsenetwork.xyz/address/<MINT_ADDRESS>?cluster=testnet
```

And transaction:

```bash
https://explorer.dev.eclipsenetwork.xyz/tx/<TX_HASH>?cluster=testnet
```

---

📄 Example Output

```bash
mintPubkey: 3JqA...YBnX
feePayer: 6KLN...aFvT
alice: 9FA7...DAn
ATA (Alice): 7sTL...FqE1
tokenAmount: { amount: '0', decimals: 8, uiAmount: 0 }
mint txhash: 3ksf...ZgH7
ATA BOB: H98w...1NBp
transfer txhash: https://explorer.dev.eclipsenetwork.xyz/tx/D45z.../?cluster=testnet
```


---

📚 Notes

The token created does not yet have a name or symbol on-chain.

To make it show up in wallets like Phantom, you’ll need to register it in an off-chain token list (e.g., via GitHub).

Token decimals are set to 8, meaning 1 token = 10^8 base units.



---

🛡️ Disclaimer

This script is provided for educational or testnet use only.
Do not use real mainnet private keys or send real assets through this code without proper review.

Always keep your secret keys out of source control and secured using environment variables or secret managers.


---

📃 License

MIT License — feel free to use and adapt for personal or educational use.
