import { NextRequest, NextResponse } from "next/server";
import { InvoiceType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { invoiceData }: { invoiceData: InvoiceType } = await request.json();

    // GitHub API配置
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER || "your-username";
    const repoName = process.env.GITHUB_REPO_NAME || "invoify";

    if (!githubToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GitHub token not configured. Please set GITHUB_TOKEN environment variable.",
        },
        { status: 500 }
      );
    }

    // 触发GitHub Actions工作流
    const workflowResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "generate-pdf",
          client_payload: {
            invoice_data: JSON.stringify(invoiceData),
            timestamp: new Date().toISOString(),
          },
        }),
      }
    );

    if (!workflowResponse.ok) {
      const errorText = await workflowResponse.text();
      console.error("GitHub API error:", errorText);

      return NextResponse.json(
        {
          success: false,
          error: `Failed to trigger GitHub workflow: ${workflowResponse.status} ${errorText}`,
        },
        { status: 500 }
      );
    }

    const workflowUrl = `https://github.com/${repoOwner}/${repoName}/actions`;

    return NextResponse.json({
      success: true,
      message: "PDF generation workflow triggered successfully",
      workflowUrl,
      instructions: [
        "1. 访问GitHub Actions页面查看工作流状态",
        "2. 工作流完成后，从Artifacts中下载生成的PDF",
        "3. PDF文件将保留7天",
      ],
    });
  } catch (error) {
    console.error("Error triggering PDF workflow:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
