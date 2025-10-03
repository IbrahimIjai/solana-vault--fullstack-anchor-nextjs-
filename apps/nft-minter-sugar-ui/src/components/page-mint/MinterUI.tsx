'use client'

import { useMemo, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Progress } from '@workspace/ui/components/progress'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
import { Separator } from '@workspace/ui/components/separator'
import { Wallet, Zap, Clock, CheckCircle, AlertCircle, Minus, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import useCandyMachineV3 from '@/hooks/use-candy-v3'
import { CANDY_MACHINE_ID } from '@/config'

//www.youtube.com/watch?v=9vrZ5aWc5iE&t=287s
export default function MinterUI() {
  const { publicKey, connected, connect } = useWallet()
  const [mintAmount, setMintAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [mintedTokens, setMintedTokens] = useState<string[]>([])

  // Use existing Metaplex hook to fetch Candy Machine + Guards + Prices
  const { candyMachine, items, prices, guardStates, status, mint } = useCandyMachineV3(CANDY_MACHINE_ID)

  // Derive UI values
  const defaultPrices = prices?.default
  const solPrice = useMemo(() => defaultPrices?.payment?.find((p) => p.kind === 'sol')?.price ?? null, [defaultPrices])
  const maxMint = useMemo(() => guardStates?.default?.canPayFor ?? 10, [guardStates?.default?.canPayFor])
  const totalSupply = items?.available || 0
  const minted = items?.redeemed || 0
  const remaining = items?.remaining || 0
  const progressPercentage = totalSupply ? (minted / totalSupply) * 100 : 0

  const handleMint = async () => {
    if (!connected || !publicKey) {
      await connect()
      return
    }
    if (!candyMachine) return
    try {
      setIsMinting(true)
      const nfts = await mint(mintAmount)
      const mintedList = nfts
        .map((n, i) => (n && 'name' in n ? (n as any).name || `#${minted + i + 1}` : `#${minted + i + 1}`))
        .filter(Boolean) as string[]
      setMintedTokens(mintedList)
    } catch (e) {
      console.error(e)
    } finally {
      setIsMinting(false)
    }
  }

  const adjustMintAmount = (delta: number) => {
    setMintAmount(Math.max(1, Math.min(maxMint, mintAmount + delta)))
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Mint Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">
              Solana Devnet
            </Badge>
            <h1 className="text-4xl font-bold text-balance">Mint Your BoredApe NFT</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Join the exclusive collection of unique digital apes on Solana blockchain.
            </p>
          </div>

          {/* Minting Progress */}
          <Card className="p-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Minting Progress</span>
                <Badge variant="outline">
                  {minted.toLocaleString()} / {totalSupply.toLocaleString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{progressPercentage.toFixed(1)}% minted</span>
                <span>{remaining.toLocaleString()} remaining</span>
              </div>
            </CardContent>
          </Card>

          {/* Mint Controls */}
          <Card className="p-2">
            <CardHeader>
              <CardTitle>Mint Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mint-amount">Amount to Mint</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => adjustMintAmount(-1)} disabled={mintAmount <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="mint-amount"
                    type="number"
                    value={mintAmount}
                    onChange={(e) =>
                      setMintAmount(Math.max(1, Math.min(maxMint, Number.parseInt(e.target.value) || 1)))
                    }
                    className="text-center"
                    min="1"
                    max={maxMint}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => adjustMintAmount(1)}
                    disabled={mintAmount >= maxMint}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Maximum {maxMint} NFTs per transaction</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price per NFT</span>
                  <span className="font-medium">{solPrice !== null ? `${solPrice} SOL` : '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <span className="font-medium">{mintAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Network Fee</span>
                  <span className="font-medium">~0.001 SOL</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>{solPrice !== null ? (solPrice * mintAmount + 0.001).toFixed(3) : '—'} SOL</span>
                </div>
              </div>

              <Button
                onClick={handleMint}
                disabled={isMinting || status.minting}
                className="w-full text-lg py-6"
                size="lg"
              >
                {isMinting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                    Minting...
                  </>
                ) : !connected || !publicKey ? (
                  <>
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Wallet
                  </>
                ) : status.candyMachine ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                    Loading Candy Machine...
                  </>
                ) : remaining <= 0 ? (
                  <>
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Sold Out
                  </>
                ) : guardStates?.default && !guardStates.default.isStarted ? (
                  <>
                    <Clock className="mr-2 h-5 w-5" />
                    Not started
                  </>
                ) : guardStates?.default && guardStates.default.isEnded ? (
                  <>
                    <Clock className="mr-2 h-5 w-5" />
                    Ended
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Mint {mintAmount} NFT{mintAmount > 1 ? 's' : ''}
                  </>
                )}
              </Button>

              {mintedTokens.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Successfully Minted!</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-500 mt-1">Tokens: {mintedTokens.join(', ')}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Preview & Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* NFT Preview */}
          <Card className="p-2">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4">
                <div className="text-8xl">🐵</div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">BoredApe #{minted + 1}</h3>
                <p className="text-muted-foreground">Your next unique NFT</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Rare</Badge>
                  <Badge variant="secondary">Golden Fur</Badge>
                  <Badge variant="secondary">Laser Eyes</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mint Information */}
          <Card className="p-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Important Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Minting Process</p>
                    <p className="text-muted-foreground">Each mint takes 10-30 seconds to complete on Solana devnet.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Network Fees</p>
                    <p className="text-muted-foreground">
                      Low transaction fees thanks to Solana's efficient blockchain.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Ownership</p>
                    <p className="text-muted-foreground">
                      Full ownership and commercial rights included with each NFT.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Mints */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Mints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: '#2847', time: '2 min ago', rarity: 'Epic' },
                  { id: '#2846', time: '5 min ago', rarity: 'Rare' },
                  { id: '#2845', time: '8 min ago', rarity: 'Common' },
                  { id: '#2844', time: '12 min ago', rarity: 'Legendary' },
                ].map((mint) => (
                  <div key={mint.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-lg">
                        🐵
                      </div>
                      <div>
                        <p className="font-medium">BoredApe {mint.id}</p>
                        <p className="text-sm text-muted-foreground">{mint.time}</p>
                      </div>
                    </div>
                    <Badge variant={mint.rarity === 'Legendary' ? 'default' : 'secondary'}>{mint.rarity}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
