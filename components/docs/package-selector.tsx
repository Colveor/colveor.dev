"use client"

import { PACKAGES, type PackageId } from "@/lib/colveor-config"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function PackageSelector({ active }: { active?: PackageId }) {
  const router = useRouter()
  return (
    <div className="grid grid-cols-3 gap-1 rounded-lg border border-border bg-muted/40 p-1">
      {PACKAGES.map((pkg) => {
        const isActive = pkg.id === active
        return (
          <button
            key={pkg.id}
            type="button"
            onClick={() => router.push(`/docs/${pkg.id}/overview`)}
            title={pkg.npm}
            className={cn(
              "rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {pkg.name}
          </button>
        )
      })}
    </div>
  )
}
