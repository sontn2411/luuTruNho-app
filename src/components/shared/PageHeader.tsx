import React from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 ${className}`}>
      {/* Khối tiêu đề bên trái */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xs shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Khối chức năng/nút bấm bên phải */}
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
}

export default PageHeader;
