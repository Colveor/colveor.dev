import { CodeBlock } from "@/components/code-block"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, BookOpen, Terminal } from "lucide-react"
import Link from "next/link"

const HERO_CODE = `import { Module } from '@nestjs/common'
import { ColveorCoreModule } from '@colveor/core'
import { ColveorFintechModule } from '@colveor/fintech'

@Module({
  imports: [
    // Identity, auth, RBAC, settings, notifications...
    ColveorCoreModule.forRoot(),
    // Wallets, transactions, providers on top of Core
    ColveorFintechModule.forRoot(),
  ],
})
export class AppModule {}`

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono">TypeScript · NestJS · Flutter</span>
            <span className="text-border">·</span>
            <span>v0.x</span>
          </div>

          <h1 className="mt-6 text-pretty text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Build the foundation once. Focus on your product.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Colveor is an opinionated ecosystem of reusable foundations across
            backend services, financial infrastructure and Flutter apps — so you
            stop rebuilding authentication, RBAC, wallets and mobile plumbing for
            every project.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/docs/quick-start"
              className={cn(buttonVariants({ variant: "default" }), "h-11 gap-2 px-5 text-sm")}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/introduction"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 gap-2 px-5 text-sm")}
            >
              <BookOpen className="h-4 w-4" />
              View Documentation
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" />
            <span>npm install @colveor/core</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-primary/5 blur-2xl" />
          <CodeBlock code={HERO_CODE} lang="ts" filename="app.module.ts" className="my-0 shadow-xl" />
          <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
            Conceptual example — exact module APIs are documented as they stabilize.
          </p>
        </div>
      </div>
    </section>
  )
}
