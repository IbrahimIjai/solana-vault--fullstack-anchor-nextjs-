<!-- https://solana.com/developers/guides/getstarted/how-to-create-a-token -->

# Solana Full-Stack DApp Suite

This project demonstrates how to integrate Solana smart contracts (built with Anchor) with a modern React frontend. It serves as a comprehensive example for developers looking to build decentralized applications on the Solana blockchain.

## 🎬 Demo Videos

<div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
  <div style="width: 48%;">
    <h3>Solana Vault Demo</h3>
    <video width="100%" controls>
      <source src="./20250505-1524-57.5753412.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
  <div style="width: 48%;">
    <h3>NFT Minter Demo</h3>
    <video width="100%" controls>
      <source src="./nft-minter-metaplex-sugar-fullstack/demo.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

## 🚀 Features

- **Solana Vault Contract**

  - Secure token storage and management
  - Deposit and withdrawal functions
  - Account balance tracking
  - Permission controls

- **NFT Minter Integration**

  - Mint NFTs directly from the UI
  - Metaplex/Sugar integration
  - Metadata management
  - Collection support

- **Common Features**
  - Full integration between Solana programs and React frontend
  - Wallet connectivity using Solana Wallet Adapter
  - On-chain data fetching and state management
  - Transaction signing and submission
  - Anchor framework integration
  - Modern UI with responsive design

## 🔧 Technologies

- Solana Blockchain
- Anchor Framework
- Metaplex SDK & Sugar
- Next.js
- React
- TypeScript
- Phantom Wallet (and other Solana wallets)
- Web3.js / Solana/web3.js

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Components Overview

### Solana Vault Integration

This repository serves as a reference implementation for developers building vault applications, token management systems, or other DeFi applications on Solana. The demo video shows the complete flow of interacting with a Solana program from a web interface.

### NFT Minter with Metaplex/Sugar

The NFT minter component provides a complete implementation of NFT creation and management using Metaplex and Sugar. It demonstrates the entire minting process from metadata creation to on-chain minting.

## Why This Project?

This project was created to understand and demonstrate how to properly connect a frontend application to Solana smart contracts built with Anchor. It addresses common challenges like:

- Program IDL integration
- Account data serialization/deserialization
- Transaction building and signing
- Error handling for on-chain operations
- State synchronization between blockchain and UI
- NFT creation and metadata management

## Learn More

To learn more about building on Solana:

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://project-serum.github.io/anchor/)
- [Metaplex Documentation](https://docs.metaplex.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
