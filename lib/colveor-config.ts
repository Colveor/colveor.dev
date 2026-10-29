// Central configuration for the Colveor site & docs.
// Everything here is data-driven so new packages, versions, and doc
// sections can be added later without touching layout components.

export const SITE = {
  name: "Colveor",
  tagline: "Build the foundation once. Focus on your product.",
  description:
    "An opinionated application development ecosystem providing reusable foundations across backend services, financial infrastructure, Flutter applications and developer tooling.",
  github: "https://github.com/colveor",
}

export type Version = {
  id: string
  label: string
  status: "current" | "preview" | "archived"
}

// Only a v0.x line exists today — designed to support future versions.
export const VERSIONS: Version[] = [
  { id: "v0.x", label: "v0.x", status: "current" },
]

export const CURRENT_VERSION = VERSIONS[0]

export type PackageId = "core" | "fintech" | "flutter" | "devkit"

export type Package = {
  id: PackageId
  name: string
  /** Registry identifier (npm scope or pub.dev name). */
  npm: string
  /** Which registry the package is published to. */
  registry: "npm" | "pub"
  /** Runtime platform the package targets. */
  platform: "backend" | "mobile" | "tooling"
  short: string
  description: string
  layer: number // 0 = foundation
}

export const PACKAGES: Package[] = [
  {
    id: "core",
    name: "Core",
    npm: "@colveor/core",
    registry: "npm",
    platform: "backend",
    short: "Foundational backend infrastructure",
    description:
      "Identity, authentication, RBAC, settings, notifications, files and admin capabilities — the foundation every application shares.",
    layer: 0,
  },
  {
    id: "fintech",
    name: "Fintech",
    npm: "@colveor/fintech",
    registry: "npm",
    platform: "backend",
    short: "Financial domain infrastructure",
    description:
      "Wallets, balances, transactions, currencies, exchange rates and payment provider infrastructure built on top of Core.",
    layer: 1,
  },
  {
    id: "flutter",
    name: "Flutter",
    npm: "colveor",
    registry: "pub",
    platform: "mobile",
    short: "Flutter application foundation",
    description:
      "Reusable mobile application infrastructure — bootstrap, UI toolkit, theming, networking, routing, state and authentication foundations.",
    layer: 0,
  },
  {
    id: "devkit",
    name: "DevKit",
    npm: "@colveor/devkit",
    registry: "npm",
    platform: "tooling",
    short: "Shared developer tooling & standards",
    description:
      "TypeScript, ESLint, Prettier, testing, release, CI/CD and documentation tooling shared across the ecosystem.",
    layer: -1,
  },
]

export type NavLink = {
  title: string
  slug: string // resolves to /docs/<slug>
}

export type NavItem = {
  title: string
  slug?: string
  items?: NavItem[]
}

export type NavGroup = {
  title: string
  package?: PackageId
  items: NavItem[]
}

