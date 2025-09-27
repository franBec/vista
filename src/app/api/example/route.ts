// Use Node.js runtime since we need access to globalThis.logger
export const runtime = "nodejs";

export async function GET() {
  try {
    // Import crypto module for Node.js environment
    const { randomUUID } = await import("crypto");

    // throw new Error("Something went terribly wrong.")
    globalThis?.logger?.info({
      meta: {
        requestId: randomUUID(),
        extra: "This is some extra information that you can add to the meta.",
        anything: "anything",
      },
      message: "Message of the log.",
    });
    return Response.json({
      message: "It works.",
    });
  } catch (error) {
    globalThis?.logger?.error({
      err: error,
      message: "Something went wrong.",
    });
  }
}
