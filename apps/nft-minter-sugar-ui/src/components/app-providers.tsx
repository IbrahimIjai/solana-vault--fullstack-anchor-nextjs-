'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { ReactQueryProvider } from './react-query-provider'
import { ClusterProvider } from '@/components/cluster/cluster-data-access'
import { SolanaProvider } from '@/components/solana/solana-provider'
import { Toaster } from 'sonner'
import React from 'react'

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <ThemeProvider >
        <ClusterProvider>
          <SolanaProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </SolanaProvider>
        </ClusterProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
