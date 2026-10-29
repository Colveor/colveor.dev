import { Callout } from "@/components/callout"
import { CodeBlock } from "@/components/code-block"
import {
  DefinitionList,
  DocHeader,
  FeatureList,
  H2,
} from "@/components/docs/doc-elements"
import type { DocDef } from "@/lib/docs-content"

const EYEBROW = "Flutter"

// Cross-package Flutter pages. Package pages (flutter/ui/*, flutter/colveor/*)
// are markdown in each package repo — see lib/remote-docs.ts.
export const FLUTTER_DOCS: Record<string, DocDef> = {
  "flutter/overview": {
    title: "Flutter Overview",
    description:
      "Two Flutter packages: colveor_ui for the UI layer and colveor for the full application foundation.",
    toc: [
      { id: "packages", title: "The packages", level: 2 },
      { id: "which", title: "Which one to use", level: 2 },
      { id: "stack", title: "Built on", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow={EYEBROW}
          title="Overview"
          description="Colveor's Flutter foundation is split into two packages on pub.dev, so apps can take just the UI layer or the whole stack."
        />
        <H2 id="packages">The packages</H2>
        <FeatureList
          items={[
            {
              title: "colveor_ui",
              body: "Themed widgets, light/dark theming, go_router routing, base screen classes, icons, storage and utilities. No backend assumptions.",
            },
            {
              title: "colveor",
              body: "Everything in colveor_ui plus bootstrap, a Dio API client with DPoP, authentication flows and push notifications for a Colveor Core backend.",
            },
          ]}
        />
        <H2 id="which">Which one to use</H2>
        <DefinitionList
          items={[
            { term: "colveor_ui", description: "You want the design system, widgets and routing, and bring your own backend or networking." },
            { term: "colveor", description: "Your app talks to a Colveor Core backend. It includes colveor_ui, so add only this one." },
          ]}
        />
        <H2 id="stack">Built on</H2>
        <p>
          Both packages use Riverpod for state, go_router for navigation and
          flutter_screenutil_plus for responsive sizing. colveor adds Dio, Firebase
          Messaging and jose (for DPoP).
        </p>
      </>
    ),
  },

  "flutter/installation": {
    title: "Flutter Installation",
    description: "Add colveor or colveor_ui to your Flutter app.",
    toc: [
      { id: "requirements", title: "Requirements", level: 2 },
      { id: "colveor", title: "Full foundation", level: 2 },
      { id: "colveor-ui", title: "UI only", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow={EYEBROW}
          title="Installation"
          description="Install one package — colveor already includes colveor_ui."
        />
        <H2 id="requirements">Requirements</H2>
        <p>Dart SDK <code>^3.12.2</code> and a matching Flutter release.</p>
        <H2 id="colveor">Full foundation</H2>
        <CodeBlock lang="bash" code={`flutter pub add colveor`} />
        <Callout variant="warning" title="Import from one package">
          With colveor installed, import only <code>package:colveor/...</code>.
          It re-exports colveor_ui, and importing both causes name clashes.
        </Callout>
        <H2 id="colveor-ui">UI only</H2>
        <CodeBlock lang="bash" code={`flutter pub add colveor_ui`} />
        <CodeBlock
          lang="text"
          filename="pubspec.yaml"
          code={`dependencies:
  flutter:
    sdk: flutter
  colveor_ui: ^0.1.0   # or colveor: ^0.1.0`}
        />
      </>
    ),
  },

  "flutter/quick-start": {
    title: "Flutter Quick Start",
    description: "From an empty Flutter project to a running Colveor app.",
    toc: [
      { id: "config", title: "1. Create a config", level: 2 },
      { id: "routes", title: "2. Define routes", level: 2 },
      { id: "theme", title: "3. Define a theme", level: 2 },
      { id: "main", title: "4. Wire up main.dart", level: 2 },
      { id: "next", title: "Next steps", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow={EYEBROW}
          title="Quick Start"
          description="This walkthrough uses the full colveor package. With colveor_ui only, import from package:colveor_ui and drop the API settings from the config."
        />
        <H2 id="config">1. Create a config</H2>
        <CodeBlock
          lang="dart"
          filename="lib/config/app_config.dart"
          code={`import 'package:colveor/config.dart';

class AppConfig extends VoConfig {
  @override
  String get appName => 'My App';

  @override
  String get apiBaseUrl => 'https://api.myapp.com';

  @override
  String get apiVersion => 'api/v1';

  @override
  VoRoutingConfig get routing =>
      const VoRoutingConfig(initialLocation: '/');
}`}
        />
        <H2 id="routes">2. Define routes</H2>
        <CodeBlock
          lang="dart"
          filename="lib/routes.dart"
          code={`import 'package:colveor/colveor.dart';

List<RouteBase> appRoutes(VoConfig config) => [
  GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
];`}
        />
        <H2 id="theme">3. Define a theme</H2>
        <p>
          Extend <code>VoColors</code>, <code>VoSizes</code> and{" "}
          <code>VoTypography</code>, then combine them in a <code>VoTheme</code>.
          See <a href="/docs/flutter/ui/theming">Theming</a>.
        </p>
        <H2 id="main">4. Wire up main.dart</H2>
        <CodeBlock
          lang="dart"
          filename="lib/main.dart"
          code={`import 'package:flutter/material.dart';
import 'package:colveor/colveor.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await VoBootstrap.initialize(config: AppConfig());

  runApp(
    ColveorApp(
      config: AppConfig(),
      appRoutes: appRoutes,
      builder: (context, colveor) => MaterialApp.router(
        theme: const AppTheme().light,
        darkTheme: const AppTheme().dark,
        themeMode: colveor.themeMode,
        routerConfig: colveor.router,
      ),
    ),
  );
}`}
        />
        <H2 id="next">Next steps</H2>
        <FeatureList
          items={[
            { title: "Widgets", body: "Buttons, inputs, overlays, toasts and page flows from colveor_ui." },
            { title: "Authentication", body: "Add phone or email sign-in with VoAuthScreen." },
            { title: "Notifications", body: "Enable push with Firebase Cloud Messaging." },
            { title: "Configuration", body: "Timeouts, tenant headers, DPoP and interceptors." },
          ]}
        />
      </>
    ),
  },

  "flutter/architecture": {
    title: "Flutter Architecture",
    description: "How colveor_ui, colveor and your app layer together.",
    toc: [
      { id: "layers", title: "Layers", level: 2 },
      { id: "responsibilities", title: "Responsibilities", level: 2 },
      { id: "state", title: "State", level: 2 },
    ],
    Body: () => (
      <>
        <DocHeader
          eyebrow={EYEBROW}
          title="Architecture"
          description="Each layer builds on the one beneath it and re-exports it, so an app imports from a single package."
        />
        <H2 id="layers">Layers</H2>
        <p className="font-mono text-sm">
          Your app → colveor → colveor_ui → Flutter
        </p>
        <p>
          With a backend, colveor talks to a Colveor Core API over HTTPS through
          its networking layer.
        </p>
        <H2 id="responsibilities">Responsibilities</H2>
        <DefinitionList
          items={[
            { term: "colveor_ui", description: "ColveorApp, config, routing, theming, base screens, widgets, icons, storage and utilities." },
            { term: "colveor", description: "Bootstrap, the extended config, networking, DPoP, authentication and notifications." },
            { term: "Your app", description: "Config, routes, theme, screens and product logic." },
          ]}
        />
        <H2 id="state">State</H2>
        <p>
          <code>ColveorApp</code> creates the Riverpod <code>ProviderScope</code>{" "}
          and overrides the config provider with your config. Package state such
          as the theme mode, router, auth state and notifications all live in
          Riverpod providers, so app code can read and override them like any other
          provider.
        </p>
      </>
    ),
  },
}
