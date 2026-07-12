import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

// Header block shown at the top of every doc page.
export function DocHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h1>{title}</h1>
      {description && (
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}

// Section heading with an anchor id — feeds the table of contents.
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id}>{children}</h2>
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return <h3 id={id}>{children}</h3>
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-lg leading-relaxed text-muted-foreground">{children}</p>
}

// Simple key/value reference table for conceptual overviews.
export function DefinitionList({
  items,
}: {
  items: { term: string; description: ReactNode }[]
}) {
  return (
    <dl className="my-5 divide-y divide-border overflow-hidden rounded-lg border border-border">
      {items.map((item) => (
        <div key={item.term} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:gap-4">
          <dt className="font-mono text-sm text-foreground">{item.term}</dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">{item.description}</dd>
        </div>
      ))}
    </dl>
  )
}

export function FeatureList({
  items,
  className,
}: {
  items: { title: string; body: string }[]
  className?: string
}) {
  return (
    <div className={cn("my-5 grid gap-3 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <div key={item.title} className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium text-foreground">{item.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>
  )
}
