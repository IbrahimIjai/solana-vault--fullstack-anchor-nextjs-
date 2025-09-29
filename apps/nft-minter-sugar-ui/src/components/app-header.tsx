'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { Menu, X } from 'lucide-react'
import { ClusterUiSelect } from './cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'

// Default navigation links if none are provided
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Mint', href: '/mint' },
    { name: 'Marketplace', href: '/marketplace' },
  ]


export function AppHeader() {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-primary-foreground font-bold text-sm">BA</span>
                </motion.div>
                <span className="font-bold text-xl">BoredApe NFT</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-foreground/80 hover:text-foreground transition-colors font-medium relative group"
                  >
                    {item.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                      whileHover={{ width: '100%' }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <WalletButton />
              <ClusterUiSelect />

              {/* Mobile Menu */}
              {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="text-foreground/80 hover:text-foreground transition-colors font-medium text-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Button className="mt-6 w-full">
                        <Wallet className="h-4 w-4 mr-2" />
                        Connect Wallet
                      </Button>
                    </motion.div>
                  </nav>
                </SheetContent>
              </Sheet> */}
            </div>

            {/* Right side buttons
            <div className="hidden md:flex items-center space-x-3">
            
            </div> */}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-black dark:text-white"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        
      </div>
    </motion.header>
  )
}
