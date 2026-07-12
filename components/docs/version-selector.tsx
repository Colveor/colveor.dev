"use client"

import { CURRENT_VERSION, VERSIONS } from "@/lib/colveor-config"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function VersionSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(CURRENT_VERSION.id)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-2.5 text-sm text-foreground transition-colors hover:bg-muted"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="font-mono">{selected}</span>
        </span>
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-full overflow-hidden rounded-md border border-border bg-popover p-1 shadow-lg">
          {VERSIONS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                setSelected(v.id)
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors hover:bg-muted",
                v.id === selected ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span className="flex items-center gap-2 font-mono">
                {v.label}
                {v.status === "current" && (
                  <span className="rounded border border-border px-1 text-[10px] uppercase text-muted-foreground">
                    current
                  </span>
                )}
              </span>
              {v.id === selected && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
          <p className="border-t border-border px-2 py-1.5 text-[11px] text-muted-foreground">
            Future versions will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
