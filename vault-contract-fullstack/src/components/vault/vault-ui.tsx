'use client'

import { useVaultProgram } from './vault-data-access'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowDownToLine, ArrowUpFromLine, ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Skeleton } from '../ui/skeleton'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useCluster } from '../cluster/cluster-data-access'

export function VaultProgramUI() {
  const {
    initialize,
    isInitialized,
    isLoading,
    userBalance,
    transferIn,
    transferOut,
    fetchBalances,
    vaultBalance,
    USDC_PROGRAM_ID,
    userPublicKey,
    tokenVault,
  } = useVaultProgram()
  const { getExplorerUrl } = useCluster()

  const [amount, setAmount] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('deposit')

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Only allow numbers and decimals
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
      setError(null)
    }
  }

  const handleInitialize = async () => {
    try {
      setError(null)
      await initialize()
      toast.success('Success', {
        description: 'Vault has been initialized successfully',
      })
    } catch (err: unknown) {
      console.log({ err })
      setError(err instanceof Error ? err.message : 'Failed to initialize vault')
      toast.error('Error', {
        description: err instanceof Error ? err.message : 'Failed to initialize vault',
      })
    }
  }

  const handleTransferIn = async () => {
    try {
      setError(null)
      if (!amount || parseFloat(amount) <= 0) {
        setError('Please enter a valid amount')
        return
      }

      await transferIn(parseFloat(amount))
      setAmount('')
      toast.success('Success', {
        description: `Successfully deposited ${amount} USDC into the vault`,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to deposit into vault')
      toast.error('Error', {
        description: err instanceof Error ? err.message : 'Failed to deposit into vault',
      })
    }
  }

  const handleTransferOut = async () => {
    try {
      setError(null)
      if (!amount || parseFloat(amount) <= 0) {
        setError('Please enter a valid amount')
        return
      }

      if (vaultBalance !== null && parseFloat(amount) > vaultBalance) {
        setError('Insufficient vault balance')
        return
      }

      await transferOut(parseFloat(amount))
      setAmount('')
      toast.success('Success', {
        description: `Successfully withdrawn ${amount} USDC from the vault`,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to withdraw from vault')
      toast.error('Error', {
        description: err instanceof Error ? err.message : 'Failed to withdraw from vault',
      })
    }
  }

  const handleRefresh = async () => {
    try {
      await fetchBalances()
      toast.success('Success', {
        description: 'Balances have been updated',
      })
    } catch (err: unknown) {
      toast.error('Error', {
        description: err instanceof Error ? err.message : 'Failed to refresh balances',
      })
    }
  }

  // Handle max amount button
  const setMaxAmount = () => {
    if (activeTab === 'deposit' && userBalance !== null) {
      setAmount(userBalance.toString())
    } else if (activeTab === 'withdraw' && vaultBalance !== null) {
      setAmount(vaultBalance.toString())
    }
  }

  return (
    <div className="space-y-4">
      {!isInitialized && (
        <Card>
          <CardHeader>
            <CardTitle>Initialize Vault</CardTitle>
            <CardDescription>
              The vault needs to be initialized before you can deposit or withdraw tokens
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleInitialize} disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Initialize Vault
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Balance Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Your Wallet Balance
              <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold">
              {isLoading ? (
                <Skeleton className="h-10 w-24 mx-auto" />
              ) : (
                <>{userBalance !== null ? `${userBalance.toLocaleString()} USDC` : '0 USDC'}</>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {userPublicKey && (
                <a
                  href={getExplorerUrl(`address/${userPublicKey.toString()}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 hover:underline"
                >
                  View in Explorer <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <Button variant="outline" size="sm" className="mt-3" onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : null}
              Refresh Balances
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Vault Balance
              <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold">
              {isLoading ? (
                <Skeleton className="h-10 w-24 mx-auto" />
              ) : (
                <>{vaultBalance !== null ? `${vaultBalance.toLocaleString()} USDC` : '0 USDC'}</>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {tokenVault && (
                <a
                  href={getExplorerUrl(`address/${tokenVault.toString()}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 hover:underline"
                >
                  View in Explorer <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Section */}
      {isInitialized && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Your Tokens</CardTitle>
            <CardDescription>Deposit tokens to the vault or withdraw them back to your wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="deposit" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="deposit">Deposit</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              </TabsList>
              <TabsContent value="deposit" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="depositAmount">Amount to Deposit</Label>
                      <Button variant="link" className="p-0 h-auto text-xs" onClick={setMaxAmount}>
                        MAX
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        id="depositAmount"
                        placeholder="0.00"
                        value={amount}
                        onChange={handleAmountChange}
                        disabled={isLoading}
                      />
                      <Button disabled={isLoading || !amount || parseFloat(amount) <= 0} onClick={handleTransferIn}>
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowDownToLine className="mr-2 h-4 w-4" />
                        )}
                        Deposit
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="withdraw" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="withdrawAmount">Amount to Withdraw</Label>
                      <Button variant="link" className="p-0 h-auto text-xs" onClick={setMaxAmount}>
                        MAX
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        id="withdrawAmount"
                        placeholder="0.00"
                        value={amount}
                        onChange={handleAmountChange}
                        disabled={isLoading}
                      />
                      <Button
                        disabled={
                          isLoading ||
                          !amount ||
                          parseFloat(amount) <= 0 ||
                          (vaultBalance !== null && parseFloat(amount) > vaultBalance)
                        }
                        onClick={handleTransferOut}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowUpFromLine className="mr-2 h-4 w-4" />
                        )}
                        Withdraw
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            {error && (
              <Alert variant="destructive" className="w-full">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      )}

      {/* Token Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Token Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-[120px_1fr] gap-1">
              <div className="font-medium">Token:</div>
              <div>USDC</div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-1">
              <div className="font-medium">Mint Address:</div>
              <div className="flex items-center">
                <span className="truncate">{USDC_PROGRAM_ID.toString()}</span>
                <a
                  href={getExplorerUrl(`address/${USDC_PROGRAM_ID.toString()}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-1">
              <div className="font-medium">Vault Address:</div>
              <div className="flex items-center">
                <span className="truncate">{tokenVault.toString()}</span>
                <a
                  href={getExplorerUrl(`address/${tokenVault.toString()}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-1 mt-4">
              <div className="font-medium">Instructions:</div>
              <div>
                <p>If you encounter &quot;invalidAccountData&quot; errors for mint_of_token_being_sent:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Open your browser console (F12)</li>
                  <li>Check for mint validation errors</li>
                  <li>Use Solana CLI to create a valid token:</li>
                  <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded block mt-1 text-xs">
                    solana-keygen new --outfile token-keypair.json
                    <br />
                    spl-token create-token token-keypair.json
                    <br />
                    spl-token create-account TOKEN_ADDRESS
                    <br />
                    spl-token mint TOKEN_ADDRESS 1000
                  </code>
                  <li>Then update the USDC_PROGRAM_ID in vault-data-access.tsx</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
