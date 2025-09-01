"use client";

// ShadCn
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Components
import {
  PdfViewer,
  BaseButton,
  NewInvoiceAlert,
  InvoiceLoaderModal,
  InvoiceExportModal,
} from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { FileInput, FolderUp, Import, Plus, Printer } from "lucide-react";

// RHF
import { useFormContext } from "react-hook-form";

// Next
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Types
import { InvoiceType } from "@/types";

const InvoiceActions = () => {
  const { invoicePdfLoading } = useInvoiceContext();

  const { getValues } = useFormContext<InvoiceType>();
  const router = useRouter();
  const params = useParams();
  const locale = (params as { locale?: string })?.locale ?? "en";

  const { _t } = useTranslationContext();
  return (
    <div className={`xl:w-[45%]`}>
      <Card className="h-auto sticky top-0 px-2">
        <CardHeader>
          <CardTitle>{_t("actions.title")}</CardTitle>
          <CardDescription>{_t("actions.description")}</CardDescription>
        </CardHeader>

        <div className="flex flex-col flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-3">
            {/* Load modal button */}
            <InvoiceLoaderModal>
              <BaseButton
                variant="outline"
                tooltipLabel="Open load invoice menu"
                disabled={invoicePdfLoading}
              >
                <FolderUp />
                {_t("actions.loadInvoice")}
              </BaseButton>
            </InvoiceLoaderModal>

            {/* Export modal button */}
            <InvoiceExportModal>
              <BaseButton
                variant="outline"
                tooltipLabel="Open load invoice menu"
                disabled={invoicePdfLoading}
              >
                <Import />
                {_t("actions.exportInvoice")}
              </BaseButton>
            </InvoiceExportModal>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* New invoice button */}
            <NewInvoiceAlert>
              <BaseButton
                variant="outline"
                tooltipLabel="Get a new invoice form"
                disabled={invoicePdfLoading}
              >
                <Plus />
                {_t("actions.newInvoice")}
              </BaseButton>
            </NewInvoiceAlert>

            {/* Generate pdf button */}
            <BaseButton
              type="submit"
              tooltipLabel="Generate your invoice"
              loading={invoicePdfLoading}
              loadingText="Generating your invoice"
            >
              <FileInput />
              {_t("actions.generatePdf")}
            </BaseButton>

            {/* Print preview button */}
            <BaseButton
              variant="outline"
              tooltipLabel="Open print preview"
              disabled={invoicePdfLoading}
              asChild
            >
              <Link
                href={`/${locale}/print`}
                onClick={() => {
                  try {
                    const values = getValues?.();
                    if (values) {
                      sessionStorage.setItem(
                        "invoicePrintData",
                        JSON.stringify(values)
                      );
                    }
                  } catch {}
                }}
              >
                <Printer />
                {"Print Preview"}
              </Link>
            </BaseButton>
          </div>

          <div className="w-full">
            {/* Live preview and Final pdf */}
            <PdfViewer />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceActions;
