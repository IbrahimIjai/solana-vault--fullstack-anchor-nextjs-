'use client'

import Link from 'next/link'
import { ArrowRight, Vault, Coins, Sparkles, Shield, Zap, Lock } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-primary/5" />
      <div className="absolute top-32 left-20 w-64 h-64 bg-primary/8 rounded-full blur-2xl" />
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-primary/5 rounded-full blur-2xl" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">Next-Gen Token Vault</span>
              </div>
              
              {/* Main Title */}
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    VAULT
                  </span>
                </h1>
                <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl font-light text-muted-foreground">
                  <span>LOCK</span>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>SECURE</span>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-500" />
                  <span>UNLOCK</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
              <div className="group p-8 bg-card border border-border rounded-2xl hover:border-primary/40 transition-all">
                <div className="w-14 h-14 bg-primary/15 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Locking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced cryptographic security ensures your SPL tokens remain safe and accessible only to you.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 bg-card border border-border rounded-2xl hover:border-primary/40 transition-all">
                <div className="w-14 h-14 bg-primary/15 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Speed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built on Solana for instant transactions with minimal fees. Experience the future of DeFi today.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 bg-card border border-border rounded-2xl hover:border-primary/40 transition-all">
                <div className="w-14 h-14 bg-primary/15 rounded-xl flex items-center justify-center mb-6">
                  <Coins className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Intuitive interface for managing your token vault with real-time balance tracking and easy withdrawals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold">
                Ready to <span className="text-primary">Secure</span> Your Tokens?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join the future of decentralized finance. Experience the vault that redefines token security.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/vault"
                className="group px-10 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02]"
              >
                <span className="flex items-center gap-3">
                  <Vault className="w-5 h-5" />
                  Launch Vault
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Connect wallet to begin</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-6 py-16 border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8">
              <p className="text-muted-foreground font-medium">Powered by cutting-edge technology</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Solana', 'Anchor', 'Next.js', 'TypeScript', 'Web3.js'].map((tech) => (
                  <div key={tech} className="px-5 py-2 bg-muted/20 hover:bg-primary/8 border border-border rounded-lg text-sm font-medium transition-all cursor-default">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
