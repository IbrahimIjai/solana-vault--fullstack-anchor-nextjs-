'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from '@workspace/ui/components/sonner'
import { AppHeader } from '@/components/app-header'
import { ModernFooter } from '@/components/modern-footer'
import React from 'react'
import { ClusterChecker } from '@/components/cluster/cluster-ui'
import { AccountChecker } from '@/components/account/account-ui'
import { AppFooter } from './app-footer'

// Default navigation links if none are provided
const defaultNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Mint', path: '/mint' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Collection', path: '/collection' },
  { label: 'Roadmap', path: '/roadmap' },
]

export function AppLayout({
  children,
  links = defaultNavLinks,
}: {
  children: React.ReactNode
  links?: { label: string; path: string }[]
}) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <AppHeader links={links} />
        <main className="flex-grow pt-20 md:pt-24">
          <ClusterChecker>
            <AccountChecker />
          </ClusterChecker>
          {children}
        </main>
        <AppFooter />
      </div>
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  )
}
