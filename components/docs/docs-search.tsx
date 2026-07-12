"use client"

import { ALL_DOCS } from "@/lib/colveor-config"
import { cn } from "@/lib/utils"
import { CornerDownLeft, FileText, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

// Mock/local search over the docs index. Designed so a provider like
// Algolia, Pagefind or Orama can replace `useResults` later.
function useResults(query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_DOCS.slice(0, 8)
    return ALL_DOCS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.group.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q),
    ).slice(0, 12)
  }, [query])
}

export function DocsSearchTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-8 items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          className,
        )}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search docs...</span>
        <kbd className="ml-2 hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  )
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useResults(query)

  useEffect(() => {
    inputRef.current?.focus()
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => setActive(0), [query])

  const go = useCallback(
    (slug: string) => {
      router.push(`/docs/${slug}`)
      onClose()
    },
    [router, onClose],
  )

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault()
      go(results[active].slug)
    }
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center p-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
    >
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 cursor-default bg-background/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
        onKeyDown={onKey}
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="thin-scrollbar max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul className="space-y-0.5">
              {results.map((r, i) => (
                <li key={r.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.slug)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                      i === active
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate">{r.title}</span>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {r.group}
                    </span>
                    {i === active && (
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span className="font-mono">colveor docs</span>
          <span className="hidden items-center gap-3 sm:flex">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border px-1 font-mono">↑</kbd>
              <kbd className="rounded border border-border px-1 font-mono">↓</kbd>
              to navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border px-1 font-mono">↵</kbd>
              to open
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