// The docs sidebar tree. Nested + collapsible. Add sections freely.
export const DOCS_NAV: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", slug: "introduction" },
      { title: "Installation", slug: "installation" },
      { title: "Quick Start", slug: "quick-start" },
      { title: "Architecture", slug: "architecture" },
      { title: "Configuration", slug: "configuration" },
    ],
  },
  {
    title: "Core",
    package: "core",
    items: [
      { title: "Overview", slug: "core/overview" },
      { title: "Authentication", slug: "core/authentication" },
      { title: "Users", slug: "core/users" },
      { title: "Profiles", slug: "core/profiles" },
      { title: "Account Management", slug: "core/account-management" },
      { title: "Sessions", slug: "core/sessions" },
      { title: "PIN", slug: "core/pin" },
      { title: "Invitations", slug: "core/invitations" },
      {
        title: "RBAC",
        items: [
          { title: "Overview", slug: "core/rbac/overview" },
          { title: "Modules", slug: "core/rbac/modules" },
          { title: "Permissions", slug: "core/rbac/permissions" },
          { title: "Roles", slug: "core/rbac/roles" },
          { title: "User Roles", slug: "core/rbac/user-roles" },
        ],
      },
      { title: "Settings", slug: "core/settings" },
      { title: "Notifications", slug: "core/notifications" },
      { title: "Files", slug: "core/files" },
      { title: "Admin", slug: "core/admin" },
      { title: "Health", slug: "core/health" },
    ],
  },
  {
    title: "Fintech",
    package: "fintech",
    items: [
      { title: "Overview", slug: "fintech/overview" },
      { title: "Installation", slug: "fintech/installation" },
      { title: "Configuration", slug: "fintech/configuration" },
      { title: "Currencies", slug: "fintech/currencies" },
      { title: "Exchange Rates", slug: "fintech/exchange-rates" },
      { title: "Wallets", slug: "fintech/wallets" },
      { title: "Transactions", slug: "fintech/transactions" },
      { title: "Beneficiaries", slug: "fintech/beneficiaries" },
      { title: "Payment Webhooks", slug: "fintech/payment-webhooks" },
      { title: "Providers", slug: "fintech/providers" },
    ],
  },
  {
    title: "Flutter",
    package: "flutter",
    items: [
      { title: "Overview", slug: "flutter/overview" },
      { title: "Installation", slug: "flutter/installation" },
      { title: "Quick Start", slug: "flutter/quick-start" },
      { title: "Architecture", slug: "flutter/architecture" },
      {
        title: "colveor_ui",
        items: [
          { title: "Overview", slug: "flutter/ui/overview" },
          { title: "ColveorApp", slug: "flutter/ui/app" },
          { title: "Configuration", slug: "flutter/ui/configuration" },
          { title: "Routing", slug: "flutter/ui/routing" },
          { title: "Theming", slug: "flutter/ui/theming" },
          { title: "Base Screens", slug: "flutter/ui/base-screens" },
          { title: "Widgets", slug: "flutter/ui/widgets" },
          { title: "Storage", slug: "flutter/ui/storage" },
          { title: "Utilities", slug: "flutter/ui/utilities" },
        ],
      },
      {
        title: "colveor",
        items: [
          { title: "Overview", slug: "flutter/colveor/overview" },
          { title: "Bootstrap", slug: "flutter/colveor/bootstrap" },
          { title: "Configuration", slug: "flutter/colveor/configuration" },
          { title: "Networking", slug: "flutter/colveor/networking" },
          { title: "DPoP", slug: "flutter/colveor/dpop" },
          { title: "Authentication", slug: "flutter/colveor/authentication" },
          { title: "Notifications", slug: "flutter/colveor/notifications" },
          { title: "Backend Integration", slug: "flutter/colveor/backend-integration" },
        ],
      },
    ],
  },
  {
    title: "DevKit",
    package: "devkit",
    items: [
      { title: "Overview", slug: "devkit/overview" },
      { title: "TypeScript", slug: "devkit/typescript" },
      { title: "ESLint", slug: "devkit/eslint" },
      { title: "Prettier", slug: "devkit/prettier" },
      { title: "Testing", slug: "devkit/testing" },
      { title: "Release", slug: "devkit/release" },
      { title: "CI/CD", slug: "devkit/ci-cd" },
      { title: "Documentation Tooling", slug: "devkit/documentation" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Core API", slug: "api/core" },
      { title: "Fintech API", slug: "api/fintech" },
      { title: "Flutter API", slug: "api/flutter" },
      { title: "Authentication", slug: "api/authentication" },
      { title: "Error Handling", slug: "api/errors" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Changelog", slug: "resources/changelog" },
      { title: "Contributing", slug: "resources/contributing" },
    ],
  },
]

// Flattened list of all doc links, in reading order — used for
// prev/next navigation and building the search index.
export type FlatDoc = { title: string; slug: string; group: string }

export function flattenNav(nav: NavGroup[] = DOCS_NAV): FlatDoc[] {
  const out: FlatDoc[] = []
  const walk = (items: NavItem[], group: string) => {
    for (const item of items) {
      if (item.slug) out.push({ title: item.title, slug: item.slug, group })
      if (item.items) walk(item.items, group)
    }
  }
  for (const g of nav) walk(g.items, g.title)
  return out
}

export const ALL_DOCS = flattenNav()

export function getDocNeighbors(slug: string) {
  const idx = ALL_DOCS.findIndex((d) => d.slug === slug)
  return {
    prev: idx > 0 ? ALL_DOCS[idx - 1] : null,
    next: idx >= 0 && idx < ALL_DOCS.length - 1 ? ALL_DOCS[idx + 1] : null,
  }
}
