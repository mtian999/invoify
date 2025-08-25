import { NextRequest, NextResponse } from "next/server";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Types
import { InvoiceType } from "@/types";

/**
 * Generate a PDF document of an invoice based on the provided data.
 * 本地开发环境配置为直接使用 GitHub Actions 生成 PDF
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
  const body: InvoiceType = await req.json();

  try {
    // 直接使用 GitHub Actions 生成 PDF，不再尝试本地 Chromium
    console.log("Using GitHub Actions for PDF generation...");
    
    const ReactDOMServer = (await import("react-dom/server")).default;
    const templateId = body.details.pdfTemplate;
    const InvoiceTemplate = await getInvoiceTemplate(templateId);
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));

    // 返回 GitHub Actions 触发信息，让客户端处理
    return new NextResponse(
      JSON.stringify({
        error: "PDF generation redirected to GitHub Actions",
        suggestion: "Use GitHub Actions for reliable PDF generation",
        htmlContent: await htmlTemplate,
        useGithubActions: true,
        message: "本地开发环境已配置为使用GitHub Actions生成PDF",
        instructions: [
          "系统将自动触发GitHub Actions工作流",
          "请等待工作流完成后从Artifacts下载PDF",
          "这确保了与生产环境一致的PDF生成体验"
        ]
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("PDF Generation Error:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return new NextResponse(
      JSON.stringify({
        error: "Failed to generate PDF",
        details: errorMessage,
        suggestion: "Use GitHub Actions for reliable PDF generation",
        githubAction: "Trigger .github/workflows/generate-pdf.yml workflow",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
