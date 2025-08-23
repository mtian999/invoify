import { NextRequest } from "next/server";

// Services
import { generatePdfService } from "@/services/invoice/server/generatePdfService";

export const maxDuration = 60; // This function can run for a maximum of 60 seconds (update at 2024-05-09 form 10 seconds)
/**
 * 作用是强制将当前页面或 API 路由设置为动态渲染。这意味着每次请求该页面时，都会重新生成页面，而不是使用缓存的静态版本。
 * 具体来说，这个设置的作用包括：
 * 1.动态内容：如果你的页面依赖于实时数据或用户特定的数据，使用 force-dynamic 可以确保每次请求都获取最新的数据。
 * 2.避免静态生成：即使在使用静态生成（SSG）的情况下，设置为 force-dynamic 也会使该页面在每次请求时都进行服务器端渲染（SSR）。
 * 3.适用于特定场景：在某些情况下，例如需要频繁更新的内容，或者依赖于用户身份验证的内容，使用 force-dynamic 是非常有用的。
 */
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const result = await generatePdfService(req);
    return result;
}
