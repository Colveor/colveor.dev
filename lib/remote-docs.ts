// Docs that live as markdown in each package's own repo and are pulled in at
// build time. A slug under a source's prefix maps 1:1 to a file in its `dir`
// (flutter/ui/theming → doc/theming.md); the sidebar entry still lives in
// DOCS_NAV.

import type { TocItem } from "@/components/docs/docs-toc"
import GithubSlugger from "github-slugger"
import matter from "gray-matter"
import { readFile } from "node:fs/promises"
import path from "node:path"

type DocSource = {
  /** Key used by COLVEOR_DOCS_LOCAL. */
  id: string
  repo: string
  /** Git ref the docs are read from — pin to the release tag they describe. */
  ref: string
  dir: string
  slugPrefix: string
  eyebrow: string
}

export const DOC_SOURCES: DocSource[] = [
  {
    id: "colveor_ui",
    repo: "Colveor/colveor_ui",
    ref: "main",
    dir: "doc",
    slugPrefix: "flutter/ui",
    eyebrow: "Flutter · colveor_ui",
  },
  {
    id: "colveor_flutter",
    repo: "Colveor/colveor_flutter",
    ref: "main",
    dir: "doc",
    slugPrefix: "flutter/colveor",
    eyebrow: "Flutter · colveor",
  },
]

export type RemoteDoc = {
  title: string
  description?: string
  eyebrow: string
  toc: TocItem[]
  markdown: string
}

function findSource(slug: string) {
  return DOC_SOURCES.find((s) => slug.startsWith(`${s.slugPrefix}/`))
}

// COLVEOR_DOCS_LOCAL="colveor_ui=../../flutter/colveor_ui,colveor_flutter=..."
// reads a source from a local checkout instead of GitHub, for previewing edits.
function localRoot(source: DocSource): string | undefined {
  const entries = (process.env.COLVEOR_DOCS_LOCAL ?? "").split(",")
  for (const entry of entries) {
    const [id, dir] = entry.split("=").map((s) => s?.trim())
    if (id === source.id && dir) return path.resolve(process.cwd(), dir)
  }
  return undefined
}

async function readSource(source: DocSource, name: string): Promise<string> {
  const file = `${source.dir}/${name}.md`
  const root = localRoot(source)
  if (root) return readFile(path.join(root, file), "utf8")

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error(
      `GITHUB_TOKEN is required to fetch ${source.repo}/${file}. ` +
        "Set it, or set COLVEOR_DOCS_LOCAL to read from a local checkout.",
    )
  }
  const url = `https://api.github.com/repos/${source.repo}/contents/${file}?ref=${source.ref}`
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.raw",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "force-cache",
  })
  if (!res.ok) {
    throw new Error(`Fetching ${source.repo}/${file}@${source.ref} failed: ${res.status}`)
  }
  return res.text()
}

// Plain heading text, matching what rehype-slug sees after rendering.
function headingText(md: string) {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
    .replace(/\\(.)/g, "$1")
    .trim()
}

// Slug every heading in order (as rehype-slug does) and keep h2/h3 for the TOC.
function buildToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger()
  const toc: TocItem[] = []
  let inFence = false
  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    if (inFence) continue
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue
    const level = match[1].length
    const title = headingText(match[2])
    const id = slugger.slug(title)
    if (level === 2 || level === 3) toc.push({ id, title, level })
  }
  return toc
}

/** The doc for [slug], or null when no source covers it. Throws if a covered file can't be read. */
export async function getRemoteDoc(slug: string): Promise<RemoteDoc | null> {
  const source = findSource(slug)
  if (!source) return null
  const { data, content } = matter(await readSource(source, slug.slice(source.slugPrefix.length + 1)))
  return {
    title: String(data.title ?? slug),
    description: data.description ? String(data.description) : undefined,
    eyebrow: source.eyebrow,
    toc: buildToc(content),
    markdown: content,
  }
}
