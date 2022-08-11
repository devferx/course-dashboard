import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="grid grid-cols-[345px_1fr]">
      <aside></aside>
      <section className="min-h-screen px-12 py-10 bg-[#F9F9F9]">
        {children}
      </section>
    </main>
  );
};
