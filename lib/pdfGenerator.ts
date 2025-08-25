import { InvoiceType } from "@/types";

/**
 * 触发GitHub Actions工作流生成PDF
 */
export async function triggerPdfGeneration(invoiceData: InvoiceType): Promise<{
  success: boolean;
  workflowUrl?: string;
  error?: string;
}> {
  try {
    const response = await fetch("/api/trigger-pdf-workflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to trigger PDF generation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * 本地PDF生成（现在直接触发GitHub Actions）
 */
export async function generatePdfLocally(
  invoiceData: InvoiceType
): Promise<Blob | null> {
  try {
    const response = await fetch("/api/invoice/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    if (response.status === 503) {
      const errorData = await response.json();

      // 检查是否是GitHub Actions重定向
      if (errorData.useGithubActions) {
        console.log("PDF generation redirected to GitHub Actions:", errorData.message);
        // 返回null，让智能生成器触发GitHub Actions
        return null;
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error("PDF generation failed:", errorData);
      throw new Error(errorData.error || "PDF generation failed");
    }

    return await response.blob();
  } catch (error) {
    console.error("Local PDF generation failed:", error);
    return null;
  }
}

/**
 * 智能PDF生成 - 自动选择最佳方案
 */
export async function generatePdf(invoiceData: InvoiceType): Promise<{
  success: boolean;
  blob?: Blob;
  workflowUrl?: string;
  method: "local" | "github-actions";
  error?: string;
}> {
  // 首先尝试本地生成
  const localBlob = await generatePdfLocally(invoiceData);

  if (localBlob) {
    return {
      success: true,
      blob: localBlob,
      method: "local",
    };
  }

  // 本地生成失败，尝试GitHub Actions
  console.log("本地PDF生成失败，尝试使用GitHub Actions...");

  const workflowResult = await triggerPdfGeneration(invoiceData);

  if (workflowResult.success) {
    return {
      success: true,
      workflowUrl: workflowResult.workflowUrl,
      method: "github-actions",
    };
  }

  return {
    success: false,
    method: "local",
    error: "本地和GitHub Actions PDF生成都失败了",
  };
}
