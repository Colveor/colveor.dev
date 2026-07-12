"use client"

import { ColveorLogo } from "@/components/logo"
import { DocsSearchTrigger } from "@/components/docs/docs-search"
import { ThemeToggle } from "@/components/theme-toggle"
import { SITE } from "@/lib/colveor-config"
import { cn } from "@/lib/utils"
import { GithubIcon } from "@/components/github-icon"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV = [
  { title: "Documentation", href: "/docs/introduction", match: "/docs" },
  { title: "Packages", href: "/docs/introduction#packages", match: "__none__" },
  { title: "Changelog", href: "/docs/resources/changelog", match: "/docs/resources/changelog" },
]

export function SiteHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        {onToggleSidebar && (
          <button
            type="button"
            aria-label="Toggle documentation menu"
            onClick={onToggleSidebar}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <Link href="/" className="flex items-center">
          <ColveorLogo />
        </Link>

        <span className="ml-1 hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
          v0.x
        </span>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = item.match !== "__none__" && pathname.startsWith(item.match)
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DocsSearchTrigger className="hidden sm:inline-flex" />
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
            <div className="px-1 pt-2">
              <DocsSearchTrigger className="w-full justify-start" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
