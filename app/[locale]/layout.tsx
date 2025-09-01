import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Fonts
import {
  alexBrush,
  dancingScript,
  greatVibes,
  outfit,
  parisienne,
} from "@/lib/fonts";

// Favicon
import Favicon from "@/public/assets/favicon/favicon.ico";

// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

// Next Intl
import { NextIntlClientProvider } from "next-intl";

// ShadCn
import { Toaster } from "@/components/ui/toaster";

// Contexts
import Providers from "@/contexts/Providers";

// SEO
import { JSONLD, ROOTKEYWORDS } from "@/lib/seo";

// Variables
import { BASE_URL, GOOGLE_SC_VERIFICATION, LOCALES } from "@/lib/variables";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Build per-locale canonical and hreflang maps
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l.code] = `/${l.code}/`;
  }
  // x-default points to root without locale
  languages["x-default"] = "/";

  return {
    title: "Invoify | Free Invoice Generator",
    description:
      "Create invoices effortlessly with Invoify, the free invoice generator. Try it now!",
    icons: [{ rel: "icon", url: Favicon.src }],
    keywords: ROOTKEYWORDS,
    viewport: "width=device-width, initial-scale=1",
    robots: {
      index: true,
      follow: true,
    },

    authors: {
      name: "Master Mao",
      // url: "https://aliabb.vercel.app",
    },
    verification: {
      google: GOOGLE_SC_VERIFICATION,
    },
    metadataBase: new URL(BASE_URL),
    openGraph: {
      siteName: "Invoify",
      type: "website",
      url: `${BASE_URL}/${locale}/`,
      locale,
      title: "Invoify | Free Invoice Generator",
      description:
        "Create invoices effortlessly with Invoify, the free invoice generator. Try it now!",
    },
    twitter: {
      card: "summary_large_image",
      title: "Invoify | Free Invoice Generator",
      description:
        "Create invoices effortlessly with Invoify, the free invoice generator. Try it now!",
    },
    alternates: {
      canonical: `/${locale}/`,
      languages,
    },
  };
}

export function generateStaticParams() {
  const locales = LOCALES.map((locale) => locale.code);
  return locales;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          id="json-ld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </head>
      <body
        className={`${outfit.className} ${dancingScript.variable} ${parisienne.variable} ${greatVibes.variable} ${alexBrush.variable} antialiased bg-slate-100 dark:bg-slate-800`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className="flex flex-col">{children}</div>

            {/* Toast component */}
            <Toaster />

            {/* Vercel analytics */}
            <Analytics />
          </Providers>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <GoogleAnalytics />
          </>
        )}
      </body>
    </html>
  );
}
