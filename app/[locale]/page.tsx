import type { Metadata } from "next";
// Components
import { LandingPage } from "@/app/components";
import { ROOTKEYWORDS } from "@/lib/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Read SEO content from i18n messages to support long-tail keywords per locale
  let messages: any;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch (e) {
    // Fallback to default values if locale messages are missing
    return {
      title: "Invoify — Free Online Invoice Generator | Create Professional Invoices Fast",
      description:
        "Create professional invoices for free with Invoify. No signup required. Live preview, multiple templates, export to PDF/JSON/XLSX/CSV/XML, and 14 language support — perfect for freelancers and small businesses.",
      keywords: ROOTKEYWORDS,
    };
  }

  const seo = messages?.landing?.seo ?? {};
  const title: string | undefined = seo.title;
  const description: string | undefined = seo.description;
  const kw: string[] = Array.isArray(seo.keywords) ? seo.keywords : [];
  const keywords = Array.from(new Set([...(ROOTKEYWORDS ?? []), ...kw]));

  return {
    title,
    description,
    keywords,
  };
}

export default function Home() {
  return (
    <main>
      <LandingPage />
    </main>
  );
}
