import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, highlight, actions }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
    >
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
          {highlight ? (
            <>
              <span className="gradient-text">{highlight}</span> {title}
            </>
          ) : (
            <span className="gradient-text">{title}</span>
          )}
        </h1>
        {subtitle && (
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-2xl">{subtitle}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </motion.div>
  );
}

export default PageHeader;
