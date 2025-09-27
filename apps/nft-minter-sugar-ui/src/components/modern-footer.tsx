'use client'

export function ModernFooter() {
  return (
    <footer className="bg-background border-t border-border py-4">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} CampSOL
        </p>
      </div>
    </footer>
  )
}