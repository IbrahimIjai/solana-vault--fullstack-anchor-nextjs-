'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { Menu, X } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterUiSelect } from './cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'

// Default navigation links if none are provided
const defaultNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Mint', path: '/mint' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Collection', path: '/collection' },
  { label: 'Roadmap', path: '/roadmap' },
]

export function AppHeader({ links = defaultNavLinks }: { links?: { label: string; path: string }[] }) {
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Button variant="link" asChild className="p-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"></div>
                <div className="absolute inset-0.5 bg-white dark:bg-black rounded-lg flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 font-bold text-xl">🏕️</span>
                </div>
              </div>
              <span className="font-semibold text-lg text-black dark:text-white">Camp<span className="text-orange-600">SOL</span></span>
            </Link>
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                asChild
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50 dark:text-gray-400 dark:hover:text-orange-400 dark:hover:bg-orange-900/20'
                }`}
              >
                <Link href={link.path}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <WalletButton />
            <ClusterUiSelect />
            <ThemeSelect />
          </div>

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

      {/* Mobile menu */}
      {showMenu && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-white/95 dark:bg-black/95 backdrop-blur-md z-50">
          <div className="flex flex-col p-4 gap-4">
            <nav className="flex flex-col space-y-2">
              {links.map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  asChild
                  className={`px-4 py-3 rounded-lg text-base font-medium justify-start ${
                    isActive(link.path)
                      ? 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50 dark:text-gray-400 dark:hover:text-orange-400 dark:hover:bg-orange-900/20'
                  }`}
                  onClick={() => setShowMenu(false)}
                >
                  <Link href={link.path}>
                    {link.label}
                  </Link>
                </Button>
              ))}
            </nav>
            <div className="mt-4 space-y-3">
              <WalletButton />
              <ClusterUiSelect />
              <ThemeSelect />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
