/** Cloudflare Worker entry point for Frontier World. */
import {
  handleImageOptimization,
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: {
          format: string;
          quality: number;
        }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const productionHosts = new Set(["frontierworld.ai", "www.frontierworld.ai"]);

function addResponseHeaders(request: Request, response: Response): Response {
  const url = new URL(request.url);
  const headers = new Headers(response.headers);
  const isProductionHttps =
    url.protocol === "https:" && productionHosts.has(url.hostname);
  const contentSecurityPolicy = [
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    ...(isProductionHttps ? ["upgrade-insecure-requests"] : []),
  ].join("; ");

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Content-Security-Policy", contentSecurityPolicy);

  if (isProductionHttps) {
    headers.set("Strict-Transport-Security", "max-age=31536000");
  }

  const contentType = headers.get("Content-Type") ?? "";
  if (
    request.method === "GET" &&
    response.ok &&
    contentType.includes("text/html") &&
    (url.pathname === "/" || url.pathname === "/privacy")
  ) {
    headers.set(
      "Cache-Control",
      "public, max-age=0, s-maxage=300, stale-while-revalidate=86400"
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (productionHosts.has(url.hostname) && url.protocol === "http:") {
      url.protocol = "https:";
      url.hostname = "frontierworld.ai";
      return Response.redirect(url, 308);
    }

    if (url.hostname === "www.frontierworld.ai") {
      url.hostname = "frontierworld.ai";
      return Response.redirect(url, 308);
    }

    if (url.pathname === "/_vinext/image") {
      if (!env.IMAGES) {
        return addResponseHeaders(
          request,
          new Response("Image optimization is not configured.", { status: 503 })
        );
      }

      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(
        request,
        {
          fetchAsset: (path) =>
            env.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES!.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths
      );
      return addResponseHeaders(request, response);
    }

    const response = await handler.fetch(request, env, ctx);
    return addResponseHeaders(request, response);
  },
};

export default worker;
