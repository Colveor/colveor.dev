import { ModuleCard } from "@/components/module-card"
import {
  Bell,
  Coins,
  Fingerprint,
  LayoutTemplate,
  Network,
  Palette,
  Plug,
  Rocket,
  Settings2,
  ShieldCheck,
  Wallet,
} from "lucide-react"

const MODULES = [
  {
    title: "Authentication",
    description:
      "Configurable authentication methods with access tokens, refresh tokens, sessions and account management.",
    icon: Fingerprint,
    href: "/docs/core/authentication",
    badge: "core",
  },
  {
    title: "RBAC",
    description:
      "Modules, permissions, roles and user role assignments for granular access control.",
    icon: ShieldCheck,
    href: "/docs/core/rbac/overview",
    badge: "core",
  },
  {
    title: "Notifications",
    description:
      "Infrastructure for delivering application notifications across channels.",
    icon: Bell,
    href: "/docs/core/notifications",
    badge: "core",
  },
  {
    title: "Settings",
    description:
      "Application settings and configuration surfaces shared across modules.",
    icon: Settings2,
    href: "/docs/core/settings",
    badge: "core",
  },
  {
    title: "Wallets",
    description:
      "Wallet and balance infrastructure integrated with Colveor Core identity.",
    icon: Wallet,
    href: "/docs/fintech/wallets",
    badge: "fintech",
  },
  {
    title: "Transactions",
    description:
      "Financial transaction infrastructure for recording and processing movement of value.",
    icon: Coins,
    href: "/docs/fintech/transactions",
    badge: "fintech",
  },
  {
    title: "Provider Infrastructure",
    description:
      "Integration infrastructure for financial providers and payment webhooks.",
    icon: Plug,
    href: "/docs/fintech/providers",
    badge: "fintech",
  },
  {
    title: "UI Toolkit",
    description:
      "Reusable Flutter components — inputs, buttons, overlays, feedback and multi-step page flows.",
    icon: LayoutTemplate,
    href: "/docs/flutter/ui-toolkit",
    badge: "flutter",
  },
  {
    title: "App Bootstrap",
    description:
      "Application bootstrap, configuration, environment management and initialization hooks for Flutter apps.",
    icon: Rocket,
    href: "/docs/flutter/bootstrap",
    badge: "flutter",
  },
  {
    title: "Theming",
    description:
      "Customizable theme system with colors, typography, sizes and light and dark modes.",
    icon: Palette,
    href: "/docs/flutter/theming",
    badge: "flutter",
  },
  {
    title: "Mobile Networking",
    description:
      "API client foundation with Dio integration, interceptors, error handling and secure token storage.",
    icon: Network,
    href: "/docs/flutter/networking",
    badge: "flutter",
  },
]

export function ModulesSection() {
  return (
    <section id="modules" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            Modules
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Batteries-included building blocks
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            A selection of the areas Colveor covers today. The ecosystem is
            evolving, and each module gains deeper documentation as it stabilizes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <ModuleCard key={m.title} {...m} />
          ))}
        </div>
      </div>
    </section>
  )
}
