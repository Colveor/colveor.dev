import type { Package } from "@/lib/colveor-config"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Boxes, Coins, Smartphone, Wrench } from "lucide-react"
import Link from "next/link"

const ICONS = {
  core: Boxes,
  fintech: Coins,
  flutter: Smartphone,
  devkit: Wrench,
} as const

export function PackageCard({
  pkg,
  className,
}: {
  pkg: Package
  className?: string
}) {
  const Icon = ICONS[pkg.id]
  return (
    <Link
      href={`/docs/${pkg.id}/overview`}
      className={cn(
        "group relative flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/50 text-primary">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            {pkg.registry === "pub" ? "pub.dev" : "npm"}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>
      </div>
      <h3 className="mt-4 font-mono text-sm text-foreground">{pkg.npm}</h3>
      <p className="mt-1 text-sm font-medium text-foreground">{pkg.short}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {pkg.description}
      </p>
    </Link>
  )
}
