// based of https://github.com/adityasinghcodes/nextjs-monitoring/blob/main/instrumentation.ts
// Node.js-specific imports are moved into dynamic imports within runtime checks
// Prevent Edge runtime from trying to import Node.js-specific modules
declare global {
  var logger: any | undefined;
  var metrics:
    | {
        registry: any;
      }
    | undefined;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Import these only in Node.js runtime since they aren't compatible with Edge runtime
    const { Registry, collectDefaultMetrics } = await import("prom-client");
    const pino = (await import("pino")).default;
    const pinoLoki = (await import("pino-loki")).default;
    const { registerOTel } = await import("@vercel/otel");

    //loki
    globalThis.logger = pino(
      pinoLoki({
        host: "http://localhost:3100",
        batching: true,
        interval: 5,
        labels: { app: "next-app" },
      })
    );

    //prometheus
    const prometheusRegistry = new Registry();
    collectDefaultMetrics({
      register: prometheusRegistry,
    });
    globalThis.metrics = {
      registry: prometheusRegistry,
    };

    //otel
    registerOTel();
  }
}
