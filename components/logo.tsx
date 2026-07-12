import { cn } from "@/lib/utils"

/**
 * Temporary abstract, developer-oriented mark for Colveor.
 * Two offset stacked layers forming a "C" gap — evokes composable
 * foundation layers. Intentionally simple; official branding TBD.
 */
export function ColveorMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="7"
        className="fill-primary/10 stroke-primary/40"
        strokeWidth="1.5"
      />
      <path
        d="M22 11.5A6.5 6.5 0 1 0 22 20.5"
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2" className="fill-primary" />
    </svg>
  )
}

export function ColveorLogo({
  className,
  withWordmark = true,
}: {
  className?: string
  withWordmark?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <ColveorMark />
      {withWordmark && (
        <span className="font-mono text-[15px] font-semibold tracking-tight text-foreground">
          colveor
        </span>
      )}
    </span>
  )
}
