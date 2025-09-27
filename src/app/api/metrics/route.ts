import { NextResponse } from "next/server";

// Use Node.js runtime since we need access to globalThis.metrics
export const runtime = "nodejs";

export async function GET() {
  try {
    // Check if metrics have been initialized
    if (!globalThis?.metrics?.registry) {
      return new NextResponse("Metrics not initialized", {
        status: 503,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const metrics = await globalThis.metrics.registry.metrics();
    return new NextResponse(metrics, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error collecting metrics:", error);
    return new NextResponse("Error collecting metrics", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
