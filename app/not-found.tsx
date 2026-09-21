import Link from "next/link";

import { Container } from "@/components/primitives/container";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh items-center">
      <Container width="prose">
        <p className="font-mono text-xs tracking-[0.14em] text-text-3 uppercase">
          404
        </p>
        <h1 className="mt-4 text-2xl">This page doesn&rsquo;t exist</h1>
        <p className="mt-4 text-text-2">
          It may have moved, or the link may be wrong.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="text-accent">
            Home
          </Link>
          <Link href="/work/aura" className="text-accent">
            Aura case study
          </Link>
          <Link href="/work/job-switch-agent" className="text-accent">
            Job Switch Agent case study
          </Link>
        </div>
      </Container>
    </main>
  );
}
