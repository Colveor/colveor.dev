import { cn } from "@/lib/utils"
import { ArrowDown, Boxes, Coins, LayoutTemplate, Smartphone, Wrench } from "lucide-react"

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

function StackLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
      {children}
    </p>
  )
}

export function ArchitectureDiagram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-xl border border-border bg-background p-5",
        className,
      )}
    >
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {/* Mobile stack */}
        <div className="flex flex-col">
          <StackLabel>Mobile</StackLabel>
          <div className="flex flex-1 flex-col items-center gap-2">
            <Layer
              label="Mobile Applications"
              sublabel="Your Flutter product"
              icon={LayoutTemplate}
              tone="app"
            />
            <ArrowDown className="h-4 w-4 text-muted-foreground" aria-hidden />
            <Layer
              label="colveor"
              sublabel="Flutter application foundation · pub.dev"
              icon={Smartphone}
              tone="primary"
            />
          </div>
        </div>

        {/* Backend stack */}
        <div className="flex flex-col">
          <StackLabel>Backend</StackLabel>
          <div className="flex flex-1 flex-col items-center gap-2">
            <Layer
              label="Backend Applications"
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
        </div>
      </div>

      {/* DevKit — spans the whole ecosystem */}
      <div className="flex items-start gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-4">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground">
          <Wrench className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="font-mono text-sm text-foreground">@colveor/devkit</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Supports development standards, tooling, automation and workflows
            across every package in the ecosystem.
          </p>
        </div>
      </div>
    </div>
  )
}
