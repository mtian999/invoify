import { NextRequest, NextResponse } from "next/server";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { ENV, TAILWIND_CDN } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
  const body: InvoiceType = await req.json();
  let browser;
  let page;
  try {
    const ReactDOMServer = (await import("react-dom/server")).default;
    const templateId = body.details.pdfTemplate;
    const InvoiceTemplate = await getInvoiceTemplate(templateId);
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      InvoiceTemplate(body)
    );

    const data = {
      html: htmlTemplate,
    };
    const apiKey = process.env.PDF_GENERATOR_API_KEY;
    const url = process.env.PDF_GENERATOR_URL;
    if (!apiKey || !url) {
      throw new Error("PDF Generator API key or URL not found");
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new NextResponse(
        JSON.stringify({
          error: "PDF生成服务响应错误",
          status: response.status,
          statusText: response.statusText,
          details: errorText,
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const result = await response.blob();

    return new NextResponse(result, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=invoice.pdf",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      status: 200,
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate PDF", details: error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
  }
}
