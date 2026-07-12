import { cn } from "@/lib/utils"
import { AlertTriangle, Info, Lightbulb, TriangleAlert } from "lucide-react"
import type { ReactNode } from "react"

type Variant = "note" | "tip" | "warning" | "danger"

const STYLES: Record<
  Variant,
  { icon: typeof Info; border: string; iconColor: string; label: string }
> = {
  note: {
    icon: Info,
    border: "border-l-primary",
    iconColor: "text-primary",
    label: "Note",
  },
  tip: {
    icon: Lightbulb,
    border: "border-l-chart-2",
    iconColor: "text-chart-2",
    label: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-l-chart-3",
    iconColor: "text-chart-3",
    label: "Warning",
  },
  danger: {
    icon: TriangleAlert,
    border: "border-l-destructive",
    iconColor: "text-destructive",
    label: "Caution",
  },
}

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant
  title?: string
  children: ReactNode
}) {
  const s = STYLES[variant]
  const Icon = s.icon
  return (
    <div
      className={cn(
        "my-5 flex gap-3 rounded-md border border-l-2 border-border bg-muted/40 p-4",
        s.border,
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", s.iconColor)} />
      <div className="min-w-0 text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline">
        <p className="mb-1 font-medium text-foreground">{title ?? s.label}</p>
        {children}
      </div>
    </div>
  )
}
