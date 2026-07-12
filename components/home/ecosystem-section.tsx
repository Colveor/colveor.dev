import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { PackageCard } from "@/components/package-card"
import { PACKAGES } from "@/lib/colveor-config"

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            The ecosystem
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Three composable packages, one coherent foundation
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Colveor is organized into focused packages. Core provides the shared
            application foundation, Fintech layers financial capabilities on top
            of it, and DevKit keeps development standards consistent across the
            ecosystem.
          </p>
        </div>

        <div id="packages" className="mt-10 grid gap-4 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-8">
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  )
}
