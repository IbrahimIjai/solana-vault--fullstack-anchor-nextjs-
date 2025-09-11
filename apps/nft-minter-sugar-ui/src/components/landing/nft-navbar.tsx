'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@workspace/ui/components/button'
import { Menu, X } from 'lucide-react'
import { WalletButton } from '@/components/solana/solana-provider'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterUiSelect } from '@/components/cluster/cluster-ui'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Mint', path: '/mint' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Collection', path: '/collection' },
  { label: 'Roadmap', path: '/roadmap' },
]

export function NftNavbar() {
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
          ? 'bg-black/80 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg"></div>
              <div className="absolute inset-0.5 bg-black rounded-lg flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 font-bold text-xl">B</span>
              </div>
            </div>
            <span className="font-bold text-xl text-white">BoredApe<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">SOL</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
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
            className="md:hidden text-white"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-black/95 backdrop-blur-md z-50">
          <div className="flex flex-col p-4 gap-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-3 rounded-lg text-base font-medium ${
                    isActive(link.path)
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setShowMenu(false)}
                >
                  {link.label}
                </Link>
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
