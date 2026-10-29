import { Callout } from "@/components/callout"
import { CodeBlock } from "@/components/code-block"
import { DocHeader } from "@/components/docs/doc-elements"
import type { RemoteDoc } from "@/lib/remote-docs"
import type { Element, ElementContent } from "hast"
import type { Blockquote, Root, RootContent } from "mdast"
import Link from "next/link"
import Markdown, { type Components } from "react-markdown"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const ALERTS = {
  NOTE: "note",
  TIP: "tip",
  IMPORTANT: "note",
  WARNING: "warning",
  CAUTION: "danger",
} as const

type CalloutVariant = (typeof ALERTS)[keyof typeof ALERTS]

// Turns GitHub alerts (`> [!WARNING]`) into <aside> nodes rendered as Callout.
// A bold line straight after the marker becomes the callout title.
function remarkAlerts() {
  return (tree: Root) => {
    const walk = (node: Root | RootContent) => {
      if (node.type === "blockquote") toAlert(node)
      if ("children" in node) node.children.forEach(walk)
    }
    walk(tree)
  }
}

function toAlert(node: Blockquote) {
  const first = node.children[0]
  if (first?.type !== "paragraph") return
  const lead = first.children[0]
  if (lead?.type !== "text") return
  const match = /^\[!(\w+)\]\s*/.exec(lead.value)
  const variant = match && ALERTS[match[1].toUpperCase() as keyof typeof ALERTS]
  if (!variant) return

  lead.value = lead.value.slice(match[0].length)
  const rest = first.children.filter((c) => !(c.type === "text" && !c.value.trim()))
  let title: string | undefined
  if (rest.length === 1 && rest[0].type === "strong") {
    title = rest[0].children.map((c) => ("value" in c ? c.value : "")).join("")
    node.children.shift()
  } else if (rest.length === 0) {
    node.children.shift()
  }

  node.data = {
    hName: "aside",
    hProperties: { dataVariant: variant, ...(title ? { dataTitle: title } : {}) },
  }
}

function textOf(node: ElementContent): string {
  if (node.type === "text") return node.value
  return "children" in node ? node.children.map(textOf).join("") : ""
}

type Lang = "ts" | "tsx" | "dart" | "bash" | "json" | "text"
const LANGS: Lang[] = ["ts", "tsx", "dart", "bash", "json", "text"]

function codeBlock(pre: Element | undefined) {
  const code = pre?.children[0]
  if (code?.type !== "element" || code.tagName !== "code") return null
  const className = (code.properties.className as string[] | undefined)?.[0] ?? ""
  const lang = className.replace("language-", "")
  const meta = (code.data as { meta?: string } | undefined)?.meta
  return (
    <CodeBlock
      lang={LANGS.includes(lang as Lang) ? (lang as Lang) : "text"}
      filename={meta?.match(/title="([^"]+)"/)?.[1]}
      code={textOf(code).replace(/\n$/, "")}
    />
  )
}

const components: Components = {
  pre: ({ node, children }) => codeBlock(node) ?? <pre>{children}</pre>,
  aside: ({ node, children }) => (
    <Callout
      variant={(node?.properties.dataVariant as CalloutVariant | undefined) ?? "note"}
      title={node?.properties.dataTitle as string | undefined}
    >
      {children}
    </Callout>
  ),
  a: ({ href = "", children }) =>
    href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>,
}

export function MarkdownDoc({ doc }: { doc: RemoteDoc }) {
  return (
    <>
      <DocHeader eyebrow={doc.eyebrow} title={doc.title} description={doc.description} />
      <Markdown
        remarkPlugins={[remarkGfm, remarkAlerts]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {doc.markdown}
      </Markdown>
    </>
  )
}
