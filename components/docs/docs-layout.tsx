"use client"

import { DocsSidebarContent } from "@/components/docs/docs-sidebar"
import { DocsTableOfContents, type TocItem } from "@/components/docs/docs-toc"
import { SiteHeader } from "@/components/site-header"
import { getDocNeighbors } from "@/lib/colveor-config"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

export function DocsLayout({
  children,
  toc,
  slug,
}: {
  children: ReactNode
  toc: TocItem[]
  slug: string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { prev, next } = getDocNeighbors(slug)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader onToggleSidebar={() => setMobileOpen(true)} />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 px-0 sm:px-6">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 border-r border-border lg:block">
          <DocsSidebarContent />
        </aside>

        {/* Mobile sidebar drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 border-r border-border bg-background">
              <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                <span className="text-sm font-medium text-foreground">Documentation</span>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="h-[calc(100%-3rem)]">
                <DocsSidebarContent />
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex min-w-0 flex-1 justify-center">
          <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:max-w-3xl lg:py-12">
            <article className="docs-prose">{children}</article>

            <nav className="mt-14 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/docs/${prev.slug}`}
                  className="group flex flex-col rounded-lg border border-border p-4 transition-colors hover:border-primary/40"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowLeft className="h-3.5 w-3.5" /> Previous
                  </span>
                  <span className="mt-1 text-sm font-medium text-foreground">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/docs/${next.slug}`}
                  className={cn(
                    "group flex flex-col rounded-lg border border-border p-4 text-right transition-colors hover:border-primary/40",
                  )}
                >
                  <span className="inline-flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-1 text-sm font-medium text-foreground">{next.title}</span>
                </Link>
              )}
            </nav>
          </main>

          {/* Right TOC */}
          <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto py-12 pl-6 xl:block">
            <DocsTableOfContents items={toc} />
          </aside>
        </div>
      </div>
    </div>
  )
}
