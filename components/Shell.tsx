"use client";

import { useInvitation } from "@/components/InvitationProvider";

// Page frame: card width variable, background paper, and hides content until the envelope is opened.
export default function Shell({ children }: { children: React.ReactNode }) {
  const { revealed } = useInvitation();
  return (
    <div style={{ display: revealed ? undefined : "none" }}>
      <div className="min-h-screen w-full bg-white">
        <main className="min-h-screen w-full">
        <style dangerouslySetInnerHTML={{ __html: ".st-card{--st-w:min(100vw,480px);}@media (min-width:768px){.st-card{--st-w:min(100vw,900px);}}" }} />
        <div className="flex w-full justify-center overflow-x-clip bg-white overflow-clip scrollbar-none" data-testid="riviera-blue-template">
          <div data-showcase-root="" className="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden md:border md:border-[#00588522] st-card isolate overflow-hidden" style={{ backgroundColor: "rgb(253, 251, 245)", color: "rgb(0, 0, 0)" }}>
            <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover" loading="eager" decoding="async" src="/images/themes/riviera-blue/paper-background-v2.webp" />
            {children}
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}
