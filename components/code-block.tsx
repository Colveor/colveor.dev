"use client"

import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { Fragment, useMemo, useState } from "react"

type Lang = "ts" | "tsx" | "bash" | "json" | "text"

const KEYWORDS = new Set([
  "import", "export", "from", "const", "let", "var", "function", "return",
  "class", "interface", "type", "extends", "implements", "new", "async",
  "await", "if", "else", "for", "while", "of", "in", "public", "private",
  "protected", "readonly", "void", "this", "enum", "as", "default", "super",
  "static", "get", "set", "yield", "throw", "try", "catch", "finally", "switch",
  "case", "break", "continue", "typeof", "instanceof", "null", "undefined",
  "true", "false", "boolean", "string", "number", "any", "unknown", "never",
])

type Token = { type: string; value: string }

function tokenize(code: string, lang: Lang): Token[] {
  if (lang === "bash" || lang === "text") return tokenizeBash(code)
  if (lang === "json") return tokenizeJson(code)
  return tokenizeTs(code)
}

function tokenizeTs(code: string): Token[] {
  const tokens: Token[] = []
  const re =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(\s*\()?|([{}()[\].,;:<>=+\-*/&|!?@]+)|(\s+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(code))) {
    if (m[1]) tokens.push({ type: "comment", value: m[1] })
    else if (m[2]) tokens.push({ type: "string", value: m[2] })
    else if (m[3]) tokens.push({ type: "number", value: m[3] })
    else if (m[4]) {
      if (KEYWORDS.has(m[4])) tokens.push({ type: "keyword", value: m[4] })
      else if (m[5]) tokens.push({ type: "func", value: m[4] })
      else if (/^[A-Z]/.test(m[4])) tokens.push({ type: "property", value: m[4] })
      else tokens.push({ type: "plain", value: m[4] })
      if (m[5]) tokens.push({ type: "punct", value: m[5] })
    } else if (m[6]) tokens.push({ type: "punct", value: m[6] })
    else if (m[7]) tokens.push({ type: "plain", value: m[7] })
  }
  return tokens
}

function tokenizeBash(code: string): Token[] {
  const tokens: Token[] = []
  const re = /(#[^\n]*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(\s+)|(\S+)/g
  let m: RegExpExecArray | null
  let first = true
  let lineStart = true
  while ((m = re.exec(code))) {
    if (m[1]) tokens.push({ type: "comment", value: m[1] })
    else if (m[2]) tokens.push({ type: "string", value: m[2] })
    else if (m[3]) {
      tokens.push({ type: "plain", value: m[3] })
      if (m[3].includes("\n")) lineStart = true
    } else if (m[4]) {
      if (lineStart && (first || /^(npm|pnpm|yarn|bun|npx|git|cd|node|docker)$/.test(m[4]))) {
        tokens.push({ type: "func", value: m[4] })
      } else if (m[4].startsWith("-")) {
        tokens.push({ type: "property", value: m[4] })
      } else if (m[4].startsWith("@")) {
        tokens.push({ type: "keyword", value: m[4] })
      } else {
        tokens.push({ type: "plain", value: m[4] })
      }
      first = false
      lineStart = false
    }
  }
  return tokens
}

function tokenizeJson(code: string): Token[] {
  const tokens: Token[] = []
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|(\b\d+(?:\.\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],:])|(\s+)|(\S)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(code))) {
    if (m[1]) {
      tokens.push({ type: m[2] ? "property" : "string", value: m[1] })
      if (m[2]) tokens.push({ type: "punct", value: m[2] })
    } else if (m[3]) tokens.push({ type: "number", value: m[3] })
    else if (m[4]) tokens.push({ type: "keyword", value: m[4] })
    else if (m[5]) tokens.push({ type: "punct", value: m[5] })
    else if (m[6]) tokens.push({ type: "plain", value: m[6] })
    else if (m[7]) tokens.push({ type: "plain", value: m[7] })
  }
  return tokens
}

const COLOR: Record<string, string> = {
  comment: "var(--tok-comment)",
  string: "var(--tok-string)",
  number: "var(--tok-number)",
  keyword: "var(--tok-keyword)",
  func: "var(--tok-func)",
  property: "var(--tok-property)",
  punct: "var(--tok-punct)",
  plain: "var(--code-fg)",
}

const LANG_LABEL: Record<Lang, string> = {
  ts: "TypeScript",
  tsx: "TypeScript",
  bash: "Bash",
  json: "JSON",
  text: "Text",
}

export function CodeBlock({
  code,
  lang = "ts",
  filename,
  className,
}: {
  code: string
  lang?: Lang
  filename?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const trimmed = code.replace(/^\n+|\n+$/g, "")
  const tokens = useMemo(() => tokenize(trimmed, lang), [trimmed, lang])

  const copy = async () => {
    await navigator.clipboard.writeText(trimmed)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className={cn(
        "group my-5 overflow-hidden rounded-lg border border-border",
        className,
      )}
      style={{ background: "var(--code-bg)" }}
    >
      <div className="flex items-center justify-between border-b border-border/70 px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          {filename ? (
            <span className="text-foreground/80">{filename}</span>
          ) : (
            <span>{LANG_LABEL[lang]}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {filename && (
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              {LANG_LABEL[lang]}
            </span>
          )}
          <button
            type="button"
            onClick={copy}
            aria-label="Copy code"
            className="inline-flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
      <pre className="thin-scrollbar overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono" style={{ color: "var(--code-fg)" }}>
          {tokens.map((t, i) => (
            <Fragment key={i}>
              <span style={{ color: COLOR[t.type] ?? "var(--code-fg)" }}>{t.value}</span>
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}
