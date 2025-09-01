import React from "react";
import type { Metadata } from "next";
import PrintPreviewClient from "./printPreviewClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Print Preview",
};

export default function PrintPreviewPage() {
  return <PrintPreviewClient />;
}
