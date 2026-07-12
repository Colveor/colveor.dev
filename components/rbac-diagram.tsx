import { cn } from "@/lib/utils"
import { ArrowRight, KeyRound, Layers, ShieldCheck, UserCheck } from "lucide-react"

const STEPS = [
  { label: "Module", sub: "Feature boundary", icon: Layers },
  { label: "Permission", sub: "Granular action", icon: KeyRound },
  { label: "Role", sub: "Grouped permissions", icon: ShieldCheck },
  { label: "User Role", sub: "Assignment to a user", icon: UserCheck },
]

export function RbacDiagram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-background p-5 md:flex-row md:items-center",
        className,
      )}
    >
      {STEPS.map((step, i) => {
        const Icon = step.icon
        return (
          <div key={step.label} className="flex flex-1 items-center gap-3 md:flex-col md:gap-3">
            <div className="flex w-full flex-1 flex-col rounded-lg border border-border bg-card p-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/50 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">{step.label}</p>
              <p className="text-xs text-muted-foreground">{step.sub}</p>
            </div>
            {i < STEPS.length - 1 && (
              <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-muted-foreground md:rotate-0" aria-hidden />
            )}
          </div>
        )
      })}
    </div>
  )
}
