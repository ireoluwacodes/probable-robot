'use client'

export function Footer() {
  return (
    <footer className="py-6 sm:py-8 border-t border-border">
      <div className="container px-4 sm:px-6">
        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} ireoluwa.
        </p>
      </div>
    </footer>
  )
}
