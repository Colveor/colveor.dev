"use client"

import { DOCS_NAV, type NavGroup, type NavItem, type PackageId } from "@/lib/colveor-config"
import { cn } from "@/lib/utils"
import { PackageSelector } from "@/components/docs/package-selector"
import { VersionSelector } from "@/components/docs/version-selector"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

function slugContains(pathname: string, items: NavItem[]): boolean {
  return items.some(
    (i) =>
      (i.slug && pathname === `/docs/${i.slug}`) ||
      (i.items && slugContains(pathname, i.items)),
  )
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const href = `/docs/${item.slug}`
  const active = pathname === href
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-accent font-medium text-accent-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {item.title}
    </Link>
  )
}

function CollapsibleItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(() => slugContains(pathname, item.items ?? []))

  useEffect(() => {
    if (slugContains(pathname, item.items ?? [])) setOpen(true)
  }, [pathname, item.items])

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm text-foreground transition-colors hover:text-foreground"
      >
        <span>{item.title}</span>
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform",
            open && "rotate-90",
          )}
        />
      </button>
      {open && (
        <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-border pl-2">
          {item.items?.map((child) =>
            child.items ? (
              <CollapsibleItem key={child.title} item={child} pathname={pathname} />
            ) : (
              <NavLink key={child.slug} item={child} pathname={pathname} />
            ),
          )}
        </div>
      )}
    </div>
  )
}

function Group({ group, pathname }: { group: NavGroup; pathname: string }) {
  return (
    <div>
      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
        {group.title}
      </p>
      <div className="flex flex-col gap-0.5">
        {group.items.map((item) =>
          item.items ? (
            <CollapsibleItem key={item.title} item={item} pathname={pathname} />
          ) : (
            <NavLink key={item.slug} item={item} pathname={pathname} />
          ),
        )}
      </div>
    </div>
  )
}

function activePackage(pathname: string): PackageId | undefined {
  if (pathname.startsWith("/docs/core")) return "core"
  if (pathname.startsWith("/docs/fintech")) return "fintech"
  if (pathname.startsWith("/docs/flutter")) return "flutter"
  if (pathname.startsWith("/docs/devkit")) return "devkit"
  return undefined
}

export function DocsSidebarContent() {
  const pathname = usePathname()
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-2 border-b border-border p-3">
        <VersionSelector />
        <PackageSelector active={activePackage(pathname)} />
      </div>
      <nav className="thin-scrollbar flex-1 space-y-6 overflow-y-auto p-3">
        {DOCS_NAV.map((group) => (
          <Group key={group.title} group={group} pathname={pathname} />
        ))}
      </nav>
    </div>
  )
}
