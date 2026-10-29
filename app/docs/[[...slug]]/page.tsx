import { DocsLayout } from "@/components/docs/docs-layout"
import { MarkdownDoc } from "@/components/docs/markdown-doc"
import { getDoc } from "@/lib/docs-content"
import { ALL_DOCS } from "@/lib/colveor-config"
import { getRemoteDoc } from "@/lib/remote-docs"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return [
    { slug: [] },
    ...ALL_DOCS.map((d) => ({ slug: d.slug.split("/") })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const path = slug?.join("/") || "introduction"
  const remote = await getRemoteDoc(path)
  if (remote) return { title: remote.title, description: remote.description }
  const doc = getDoc(path)
  if (!doc) return { title: "Not found" }
  return {
    title: doc.meta.title,
    description: doc.meta.description,
  }
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const path = slug?.join("/") || "introduction"

  // Package-owned markdown docs take precedence over site-authored pages.
  const remote = await getRemoteDoc(path)
  if (remote) {
    return (
      <DocsLayout toc={remote.toc} slug={path}>
        <MarkdownDoc doc={remote} />
      </DocsLayout>
    )
  }

  const doc = getDoc(path)
  if (!doc) notFound()

  const { toc, Body } = doc
  return (
    <DocsLayout toc={toc} slug={path}>
      <Body />
    </DocsLayout>
  )
}
