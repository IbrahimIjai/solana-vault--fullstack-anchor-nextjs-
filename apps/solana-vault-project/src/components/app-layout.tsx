'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from '@workspace/ui/components/sonner'
import { AppHeader } from '@/components/app-header'
import React from 'react'
import { AppFooter } from '@/components/app-footer'
import { ClusterChecker } from '@/components/cluster/cluster-ui'
import { AccountChecker } from '@/components/account/account-ui'
import { Spotlight } from '@/components/accernity-ui/spotlight'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-screen relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-40"
          fill="currentColor"
        />
        <AppHeader />
        <main className="flex-grow max-w-6xl mx-auto w-full">
          <ClusterChecker>
            <AccountChecker />
          </ClusterChecker>
          {children}
        </main>
        <AppFooter />
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
