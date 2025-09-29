'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from '@workspace/ui/components/sonner'
import { AppHeader } from '@/components/app-header'
import React from 'react'
import { ClusterChecker } from '@/components/cluster/cluster-ui'
import { AccountChecker } from '@/components/account/account-ui'
import { AppFooter } from './app-footer'

export function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <AppHeader  />
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
