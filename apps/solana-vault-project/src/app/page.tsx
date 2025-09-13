'use client'

import Link from 'next/link'
import { ArrowRight, Vault, Coins, Sparkles, Shield, Zap, Lock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-medium">Next-Gen Token Vault</span>
              </div>
              
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    VAULT
                  </span>
                </h1>
                <div className="flex items-center justify-center gap-3 text-sm md:text-base font-light text-muted-foreground">
                  <span>LOCK</span>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span>SECURE</span>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-500" />
                  <span>UNLOCK</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Revolutionary SPL token management on Solana. 
                <span className="text-primary font-medium">Secure by design</span>, 
                <span className="text-primary font-medium">fast by nature</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-6 bg-card border border-border rounded-xl hover:border-primary/40 transition-all">
                <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">Secure Locking</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Advanced cryptographic security ensures your SPL tokens remain safe and accessible only to you.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-6 bg-card border border-border rounded-xl hover:border-primary/40 transition-all">
                <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">Lightning Speed</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Built on Solana for instant transactions with minimal fees. Experience the future of DeFi today.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-6 bg-card border border-border rounded-xl hover:border-primary/40 transition-all">
                <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center mb-4">
                  <Coins className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">Smart Management</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Intuitive interface for managing your token vault with real-time balance tracking and easy withdrawals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to <span className="text-primary">Secure</span> Your Tokens?
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Join the future of decentralized finance. Experience the vault that redefines token security.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/vault"
                className="group px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2">
                  <Vault className="w-4 h-4" />
                  Launch Vault
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <Shield className="w-3 h-3 text-primary" />
                <span>Connect wallet to begin</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-6 py-16 border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <p className="text-xs text-muted-foreground font-medium">Powered by cutting-edge technology</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Solana', 'Anchor', 'Next.js', 'TypeScript', 'Web3.js'].map((tech) => (
                  <div key={tech} className="px-3 py-1.5 bg-muted/20 hover:bg-primary/8 border border-border rounded-md text-xs font-medium transition-all cursor-default">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}
