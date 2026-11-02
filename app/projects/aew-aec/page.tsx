import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "AEW-AEC Conference Platform",
  description:
    "Case study: a multilingual, full-stack event management platform for UNESCO Africa Engineering Week, built with Next.js, NestJS, Firebase and PesaPal payments. 1000+ registrations.",
  alternates: { canonical: "/projects/aew-aec" },
  openGraph: {
    title: "AEW-AEC Conference Platform — Masambu",
    description:
      "A multilingual, full-stack event management platform for UNESCO Africa Engineering Week.",
    url: "/projects/aew-aec",
    type: "article",
    images: [
      {
        url: "/images/aewaec-conference-2025.png",
        alt: "Screenshot of the AEW-AEC Conference Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/aewaec-conference-2025.png"],
  },
};

const stats = [
  { value: "1000+", label: "Registrations" },
  { value: "90%", label: "Faster admin loads" },
  { value: "3", label: "Languages" },
  { value: "5", label: "Payment methods" },
];

const features = [
  ["Multilingual", "English, French and Arabic, including RTL layout."],
  ["Payments", "PesaPal gateway with multiple methods and real-time verification."],
  ["Registration", "Multi-step flow with duplicate prevention and email validation."],
  ["Admin dashboard", "Registration management, analytics and bulk operations."],
  ["Performance", "Lazy loading and pagination for a 90% load-time improvement."],
  ["Email automation", "Ticket generation, reminders and edit links."],
];

const stack = {
  Frontend: ["Next.js 14", "TypeScript", "Tailwind CSS", "next-intl", "React Hook Form"],
  Backend: ["NestJS", "Firebase", "PesaPal API", "Nodemailer", "Vercel"],
};

const challenges = [
  {
    title: "Duplicate email prevention",
    problem:
      "Block duplicate registrations while letting people finish incomplete ones.",
    solution:
      "Backend validation, real-time email verification and completion-status detection.",
  },
  {
    title: "Payment callback handling",
    problem:
      "Reliable verification and registration completion across payment methods.",
    solution:
      "A callback system with fallbacks, proper error handling and automated ticket generation.",
  },
  {
    title: "Performance at scale",
    problem:
      "The admin dashboard slowed down with thousands of registrations and tokens.",
    solution:
      "Pagination, lazy loading and batch operations, for a 90% improvement.",
  },
];

const snippets = [
  {
    title: "Multilingual middleware",
    code: `// middleware.ts
export function middleware(request: NextRequest) {
  // Handle internationalization
  const response = intlMiddleware(request);

  // Add cache control headers
  response.headers.set(
    'Cache-Control',
    'public, max-age=3600, s-maxage=86400'
  );

  return response;
}`,
  },
  {
    title: "Duplicate email check",
    code: `// registration.service.ts
async checkDuplicateEmail(email: string) {
  const existing = await this.firestore
    .collection('registrations')
    .where('email', '==', email)
    .get();

  const completed = existing.docs.some(doc => {
    const data = doc.data();
    return data.paymentStatus === 'completed' ||
           data.registrationDate ||
           data.ticketSent;
  });

  if (completed) {
    throw new BadRequestException(
      'Email already registered'
    );
  }
}`,
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-sm font-normal uppercase tracking-[0.18em] text-muted">
      {children}
    </h2>
  );
}

export default function AewAecPage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="rise py-16 sm:py-24">
        <Link href="/#work" className="text-sm text-muted hover:text-foreground">
          ← Back to work
        </Link>
        <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          AEW-AEC Conference Platform<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          A full-stack event management system for the 11th UNESCO Africa
          Engineering Week and 9th African Engineering Conference 2025, covering
          multilingual content, registration workflows and payments.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {["Next.js 14", "TypeScript", "NestJS", "Firebase", "PesaPal"].map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
              {t}
            </span>
          ))}
        </div>
        <a
          href="https://aewaec-git-main-masambuofficials-projects.vercel.app/en"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          View live site ↗
        </a>
      </header>

      <div className="relative aspect-video overflow-hidden rounded-lg border border-line">
        <Image
          src="/images/aewaec-conference-2025.png"
          alt="Screenshot of the AEW-AEC Conference Platform"
          fill
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover object-top"
        />
      </div>

      <dl className="grid grid-cols-2 gap-8 py-16 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="text-4xl font-semibold tracking-tight">{s.value}</dd>
            <dt className="mt-1 text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>

      <section className="border-t border-line py-16">
        <Label>Key features</Label>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([t, d]) => (
            <div key={t}>
              <h3 className="font-medium">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16">
        <Label>Stack</Label>
        <div className="grid gap-10 sm:grid-cols-2">
          {Object.entries(stack).map(([group, items]) => (
            <div key={group}>
              <h3 className="mb-3 font-medium">{group}</h3>
              <ul className="space-y-2 text-sm text-muted">
                {items.map((i) => (
                  <li key={i} className="border-b border-line pb-2">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16">
        <Label>Challenges &amp; solutions</Label>
        <div className="space-y-10">
          {challenges.map((c) => (
            <div key={c.title} className="grid gap-4 md:grid-cols-[1fr_2fr]">
              <h3 className="font-medium">{c.title}</h3>
              <div className="space-y-2 text-sm leading-relaxed">
                <p className="text-muted">{c.problem}</p>
                <p>
                  <span className="text-accent">Solution — </span>
                  {c.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16">
        <Label>Technical highlights</Label>
        <div className="grid gap-8 lg:grid-cols-2">
          {snippets.map((s) => (
            <div key={s.title} className="min-w-0">
              <h3 className="mb-3 font-medium">{s.title}</h3>
              <pre className="overflow-x-auto rounded-lg border border-line bg-line/30 p-4 font-mono text-[13px] leading-relaxed">
                <code>{s.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Need something similar?
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Full-stack development, payment integration, internationalization and
          performance work. Let&apos;s talk about your project.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Get in touch
        </a>
      </section>
    </div>
  );
}
