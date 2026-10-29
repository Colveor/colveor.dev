import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { Callout } from "@/components/callout"
import { CodeBlock } from "@/components/code-block"
import {
  DefinitionList,
  DocHeader,
  FeatureList,
  H2,
  H3,
} from "@/components/docs/doc-elements"
import { RbacDiagram } from "@/components/rbac-diagram"
import { FLUTTER_DOCS } from "@/lib/docs/flutter"
import { ALL_DOCS } from "@/lib/colveor-config"
import type { TocItem } from "@/components/docs/docs-toc"
import type { ReactNode } from "react"

export type Doc = {
  meta: { title: string; description?: string }
  toc: TocItem[]
  Body: () => ReactNode
}

export type DocDef = {
  title: string
  description?: string
  toc?: TocItem[]
  Body: () => ReactNode
}

const DOCS: Record<string, DocDef> = {
  introduction: {
    title: "Introduction",
    description:
      "Colveor is an opinionated TypeScript and NestJS ecosystem for building production-ready backend applications and reusable domain infrastructure.",
    toc: [
      { id: "what-is-colveor", title: "What is Colveor?", level: 2 },
      { id: "philosophy", title: "Philosophy", level: 2 },
      { id: "the-packages", title: "The packages", level: 2 },
      { id: "who-its-for", title: "Who it's for", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Getting Started"
          title="Introduction"
          description="Colveor is an opinionated TypeScript and NestJS ecosystem for building production-ready backend applications and reusable domain infrastructure."
        />
        <H2 id="what-is-colveor">What is Colveor?</H2>
        <p>
          Colveor helps developers avoid rebuilding common backend foundations
          for every application. Instead of reimplementing authentication, access
          control, settings and domain primitives project after project, you
          build on a shared, opinionated foundation and focus your effort on the
          product itself.
        </p>
        <Callout variant="note" title="An evolving ecosystem">
          Colveor is an actively evolving open-source ecosystem, not a finished
          enterprise platform. Documentation here provides a credible foundation
          that will be expanded with detailed reference material as packages and
          modules stabilize.
        </Callout>
        <H2 id="philosophy">Philosophy</H2>
        <p>The ecosystem is guided by a few deliberate principles:</p>
        <ul>
          <li>
            <strong>Build the foundation once.</strong> Shared concerns are
            solved in reusable packages rather than duplicated per application.
          </li>
          <li>
            <strong>Be opinionated.</strong> Clear structural decisions mean
            teams share conventions and module boundaries from day one.
          </li>
          <li>
            <strong>Stay modular.</strong> Adopt only the packages you need and
            extend them with your own domain logic.
          </li>
          <li>
            <strong>Default to production.</strong> Configuration, health checks
            and admin capabilities are treated as first-class concerns.
          </li>
        </ul>
        <H2 id="the-packages">The packages</H2>
        <p>Colveor is currently organized into three packages:</p>
        <DefinitionList
          items={[
            {
              term: "@colveor/core",
              description:
                "Foundational backend infrastructure — identity, authentication, RBAC, settings, notifications, files, admin and health.",
            },
            {
              term: "@colveor/fintech",
              description:
                "A financial domain package built on top of Core, adding wallets, transactions, currencies, exchange rates and provider infrastructure.",
            },
            {
              term: "@colveor/devkit",
              description:
                "Shared developer tooling and standards — TypeScript, ESLint, Prettier, testing, release, CI/CD and documentation tooling.",
            },
          ]}
        />
        <H2 id="who-its-for">Who it&apos;s for</H2>
        <p>
          Colveor is aimed at teams building serious TypeScript and NestJS
          backends who want a consistent, reusable foundation — particularly
          those working across multiple applications or building financial
          products that share identity and access-control infrastructure.
        </p>
      </>
    ),
  },

  installation: {
    title: "Installation",
    description: "Add Colveor packages to your TypeScript and NestJS project.",
    toc: [
      { id: "requirements", title: "Requirements", level: 2 },
      { id: "install-core", title: "Install Core", level: 2 },
      { id: "add-fintech", title: "Add Fintech", level: 2 },
      { id: "devkit", title: "DevKit", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Getting Started"
          title="Installation"
          description="Add Colveor packages to your TypeScript and NestJS project."
        />
        <H2 id="requirements">Requirements</H2>
        <p>
          Colveor targets modern TypeScript and NestJS applications. The examples
          below are package installation examples — refer to each package&apos;s
          documentation for its specific peer requirements as they are published.
        </p>
        <H2 id="install-core">Install Core</H2>
        <p>Start with the foundational package:</p>
        <CodeBlock lang="bash" code={`npm install @colveor/core`} />
        <H2 id="add-fintech">Add Fintech</H2>
        <p>
          If your product needs financial capabilities, install Fintech alongside
          Core. Fintech builds on Core&apos;s identity and access-control
          infrastructure.
        </p>
        <CodeBlock lang="bash" code={`npm install @colveor/core @colveor/fintech`} />
        <Callout variant="tip" title="Package installation examples">
          These commands are package installation examples. Exact version ranges
          and peer dependencies will be documented per release as the ecosystem
          reaches stable milestones.
        </Callout>
        <H2 id="devkit">DevKit</H2>
        <p>
          DevKit is typically added as a development dependency to share tooling
          and standards across your workspace.
        </p>
        <CodeBlock lang="bash" code={`npm install --save-dev @colveor/devkit`} />
      </>
    ),
  },

  "quick-start": {
    title: "Quick Start",
    description: "Wire Colveor into a NestJS application at a high level.",
    toc: [
      { id: "install", title: "1. Install", level: 2 },
      { id: "register", title: "2. Register modules", level: 2 },
      { id: "configure", title: "3. Configure", level: 2 },
      { id: "next-steps", title: "Next steps", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Getting Started"
          title="Quick Start"
          description="A high-level walkthrough of introducing Colveor into a NestJS application."
        />
        <Callout variant="warning" title="Conceptual example">
          The snippets below are conceptual and illustrate the intended shape of
          integration. Exact module names, options and APIs are documented as they
          stabilize — do not treat these as final signatures.
        </Callout>
        <H2 id="install">1. Install</H2>
        <CodeBlock lang="bash" code={`npm install @colveor/core`} />
        <H2 id="register">2. Register modules</H2>
        <p>Register Colveor modules in your application&apos;s root module.</p>
        <CodeBlock
          lang="ts"
          filename="app.module.ts"
          code={`import { Module } from '@nestjs/common'
import { ColveorCoreModule } from '@colveor/core'

@Module({
  imports: [
    ColveorCoreModule.forRoot({
      // Configuration is provided through the application's
      // environment and settings infrastructure.
    }),
  ],
})
export class AppModule {}`}
        />
        <H2 id="configure">3. Configure</H2>
        <p>
          Core reads configuration through the application&apos;s configuration
          and settings layers. See{" "}
          <a href="/docs/configuration">Configuration</a> for the conceptual
          model.
        </p>
        <CodeBlock
          lang="json"
          filename="colveor.config.json"
          code={`{
  "core": {
    "auth": { "methods": ["email-password", "phone-otp"] },
    "sessions": { "enabled": true }
  }
}`}
        />
        <H2 id="next-steps">Next steps</H2>
        <FeatureList
          items={[
            { title: "Architecture", body: "Understand how Core and Fintech layer together." },
            { title: "Authentication", body: "Explore configurable authentication methods." },
            { title: "RBAC", body: "Model access with modules, permissions and roles." },
            { title: "Fintech", body: "Add wallets and transactions on top of Core." },
          ]}
        />
      </>
    ),
  },

  architecture: {
    title: "Architecture",
    description: "How the Colveor packages layer together.",
    toc: [
      { id: "layers", title: "Layered design", level: 2 },
      { id: "diagram", title: "Diagram", level: 2 },
      { id: "core-foundation", title: "Core as the foundation", level: 2 },
      { id: "domain-packages", title: "Domain packages", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Getting Started"
          title="Architecture"
          description="How the Colveor packages layer together to form a coherent backend foundation."
        />
        <H2 id="layers">Layered design</H2>
        <p>
          Colveor is built as a set of layers. Core provides foundational
          application infrastructure. Domain packages such as Fintech build
          financial capabilities on top of Core, reusing its identity, users,
          authentication, settings and RBAC infrastructure. Your application sits
          on top, focusing on product-specific logic.
        </p>
        <H2 id="diagram">Diagram</H2>
        <ArchitectureDiagram />
        <H2 id="core-foundation">Core as the foundation</H2>
        <p>
          Core owns the concerns shared by every application: who a user is, how
          they authenticate, what they are allowed to do, and how the application
          is configured and observed. Everything else composes on top of these
          primitives.
        </p>
        <H2 id="domain-packages">Domain packages</H2>
        <p>
          Domain packages extend the foundation for a specific problem space.
          Fintech, for example, introduces wallets and transactions while relying
          on Core for identity and access control rather than reinventing them.
        </p>
        <Callout variant="note">
          DevKit is orthogonal to this runtime layering. It supports development
          standards and tooling across every package in the ecosystem.
        </Callout>
      </>
    ),
  },

  configuration: {
    title: "Configuration",
    description: "The conceptual configuration model for Colveor.",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "sources", title: "Configuration sources", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Getting Started"
          title="Configuration"
          description="The conceptual configuration model shared across Colveor packages."
        />
        <H2 id="overview">Overview</H2>
        <p>
          Colveor packages are configured through a combination of environment
          configuration and application settings. The precise configuration keys
          for each module are documented alongside that module as they are
          finalized.
        </p>
        <Callout variant="warning" title="Keys are conceptual">
          The example below illustrates structure only. Exact configuration
          properties are intentionally not invented here and will be documented
          per module.
        </Callout>
        <CodeBlock
          lang="json"
          filename="colveor.config.json"
          code={`{
  "core": {
    "auth": { "methods": ["email-password"] }
  },
  "fintech": {
    "currencies": { "base": "USD" }
  }
}`}
        />
        <H2 id="sources">Configuration sources</H2>
        <p>
          Configuration is resolved from environment variables and the
          application settings infrastructure provided by Core. See{" "}
          <a href="/docs/core/settings">Settings</a> for how runtime application
          settings are modelled.
        </p>
      </>
    ),
  },

  "core/authentication": {
    title: "Authentication",
    description: "Configurable authentication methods, tokens and sessions.",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "methods", title: "Authentication methods", level: 2 },
      { id: "tokens", title: "Tokens & sessions", level: 2 },
      { id: "accounts", title: "Account management", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Core"
          title="Authentication"
          description="Colveor Core provides configurable authentication for backend applications."
        />
        <H2 id="overview">Overview</H2>
        <p>
          Authentication in Core is designed to support configurable
          authentication methods, including phone/OTP and email/password flows.
          The goal is a single, consistent authentication layer that domain
          packages and your application can build on.
        </p>
        <H2 id="methods">Authentication methods</H2>
        <FeatureList
          items={[
            {
              title: "Email & password",
              body: "Classic credential-based authentication for applications that need it.",
            },
            {
              title: "Phone & OTP",
              body: "One-time-password flows for phone-based verification and sign-in.",
            },
          ]}
        />
        <Callout variant="warning" title="Configuration keys are conceptual">
          Colveor supports configurable authentication methods. Exact
          configuration keys are not specified here and will be documented as the
          authentication module stabilizes.
        </Callout>
        <H2 id="tokens">Tokens &amp; sessions</H2>
        <p>
          Authentication issues access tokens and refresh tokens, and integrates
          with session management so active sessions can be tracked and revoked.
          See <a href="/docs/core/sessions">Sessions</a> for details on the
          session model.
        </p>
        <H2 id="accounts">Account management</H2>
        <p>
          Authentication works together with account management for concerns such
          as credential updates and account lifecycle. See{" "}
          <a href="/docs/core/account-management">Account Management</a>.
        </p>
      </>
    ),
  },

  "core/rbac/overview": {
    title: "RBAC Overview",
    description: "Role-based access control in Colveor Core.",
    toc: [
      { id: "hierarchy", title: "The hierarchy", level: 2 },
      { id: "diagram", title: "Diagram", level: 2 },
      { id: "concepts", title: "Concepts", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Core · RBAC"
          title="RBAC Overview"
          description="Role-based access control organizes permissions into a clear, composable hierarchy."
        />
        <H2 id="hierarchy">The hierarchy</H2>
        <p>Colveor models access control as a hierarchy:</p>
        <p className="font-mono text-sm">
          Module → Permission → Role → User Role Assignment
        </p>
        <H2 id="diagram">Diagram</H2>
        <RbacDiagram />
        <H2 id="concepts">Concepts</H2>
        <DefinitionList
          items={[
            { term: "Module", description: "A feature boundary that groups related permissions." },
            { term: "Permission", description: "A granular, checkable action within a module." },
            { term: "Role", description: "A named collection of permissions." },
            {
              term: "User Role",
              description: "An assignment that grants a role's permissions to a specific user.",
            },
          ]}
        />
        <Callout variant="note">
          This structure lets you reason about access at whichever level makes
          sense — coarse-grained roles for administration, or fine-grained
          permissions for sensitive actions.
        </Callout>
      </>
    ),
  },

  "fintech/wallets": {
    title: "Wallets",
    description: "Wallet and balance infrastructure integrated with Core identity.",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "balances", title: "Balances", level: 2 },
      { id: "identity", title: "Identity integration", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Fintech"
          title="Wallets"
          description="The Fintech package provides wallet and balance infrastructure integrated with Colveor Core identity."
        />
        <H2 id="overview">Overview</H2>
        <p>
          Wallets provide a place to represent balances associated with users or
          other entities in your application. Wallet infrastructure integrates
          with Core identity so ownership and access are handled consistently.
        </p>
        <Callout variant="warning" title="Ledger details not assumed">
          This page intentionally avoids assumptions about ledger implementation
          details that have not been provided. Accounting semantics will be
          documented explicitly once specified.
        </Callout>
        <H2 id="balances">Balances</H2>
        <p>
          Wallet balances represent the current value held in a wallet. The
          precise balance model and supported currencies are covered under{" "}
          <a href="/docs/fintech/currencies">Currencies</a> and related pages as
          they are finalized.
        </p>
        <H2 id="identity">Identity integration</H2>
        <p>
          Because Fintech builds on Core, wallets are associated with identities
          managed by Core&apos;s users and authentication infrastructure rather
          than a separate identity system.
        </p>
      </>
    ),
  },

  "fintech/transactions": {
    title: "Transactions",
    description: "Financial transaction infrastructure in the Fintech package.",
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "scope", title: "Scope", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow="Fintech"
          title="Transactions"
          description="High-level infrastructure for representing financial transactions."
        />
        <H2 id="overview">Overview</H2>
        <p>
          Transactions provide infrastructure for recording and processing the
          movement of value within your application. They are designed to work
          alongside wallets, currencies and provider infrastructure.
        </p>
        <Callout variant="danger" title="No guarantees claimed here">
          This page does not claim specific accounting or ledger guarantees.
          Any correctness, consistency or settlement guarantees will be
          documented explicitly when they are defined.
        </Callout>
        <H2 id="scope">Scope</H2>
        <p>
          Detailed documentation covering transaction lifecycle, states and
          relationships to beneficiaries and providers will be added as the
          transaction infrastructure matures.
        </p>
      </>
    ),
  },

  ...FLUTTER_DOCS,
}

// Build a graceful placeholder for any slug that does not yet have
// dedicated content, so every navigation link resolves.
function placeholderDoc(slug: string): DocDef {
  const entry = ALL_DOCS.find((d) => d.slug === slug)
  const title = entry?.title ?? "Documentation"
  const group = entry?.group ?? ""
  return {
    title,
    description: `${title} documentation is being written.`,
    toc: [
      { id: "overview", title: "Overview", level: 2 },
      { id: "status", title: "Status", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader eyebrow={group} title={title} description={`${title} — reference documentation.`} />
        <H2 id="overview">Overview</H2>
        <p>
          This section documents <strong>{title}</strong> within the Colveor
          ecosystem. Detailed reference material — including services,
          configuration options and APIs — will be filled in here without
          requiring any changes to the site structure.
        </p>
        <Callout variant="note" title="Placeholder content">
          Colveor is an evolving ecosystem. This page is a structured placeholder
          designed to be replaced with detailed, accurate documentation as the
          module is finalized.
        </Callout>
        <H2 id="status">Status</H2>
        <p>
          The documentation system is data-driven and MDX-ready, so this page can
          grow with prose, code samples, diagrams and reference tables over time.
        </p>
      </>
    ),
  }
}

export function getDoc(slug: string): Doc | null {
  const known = ALL_DOCS.some((d) => d.slug === slug)
  const def = DOCS[slug] ?? (known ? placeholderDoc(slug) : null)
  if (!def) return null
  return {
    meta: { title: def.title, description: def.description },
    toc: def.toc ?? [],
    Body: def.Body,
  }
}
