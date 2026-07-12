import { DocsLayout } from "@/components/docs/docs-layout"
import { getDoc } from "@/lib/docs-content"
import { ALL_DOCS } from "@/lib/colveor-config"
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
  const doc = getDoc(path)
  if (!doc) notFound()

  const { meta, toc, Body } = doc
  return (
    <DocsLayout toc={toc} slug={path}>
      <Body />
    </DocsLayout>
  )
}
