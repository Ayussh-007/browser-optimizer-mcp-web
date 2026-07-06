"use client";

import { ChevronRight } from "lucide-react";

interface DocsBreadcrumbsProps {
  path: string[];
}

export default function DocsBreadcrumbs({ path }: DocsBreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] mb-6">
      <span>Documentation</span>
      {path.map((segment, i) => (
        <div key={i} className="flex items-center gap-2">
          <ChevronRight size={14} />
          <span className={i === path.length - 1 ? "text-white" : ""}>
            {segment}
          </span>
        </div>
      ))}
    </div>
  );
}
