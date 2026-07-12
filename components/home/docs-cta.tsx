import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, BookOpen, Terminal } from "lucide-react"
import Link from "next/link"

export function DocsCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-primary">
            <Terminal className="h-5 w-5" />
          </span>
          <h2 className="mt-6 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Read the documentation and start building
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Explore the architecture, packages and modules. Detailed reference
            documentation for every service and configuration option is being
            added as the ecosystem matures.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/introduction"
              className={cn(buttonVariants({ variant: "default" }), "h-11 gap-2 px-5 text-sm")}
            >
              <BookOpen className="h-4 w-4" />
              Browse Documentation
            </Link>
            <Link
              href="/docs/installation"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 gap-2 px-5 text-sm")}
            >
              Installation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
