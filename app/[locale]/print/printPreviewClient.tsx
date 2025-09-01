"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// UI
import {
  BaseButton,
  DynamicInvoiceTemplate,
  Subheading,
} from "@/app/components";

// Types
import { InvoiceType } from "@/types";
// i18n
import { useTranslation } from "@/contexts/TranslationContext";

const STORAGE_KEY = "invoicePrintData";

export default function PrintPreviewClient() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { _t } = useTranslation();

  const [data, setData] = useState<InvoiceType | null>(null);

  useEffect(() => {
    // 1) Try sessionStorage (from Edit page quick handoff)
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw));
        return;
      }
    } catch {}

    // 2) Try query by invoiceNumber from localStorage.savedInvoices
    try {
      const targetNumber = searchParams.get("invoiceNumber");
      const saved = localStorage.getItem("savedInvoices");
      if (saved) {
        const list = JSON.parse(saved) as InvoiceType[];
        if (Array.isArray(list) && list.length > 0) {
          if (targetNumber) {
            const found = list.find(
              (it) => it?.details?.invoiceNumber === targetNumber
            );
            if (found) {
              setData(found);
              return;
            }
          }
          // fallback: use latest
          setData(list[list.length - 1]);
          return;
        }
      }
    } catch {}
  }, [searchParams]);

  const locale = useMemo(() => {
    const p = params as { locale?: string };
    return p?.locale || "en";
  }, [params]);

  const handlePrint = () => {
    try {
      window.print();
    } catch {}
  };

  return (
    <main className="lg:container py-6">
      <div className="flex items-center justify-between gap-3 no-print mb-4">
        <div className="flex items-center gap-2">
          <BaseButton
            variant="ghost"
            onClick={() => router.push(`/${locale}/invoice`)}
          >
            ←{_t("form.wizard.back")}
          </BaseButton>
          <Subheading>{_t("print.title")}</Subheading>
        </div>
        <div className="flex gap-2">
          <BaseButton variant="outline" onClick={handlePrint}>
            {_t("print.saveAsPdf")}
          </BaseButton>
          <BaseButton onClick={handlePrint}>{_t("print.print")}</BaseButton>
        </div>
      </div>

      {!data ? (
        <div className="no-print">
          <p className="mb-4 text-sm opacity-80">{_t("print.empty.message")}</p>
          <BaseButton
            variant="outline"
            onClick={() => router.push(`/${locale}/invoice`)}
          >
            {_t("print.empty.backToEditor")}
          </BaseButton>
        </div>
      ) : (
        <div className="border dark:border-gray-600 rounded-xl bg-white dark:bg-slate-900">
          <DynamicInvoiceTemplate {...data} />
        </div>
      )}
    </main>
  );
}
