import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'sonner';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, Coins, CalendarDays } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

export interface NFTCollection {
  id: string
  name: string
  description: string
  image: string
  price: number
  totalSupply: number
  mintedCount: number
  mintDate: Date
  creator: string
  status: 'upcoming' | 'active' | 'ended'
}

interface MinterCardProps {
  collection: NFTCollection
}

export const MinterCard: React.FC<MinterCardProps> = ({ collection }) => {
  const progress = Math.floor((collection.mintedCount / collection.totalSupply) * 100)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={
            collection.status === 'active' ? 'default' : collection.status === 'upcoming' ? 'secondary' : 'outline'
          }
        >
          {collection.status === 'active' ? 'Live' : collection.status === 'upcoming' ? 'Upcoming' : 'Ended'}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{collection.name}</CardTitle>
        <CardDescription className="line-clamp-2">{collection.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4" />
            <span className="font-medium">{collection.price} SOL</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span className="text-sm">
              {collection.status === 'upcoming'
                ? `Starts ${formatDistanceToNow(collection.mintDate, { addSuffix: true })}`
                : collection.status === 'active'
                  ? 'Live now'
                  : 'Ended'}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>
              {collection.mintedCount} / {collection.totalSupply}
            </span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/mint/${collection.id}`} className="w-full">
          <Button
            className="w-full"
            variant={collection.status === 'active' ? 'default' : 'secondary'}
            disabled={collection.status === 'ended'}
          >
            {collection.status === 'active'
              ? 'Mint Now'
              : collection.status === 'upcoming'
                ? 'View Details'
                : 'Mint Ended'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

interface MinterCollectionProps {
  collections: NFTCollection[]
}

export const MinterCollection: React.FC<MinterCollectionProps> = ({ collections }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <MinterCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  )
}

interface MintDetailsProps {
  collection: NFTCollection
  onMint: () => Promise<void>
  isMinting: boolean
}

export const MintDetails: React.FC<MintDetailsProps> = ({ collection, onMint, isMinting }) => {
  const { connected } = useWallet()
  const progress = Math.floor((collection.mintedCount / collection.totalSupply) * 100)

  const handleMint = async () => {
    if (!connected) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to mint NFTs',
      })
      return
    }

    if (collection.status !== 'active') {
      toast.error('Minting not available', {
        description: collection.status === 'upcoming' ? "Minting hasn't started yet" : 'Minting has ended',
      })
      return
    }

    try {
      await onMint()
    } catch (error) {
      console.error('Mint error:', error)
      toast.error("Minting failed",{
        description: 'There was an error while minting your NFT',
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image src={collection.image} alt={collection.name} fill className="object-cover" />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{collection.name}</h1>
          <p className="mt-2 text-muted-foreground ">{collection.description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-sm font-medium">Price</h3>
              <p className="text-2xl font-bold">{collection.price} SOL</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Status</h3>
              <Badge
                variant={
                  collection.status === 'active'
                    ? 'default'
                    : collection.status === 'upcoming'
                      ? 'secondary'
                      : 'outline'
                }
                className="mt-1"
              >
                {collection.status === 'active' ? 'Live' : collection.status === 'upcoming' ? 'Upcoming' : 'Ended'}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Supply</h3>
              <span>
                {collection.mintedCount} / {collection.totalSupply}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium">Mint Date</h3>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {collection.status === 'upcoming'
                  ? `Starts ${formatDistanceToNow(collection.mintDate, { addSuffix: true })}`
                  : collection.status === 'active'
                    ? 'Live now'
                    : 'Ended'}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium">Creator</h3>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm truncate">{collection.creator}</span>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={!connected || collection.status !== 'active' || isMinting}
            onClick={handleMint}
          >
            {isMinting ? 'Minting...' : 'Mint NFT'}
          </Button>
        </div>
      </div>
    </div>
  )
}
