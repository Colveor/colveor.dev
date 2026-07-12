import { DocsCta } from "@/components/home/docs-cta"
import { EcosystemSection } from "@/components/home/ecosystem-section"
import { Hero } from "@/components/home/hero"
import { ModulesSection } from "@/components/home/modules-section"
import { WhySection } from "@/components/home/why-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <EcosystemSection />
        <WhySection />
        <ModulesSection />
        <DocsCta />
      </main>
      <SiteFooter />
    </div>
  )
}
