"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";
import { useLanguage } from "../../i18n/LanguageContext";

const Toaster = ({ ...props }: ToasterProps) => {
  const { dir } = useLanguage();
  return (
    <Sonner
      theme="light"
      dir={dir}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
