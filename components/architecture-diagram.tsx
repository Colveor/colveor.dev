import { cn } from "@/lib/utils"
import { ArrowDown, Boxes, Coins, LayoutTemplate, Wrench } from "lucide-react"

function Layer({
  label,
  sublabel,
  icon: Icon,
  tone = "default",
}: {
  label: string
  sublabel: string
  icon: typeof Boxes
  tone?: "default" | "app" | "primary"
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border px-4 py-3.5",
        tone === "app" && "border-dashed border-border bg-muted/30",
        tone === "default" && "border-border bg-card",
        tone === "primary" && "border-primary/40 bg-primary/5",
      )}
    >
      <span
        className={cn(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
          tone === "primary"
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-border bg-muted/50 text-muted-foreground",
        )}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-sm text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  )
}

export function ArchitectureDiagram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-background p-5 sm:flex-row sm:items-stretch sm:gap-5",
        className,
      )}
    >
      <div className="flex flex-1 flex-col items-center gap-2">
        <Layer
          label="Application"
          sublabel="Your product & business logic"
          icon={LayoutTemplate}
          tone="app"
        />
        <ArrowDown className="h-4 w-4 text-muted-foreground" aria-hidden />
        <Layer
          label="@colveor/fintech"
          sublabel="Financial domain infrastructure"
          icon={Coins}
        />
        <ArrowDown className="h-4 w-4 text-muted-foreground" aria-hidden />
        <Layer
          label="@colveor/core"
          sublabel="Foundational backend infrastructure"
          icon={Boxes}
          tone="primary"
        />
      </div>

      <div className="hidden w-px bg-border sm:block" />

      <div className="flex flex-col justify-center gap-3 sm:w-56">
        <div className="rounded-lg border border-border bg-card p-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground">
            <Wrench className="h-4 w-4" />
          </span>
          <p className="mt-3 font-mono text-sm text-foreground">@colveor/devkit</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Supports development standards and tooling across every layer of the
            ecosystem.
          </p>
        </div>
      </div>
    </div>
  )
}
