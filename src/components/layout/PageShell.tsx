import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

type PageShellProps = {
  children: React.ReactNode;
  homeSectionLinks?: boolean;
};

export default function PageShell({ children, homeSectionLinks = false }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-amber-500 selection:text-black antialiased">
      <SiteHeader homeSectionLinks={homeSectionLinks} />
      {children}
      <SiteFooter />
    </div>
  );
}
