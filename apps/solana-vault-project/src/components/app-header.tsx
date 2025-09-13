'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { Menu, X, Vault } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { WalletButton } from '@/components/solana/solana-provider'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Vault', path: '/vault' },
  { label: 'Account', path: '/account' }
]

export function AppHeader() {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Vault className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground">Vault</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <WalletButton />
            <ThemeSelect />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-1.5"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => setShowMenu(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-border/40 space-y-2">
              <WalletButton />
              <ThemeSelect />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
