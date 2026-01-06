import { MiddlewareHandlerContext } from "$fresh/server.ts";

function setIfMissing(headers: Headers, key: string, value: string) {
  if (!headers.has(key)) headers.set(key, value);
}

export async function handler(_req: Request, ctx: MiddlewareHandlerContext) {
  const res = await ctx.next();

  const headers = new Headers(res.headers);

  // Basic hardening (non-breaking defaults). If you embed external resources,
  // adjust these policies accordingly.
  setIfMissing(headers, "X-Content-Type-Options", "nosniff");
  setIfMissing(headers, "X-Frame-Options", "DENY");
  setIfMissing(headers, "Referrer-Policy", "strict-origin-when-cross-origin");
  setIfMissing(
    headers,
    "Permissions-Policy",
    "geolocation=(), camera=(), microphone=()",
  );

  // If the site is served over HTTPS (recommended), this improves security.
  // Keep max-age conservative; increase once you're sure everything is HTTPS.
  setIfMissing(
    headers,
    "Strict-Transport-Security",
    "max-age=15552000; includeSubDomains",
  );

  // A minimal CSP that should work for most Fresh sites.
  // If you add external analytics/fonts/scripts, you may need to loosen it.
  setIfMissing(
    headers,
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' https:; connect-src 'self' https:; font-src 'self' data: https:; frame-ancestors 'none'",
  );

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}
