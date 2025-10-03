// Central config for Candy Machine wiring in the UI.
// Prefer setting NEXT_PUBLIC_CANDY_MACHINE_ID in your environment.

export const CANDY_MACHINE_ID =
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || '2Ri9qynLQ9F6xKSEgmcMMptbFra6JYRMdH19k7EFS8nc'

// Optionally expose a default RPC for UIs that need it (unused here, kept for future Umi wiring).
export const DEFAULT_RPC = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com'
