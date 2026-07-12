import { Blocks, Layers, PackageCheck, Settings2, ShieldCheck } from "lucide-react"

const REASONS = [
  {
    icon: Layers,
    title: "Stop rebuilding backend foundations",
    body: "Authentication, users, RBAC, settings and notifications are solved once and reused across every application instead of being rewritten each time.",
  },
  {
    icon: Blocks,
    title: "Opinionated architecture",
    body: "Colveor makes deliberate structural decisions so teams share the same conventions, module boundaries and patterns from day one.",
  },
  {
    icon: PackageCheck,
    title: "Modular packages",
    body: "Adopt only what you need. Start with Core, add Fintech for financial primitives, reach for the Flutter package on mobile, and lean on DevKit for tooling.",
  },
  {
    icon: Settings2,
    title: "Production-focused defaults",
    body: "Sensible defaults for configuration, health checks and admin capabilities are built in, so the boring-but-critical pieces come standard.",
  },
  {
    icon: ShieldCheck,
    title: "Extensible domain infrastructure",
    body: "Domain packages build on Core's identity and RBAC layers, giving you a consistent base to extend with your own business logic.",
  },
]

export function WhySection() {
  return (
    <section id="why" className="border-b border-border bg-muted/20">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Why Colveor?
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            The infrastructure most products rebuild — already designed
          </h2>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => {
            const Icon = r.icon
            return (
              <div key={r.title} className="flex flex-col bg-card p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/50 text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-4 text-base font-medium text-foreground">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            )
          })}
          <div className="hidden bg-card p-6 lg:block" />
        </div>
      </div>
    </section>
  )
}
