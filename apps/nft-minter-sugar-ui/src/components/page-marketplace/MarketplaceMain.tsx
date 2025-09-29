'use client'

import { useState } from 'react'
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Input } from '@workspace/ui/components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select'
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { Search, Filter, Grid, List, Heart, ExternalLink, TrendingUp, Clock } from 'lucide-react'
import { motion } from 'motion/react'

interface NFT {
  id: string
  name: string
  price: number
  image: string
  rarity: string
  traits: string[]
  lastSale?: number
  timeLeft?: string
  isAuction?: boolean
  liked?: boolean
}

export function MarketplaceUi() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('price-low')
  const [filterRarity, setFilterRarity] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [likedNFTs, setLikedNFTs] = useState<Set<string>>(new Set())

  const nfts: NFT[] = [
    {
      id: '2847',
      name: 'BoredApe #2847',
      price: 0.75,
      image: '🐵',
      rarity: 'Legendary',
      traits: ['Golden Fur', 'Laser Eyes', 'Crown'],
      lastSale: 0.65,
    },
    {
      id: '2846',
      name: 'BoredApe #2846',
      price: 0.45,
      image: '🐵',
      rarity: 'Epic',
      traits: ['Silver Fur', 'Sunglasses'],
      lastSale: 0.4,
      isAuction: true,
      timeLeft: '2h 15m',
    },
    {
      id: '2845',
      name: 'BoredApe #2845',
      price: 0.32,
      image: '🐵',
      rarity: 'Rare',
      traits: ['Brown Fur', 'Hat'],
      lastSale: 0.28,
    },
    {
      id: '2844',
      name: 'BoredApe #2844',
      price: 0.89,
      image: '🐵',
      rarity: 'Legendary',
      traits: ['Rainbow Fur', 'Diamond Eyes', 'Gold Chain'],
      lastSale: 0.75,
    },
    {
      id: '2843',
      name: 'BoredApe #2843',
      price: 0.25,
      image: '🐵',
      rarity: 'Common',
      traits: ['Brown Fur'],
      lastSale: 0.22,
    },
    {
      id: '2842',
      name: 'BoredApe #2842',
      price: 0.55,
      image: '🐵',
      rarity: 'Epic',
      traits: ['Blue Fur', 'Mohawk'],
      lastSale: 0.48,
      isAuction: true,
      timeLeft: '5h 42m',
    },
  ]

  const toggleLike = (nftId: string) => {
    const newLiked = new Set(likedNFTs)
    if (newLiked.has(nftId)) {
      newLiked.delete(nftId)
    } else {
      newLiked.add(nftId)
    }
    setLikedNFTs(newLiked)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'Epic':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
      case 'Rare':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  const filteredNFTs = nfts.filter((nft) => {
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRarity = filterRarity === 'all' || nft.rarity.toLowerCase() === filterRarity
    return matchesSearch && matchesRarity
  })

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rarity':
        return b.rarity.localeCompare(a.rarity)
      case 'recent':
        return Number.parseInt(b.id) - Number.parseInt(a.id)
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 mb-12"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-balance">NFT Marketplace</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Discover, collect, and trade unique BoredApe NFTs on Solana.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Volume', value: '1,847 SOL', icon: TrendingUp },
            { label: 'Floor Price', value: '0.25 SOL', icon: TrendingUp },
            { label: 'Listed', value: '234', icon: Grid },
            { label: 'Owners', value: '1,234', icon: Grid },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-muted/30 rounded-lg p-4 text-center"
            >
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 mb-8"
      >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="buy-now">Buy Now</TabsTrigger>
            <TabsTrigger value="auction">Auctions</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterRarity} onValueChange={setFilterRarity}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarities</SelectItem>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
              <SelectItem value="recent">Recently Listed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* NFT Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
      >
        {sortedNFTs.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {viewMode === 'grid' ? (
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl">
                      {nft.image}
                    </div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-background/80 backdrop-blur"
                        onClick={() => toggleLike(nft.id)}
                      >
                        <Heart className={`h-4 w-4 ${likedNFTs.has(nft.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    {nft.isAuction && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="destructive" className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{nft.timeLeft}</span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{nft.name}</h3>
                        <Badge className={getRarityColor(nft.rarity)}>{nft.rarity}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {nft.traits.slice(0, 2).map((trait) => (
                          <Badge key={trait} variant="outline" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                        {nft.traits.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{nft.traits.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Price</span>
                        <span className="font-bold text-lg">{nft.price} SOL</span>
                      </div>
                      {nft.lastSale && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Last Sale</span>
                          <span className="text-sm">{nft.lastSale} SOL</span>
                        </div>
                      )}
                    </div>

                    <Button className="w-full" size="lg">
                      {nft.isAuction ? 'Place Bid' : 'Buy Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {nft.image}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{nft.name}</h3>
                        <Badge className={getRarityColor(nft.rarity)}>{nft.rarity}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {nft.traits.map((trait) => (
                          <Badge key={trait} variant="outline" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="font-bold text-xl">{nft.price} SOL</div>
                      {nft.lastSale && <div className="text-sm text-muted-foreground">Last: {nft.lastSale} SOL</div>}
                      {nft.isAuction && (
                        <Badge variant="destructive" className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{nft.timeLeft}</span>
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => toggleLike(nft.id)}>
                        <Heart className={`h-4 w-4 ${likedNFTs.has(nft.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button>{nft.isAuction ? 'Bid' : 'Buy'}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </motion.div>

      {sortedNFTs.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">No NFTs Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
    </div>
  )
}
