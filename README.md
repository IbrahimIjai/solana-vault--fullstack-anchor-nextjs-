```mdx
import { Callout } from 'nextra/components'

# Solana Full-Stack DApp Suite

Welcome to the **Solana Full-Stack DApp Suite**, a monorepo showcasing how to build decentralized applications (DApps) on the Solana blockchain. This project integrates Solana smart contracts (built with Anchor) with modern Next.js frontends, managed in a [Turborepo](https://turbo.build/repo/docs) structure.

<Callout type="info">
This project is perfect for developers looking to learn Solana DApp development, from smart contract deployment to building responsive React UIs.
</Callout>

## 🎬 Demo Videos

Watch these demos to see the DApps in action:

### Solana Vault Demo
<video controls src="VIDEO_URL_HERE" width="100%" />
A walkthrough of the Solana Vault app, showcasing secure token storage and management.

### NFT Minter Demo
<video controls src="VIDEO_URL_HERE" width="100%" />
See how the NFT Minter creates and manages NFTs using Metaplex and Sugar.

## 🚀 Features

### Solana Vault
- **Secure Token Management**: Safely store and manage tokens on Solana.
- **Deposit & Withdraw**: Easy-to-use functions for token transactions.
- **Balance Tracking**: Monitor account balances in real-time.
- **Permission Controls**: Manage access to vault operations.

### NFT Minter
- **Mint NFTs**: Create NFTs directly from the UI.
- **Metaplex & Sugar**: Leverage industry-standard tools for NFT creation.
- **Metadata Management**: Handle NFT metadata seamlessly.
- **Collection Support**: Organize NFTs into collections.

### Shared Features
- Full integration between Solana smart contracts and Next.js frontends.
- Wallet connectivity via Solana Wallet Adapter (e.g., Phantom).
- Real-time on-chain data fetching and state management.
- Transaction signing and submission.
- Modern, responsive UI built with React and TypeScript.

## 🔧 Technologies

- **Solana Blockchain**: High-performance blockchain for DApps.
- **Anchor Framework**: Simplifies Solana smart contract development.
- **Metaplex & Sugar**: Tools for NFT creation and management.
- **Next.js & React**: Modern frontend framework for responsive UIs.
- **TypeScript**: Type-safe JavaScript for better developer experience.
- **Solana/web3.js**: Interact with Solana from the frontend.
- **Turborepo**: Monorepo management for multiple apps and contracts.

## 📂 Project Structure

This project uses a Turborepo monorepo with the following structure:

```
├── apps/
│   ├── vault/          # Next.js app for Solana Vault
│   ├── minter/        # Next.js app for NFT Minter
├── contracts/         # Solana smart contracts built with Anchor
├── package.json       # Root dependencies and Turborepo scripts
```

## 🛠️ Getting Started

Follow these steps to run the project locally:

1. **Install Dependencies**  
   At the root of the repository, install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Build and Deploy Contracts**  
   Navigate to the `contracts/` folder and follow the [Anchor documentation](https://www.anchor-lang.com/) to build and deploy Solana programs:
   ```bash
   cd contracts
   anchor build
   anchor deploy
   ```

3. **Run Development Servers**  
   Start all Next.js apps using Turborepo:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
   - The Vault app runs on `http://localhost:3000`.
   - The NFT Minter app runs on `http://localhost:3001`.
   - Open these URLs in your browser to explore the apps.

<Callout type="warning">
Ensure you have a Solana wallet (e.g., Phantom) installed and configured to interact with the apps.
</Callout>

## 🌟 Why This Project?

This project is designed to help developers understand and build Solana DApps by addressing key challenges:

- **Smart Contract Integration**: Seamlessly connect Anchor programs to Next.js frontends.
- **Data Handling**: Serialize and deserialize on-chain account data.
- **Transactions**: Build, sign, and submit transactions reliably.
- **Error Handling**: Manage on-chain errors gracefully.
- **State Sync**: Keep the UI in sync with blockchain state.
- **NFT Creation**: Implement end-to-end NFT minting with Metaplex.

## 📚 Learn More

Explore these resources to deepen your Solana development skills:

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Metaplex Documentation](https://docs.metaplex.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## 🚀 Deploy on Vercel

Deploy your Next.js apps to the [Vercel Platform](https://vercel.com/) for easy hosting. For monorepo setups, configure Vercel to build specific apps from the `apps/` directory. See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for details.

<Callout type="info">
Replace `VIDEO_URL_HERE` in the demo video sections with your actual video URLs (e.g., YouTube or hosted MP4 links).
</Callout>
```