import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

export type ModuleCardProps = {
  title: string
  description: string
  icon: LucideIcon
  href?: string
  badge?: string
  className?: string
}

export function ModuleCard({
  title,
  description,
  icon: Icon,
  href,
  badge,
  className,
}: ModuleCardProps) {
  const inner = (
    <>
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/50 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {badge && (
          <span className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </>
  )

  const base = cn(
    "block rounded-lg border border-border bg-card p-4 transition-colors",
    href && "hover:border-primary/40",
    className,
  )

  if (href) {
    return (
      <Link href={href} className={base}>
        {inner}
      </Link>
    )
  }
  return <div className={base}>{inner}</div>
}
