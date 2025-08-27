// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import VaulttestIDL from '../target/idl/vaulttest.json'
import type { Vaulttest } from '../target/types/vaulttest'

// Re-export the generated IDL and type
export { Vaulttest, VaulttestIDL }

// The programId is imported from the program IDL.
export const VAULTTEST_PROGRAM_ID = new PublicKey(VaulttestIDL.address)

// The different possible deployed program IDs
const PROGRAM_ID_OPTIONS = {
  fromIDL: VaulttestIDL.address,
  fromError: '42aYWK9kmnZfMMEUUze3SmPu87QYMBdcs1pbJYwkyFi4',
  // Try a few other likely values
  fromRust: 'F5TFsZKQ9J8QTPVdrZqGcaMKqawWgckUYSzTSRgqE95f',
}

// Create a global variable to allow setting the program ID from the console
// @ts-expect-error - adding to window
window.OVERRIDE_PROGRAM_ID = null

// Function to get the current program ID to use (can be changed at runtime)
function getCurrentProgramId(): string {
  // @ts-expect-error - accessing from window
  if (window.OVERRIDE_PROGRAM_ID) {
    // @ts-expect-error - accessing from window
    return window.OVERRIDE_PROGRAM_ID
  }

  // Default to the program ID from the error logs
  return PROGRAM_ID_OPTIONS.fromError
}

console.log('PROGRAM ID DEBUG:')
console.log('IDL programId:', PROGRAM_ID_OPTIONS.fromIDL)
console.log('Error programId:', PROGRAM_ID_OPTIONS.fromError)
console.log('Rust programId:', PROGRAM_ID_OPTIONS.fromRust)
console.log('Using programId:', getCurrentProgramId())
console.log('To override: window.OVERRIDE_PROGRAM_ID="NEW_ID_HERE"; location.reload();')

// This is a helper function to get the Counter Anchor program.
export function getCounterProgram(provider: AnchorProvider): Program<Vaulttest> {
  // Get the most current program ID (can be changed at runtime)
  const programAddress = getCurrentProgramId()

  // Create a deep copy of the IDL to avoid modifying the original
  const idlCopy = JSON.parse(JSON.stringify(VaulttestIDL))

  // Override the address in the IDL copy
  idlCopy.address = programAddress

  console.log('Creating program with programId:', programAddress)

  return new Program(idlCopy as Vaulttest, provider)
}

// This is a helper function to get the program ID for the Counter program.
export function getCounterProgramId(): PublicKey {
  // Always return the current program ID
  return new PublicKey(getCurrentProgramId())
}
