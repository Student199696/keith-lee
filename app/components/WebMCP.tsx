"use client";

import { useEffect } from "react";

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void>;
    };
  }
}

export function WebMCP() {
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(context.registerTool({
        name: "start_partnership_inquiry",
        title: "Start partnership inquiry",
        description: "Open the official Keith Lee partnership inquiry and optionally preselect an engagement type.",
        inputSchema: {
          type: "object",
          properties: {
            engagementType: {
              type: "string",
              enum: ["restaurant", "brand", "multi-location", "destination", "speaking", "ambassador", "other"],
            },
          },
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          const parsed = input && typeof input === "object" ? input as { engagementType?: string } : {};
          const query = parsed.engagementType ? `?type=${encodeURIComponent(parsed.engagementType)}` : "";
          window.location.assign(`/partner${query}`);
          return { status: "opened", path: `/partner${query}` };
        },
      }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch {
      // WebMCP is progressive enhancement; the visible inquiry remains primary.
    }
    return () => lifecycle.abort();
  }, []);
  return null;
}
