import { ColveorLogo } from "@/components/logo"
import { SITE } from "@/lib/colveor-config"
import Link from "next/link"

const COLUMNS = [
  {
    title: "Packages",
    links: [
      { label: "@colveor/core", href: "/docs/core/overview" },
      { label: "@colveor/fintech", href: "/docs/fintech/overview" },
      { label: "@colveor/devkit", href: "/docs/devkit/overview" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Introduction", href: "/docs/introduction" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Architecture", href: "/docs/architecture" },
      { label: "API Reference", href: "/docs/api/core" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Changelog", href: "/docs/resources/changelog" },
      { label: "Contributing", href: "/docs/resources/contributing" },
      { label: "GitHub", href: SITE.github },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <ColveorLogo />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Opinionated backend foundations and reusable domain infrastructure
            for TypeScript and NestJS.
          </p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            An evolving open-source ecosystem.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-medium text-foreground">{col.title}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <span className="font-mono">colveor · v0.x</span>
          <span>Documentation placeholders — subject to change as the ecosystem evolves.</span>
        </div>
      </div>
    </footer>
  )
}
