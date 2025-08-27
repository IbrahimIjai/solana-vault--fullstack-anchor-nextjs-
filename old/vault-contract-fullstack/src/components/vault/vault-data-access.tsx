'use client'

import { getCounterProgram as getVaultProgram, getCounterProgramId } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import { useEffect, useMemo, useState } from 'react'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../use-transaction-toast'
import { getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import * as anchor from '@coral-xyz/anchor'

export function useVaultProgram() {
  const { connection } = useConnection()
  const { publicKey: userPublickey } = useWallet()
  // Use the token address from your devnet/localnet deployment
  // This is the mint address of the token you've minted to your wallet
  const USDC_PROGRAM_ID = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU')

  console.log('Using token mint:', USDC_PROGRAM_ID.toString())

  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCounterProgramId(), [])
  const program = useMemo(() => getVaultProgram(provider), [provider])

  // Add function to verify mint account is valid
  const verifyMintAccount = async () => {
    try {
      console.log('Verifying mint account:', USDC_PROGRAM_ID.toString())
      const mintInfo = await connection.getAccountInfo(USDC_PROGRAM_ID)

      if (!mintInfo) {
        console.error('Mint account does not exist!')
        return false
      }

      // Check if the mint account is owned by the SPL Token program
      if (!mintInfo.owner.equals(TOKEN_PROGRAM_ID)) {
        console.error('Mint account is not owned by the SPL Token program!')
        console.error('Owner:', mintInfo.owner.toString())
        console.error('Expected:', TOKEN_PROGRAM_ID.toString())
        return false
      }

      console.log('Mint account is valid!')
      return true
    } catch (error) {
      console.error('Error verifying mint account:', error)
      return false
    }
  }

  // Add debug log to check program ID
  console.log('Using program ID:', programId.toString())

  const [userBalance, setUserBalance] = useState<number | null>(null)
  const [vaultBalance, setVaultBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [tokenAccountAddress, setTokenAccountAddress] = useState<string | null>(null)

  const [tokenAccountOwnerPda] = PublicKey.findProgramAddressSync([Buffer.from('token_account_owner_pda')], programId)

  const [tokenVault] = PublicKey.findProgramAddressSync(
    [Buffer.from('token_vault'), USDC_PROGRAM_ID.toBuffer()],
    programId,
  )

  const mintDecimals = 10 ** 6 // Assuming 9 decimals for SPL tokens

  console.log({ tokenAccountOwnerPda, tokenVault })

  const getUserTokenAccount = async () => {
    if (!userPublickey) throw new Error('Wallet not connected')

    // Just get the address of the token account without trying to create it
    const tokenAccountAddress = await getAssociatedTokenAddress(
      USDC_PROGRAM_ID,
      userPublickey,
      false, // allowOwnerOffCurve
    )

    // Return a mock account object with just the address property
    return {
      address: tokenAccountAddress,
      mint: USDC_PROGRAM_ID,
      owner: userPublickey,
    }
  }

  const fetchBalances = async () => {
    if (!userPublickey) return

    setIsLoading(true)
    try {
      // Get user token account
      const userTokenAcc = await getUserTokenAccount()
      // Only store the address as a string to avoid type issues
      setTokenAccountAddress(userTokenAcc.address.toString())

      console.log('User token account address:', userTokenAcc.address.toString())

      // Check if vault is initialized
      try {
        const vaultAccountInfo = await connection.getAccountInfo(tokenVault)
        setIsInitialized(!!vaultAccountInfo)
        console.log('Vault initialized:', !!vaultAccountInfo)

        // Get balances
        if (vaultAccountInfo) {
          try {
            const vaultTokenAccount = await getAccount(connection, tokenVault)
            setVaultBalance(Number(vaultTokenAccount.amount) / mintDecimals)
            console.log('Vault balance:', Number(vaultTokenAccount.amount) / mintDecimals)
          } catch (err) {
            // Vault token account not found or not initialized
            console.error('Error getting vault balance:', err)
            setVaultBalance(0)
          }
        }

        try {
          // Check if token account exists for this user
          const accountInfo = await connection.getAccountInfo(userTokenAcc.address)

          if (accountInfo) {
            const userTokenAccountInfo = await getAccount(connection, userTokenAcc.address)
            const balanceNumber = Number(userTokenAccountInfo.amount) / mintDecimals
            console.log('User token account found with balance:', balanceNumber)
            setUserBalance(balanceNumber)
          } else {
            console.log('User token account does not exist yet:', userTokenAcc.address.toString())
            setUserBalance(0)
          }
        } catch (err) {
          // User has no tokens yet
          console.error('Error getting user balance:', err)
          setUserBalance(0)
        }
      } catch (error) {
        console.error('Error fetching account info:', error)
        setIsInitialized(false)
      }
    } catch (error) {
      console.error('Error fetching balances:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userPublickey) {
      fetchBalances()
      // Also list all token accounts for debugging
      listUserTokenAccounts()
      // Verify mint account
      verifyMintAccount()
    } else {
      setUserBalance(null)
      setVaultBalance(null)
      setTokenAccountAddress(null)
      setIsInitialized(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPublickey, connection])

  // Function to list all token accounts owned by the user for debugging
  const listUserTokenAccounts = async () => {
    if (!userPublickey) return

    try {
      console.log('Fetching token accounts for wallet:', userPublickey.toString())

      // Get all token accounts owned by this wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(userPublickey, {
        programId: TOKEN_PROGRAM_ID,
      })

      console.log(`Found ${tokenAccounts.value.length} token accounts`)

      // Log details of each token account
      tokenAccounts.value.forEach((tokenAccount, i) => {
        const accountData = tokenAccount.account.data.parsed.info
        const mint = accountData.mint
        const balance = accountData.tokenAmount.uiAmount

        console.log(`Token Account #${i + 1}:`)
        console.log(`  Address: ${tokenAccount.pubkey.toString()}`)
        console.log(`  Mint: ${mint}`)
        console.log(`  Balance: ${balance}`)

        // Check if this is the USDC token we're looking for
        if (mint === USDC_PROGRAM_ID.toString()) {
          console.log(`  ✅ This is the USDC token we're using in the app`)
        }
      })
    } catch (error) {
      console.error('Error listing token accounts:', error)
    }
  }

  const initialize = async () => {
    if (!userPublickey) throw new Error('Wallet not connected')

    // First verify that the mint account is valid
    const isValidMint = await verifyMintAccount()
    if (!isValidMint) {
      throw new Error('Invalid token mint account. Please check the console for details.')
    }

    const userTokenAccount = await getUserTokenAccount()

    // Log all account addresses before sending
    console.log('Initializing with accounts:', {
      programId: programId.toString(),
      tokenAccountOwnerPda: tokenAccountOwnerPda.toString(),
      vaultTokenAccount: tokenVault.toString(),
      senderTokenAccount: userTokenAccount.address.toString(),
      mintOfTokenBeingSent: USDC_PROGRAM_ID.toString(),
      signer: userPublickey.toString(),
    })

    try {
      console.log('About to call program.methods.initialize()')
      console.log('Program object:', {
        programId: program.programId.toString(),
        provider: program.provider.connection.rpcEndpoint,
      })

      const tx = await program.methods
        .initialize()
        .accounts({
          //@ts-expect-error: bumps not used
          tokenAccountOwnerPda: tokenAccountOwnerPda,
          vaultTokenAccount: tokenVault,
          senderTokenAccount: userTokenAccount.address,
          mintOfTokenBeingSent: USDC_PROGRAM_ID,
          signer: userPublickey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc()

      transactionToast(tx)
      await fetchBalances() // Refresh balances after initialization
      return tx
    } catch (error: unknown) {
      console.error('Initialize error details:', error)

      // If it's an AnchorError with logs
      const anchorError = error as { logs?: string[] }
      if (anchorError.logs && Array.isArray(anchorError.logs)) {
        console.log('Error logs:', anchorError.logs)

        // Check if there are any DeclaredProgramIdMismatch errors
        const mismatchLines = anchorError.logs.filter(
          (line: string) => line.includes('DeclaredProgramIdMismatch') || line.includes('Program '),
        )

        if (mismatchLines.length > 0) {
          console.log('Program ID mismatch logs:', mismatchLines)

          // Try to extract the actual program ID from logs
          const programInvokeMatch = anchorError.logs.find(
            (log: string) => log.includes('Program ') && log.includes(' invoke [1]'),
          )

          if (programInvokeMatch) {
            const parts = programInvokeMatch.split(' ')
            const actualProgramId = parts[1]
            console.log('ACTUAL PROGRAM ID FROM LOGS:', actualProgramId)
            console.log('Please update DEPLOYED_VAULTTEST_PROGRAM_ID in vaulttest-exports.ts to this value')
          }
        }
      }

      throw error
    }
  }

  const transferIn = async (amount: number) => {
    if (!userPublickey) throw new Error('Wallet not connected')
    const userTokenAccount = await getUserTokenAccount()
    const amountInSmallestUnit = new anchor.BN(amount * mintDecimals)

    const tx = await program.methods
      .transferIn(amountInSmallestUnit)
      .accounts({
        // @ts-expect-error: IDL validation issues
        tokenAccountOwnerPda,
        vaultTokenAccount: tokenVault,
        senderTokenAccount: userTokenAccount.address,
        mintOfTokenBeingSent: USDC_PROGRAM_ID,
        signer: userPublickey as PublicKey,
      })
      .rpc()

    transactionToast(tx)
    await fetchBalances() // Refresh balances after transfer
    return tx
  }

  const transferOut = async (amount: number) => {
    if (!userPublickey) throw new Error('Wallet not connected')
    const userTokenAccount = await getUserTokenAccount()
    const amountInSmallestUnit = new anchor.BN(amount * mintDecimals)

    const tx = await program.methods
      .transferOut(amountInSmallestUnit)
      .accounts({
        // @ts-expect-error: IDL validation issues
        tokenAccountOwnerPda,
        vaultTokenAccount: tokenVault,
        senderTokenAccount: userTokenAccount.address,
        mintOfTokenBeingSent: USDC_PROGRAM_ID,
        signer: userPublickey as PublicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc()

    transactionToast(tx)
    await fetchBalances() // Refresh balances after transfer
    return tx
  }

  return {
    initialize,
    transferIn,
    transferOut,
    tokenAccountOwnerPda,
    tokenVault,
    program,
    programId,
    userBalance,
    fetchBalances,
    userPublicKey: userPublickey,
    vaultBalance,
    isInitialized,
    isLoading,
    USDC_PROGRAM_ID,
    tokenAccountAddress,
  }
}
