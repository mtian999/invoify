import type { Metadata } from "next";
// Components
import { InvoiceMain } from "@/app/components";
// SEO
import { ROOTKEYWORDS } from "@/lib/seo";
// Variables
import { BASE_URL, LOCALES } from "@/lib/variables";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  let messages: any | undefined;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch {}

  const seo = messages?.invoice?.seo ?? {};
  const title: string | undefined = seo.title ?? "Invoify — Invoice Generator";
  const description: string | undefined =
    seo.description ??
    "Generate professional invoices online. Free, fast, and export to PDF/JSON/XLSX/CSV/XML.";
  const kw: string[] = Array.isArray(seo.keywords) ? seo.keywords : [];
  const keywords = Array.from(new Set([...(ROOTKEYWORDS ?? []), ...kw]));

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l.code] = `/${l.code}/invoice`;
  }
  languages["x-default"] = "/invoice";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${locale}/invoice`,
      languages,
    },
    openGraph: {
      url: `${BASE_URL}/${locale}/invoice`,
      locale,
      title,
      description,
      type: "website",
      siteName: "Invoify",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function InvoicePage() {
    return (
        <main className="py-10 lg:container">
            <InvoiceMain />
        </main>
    );
}
