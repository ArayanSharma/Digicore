import { useEffect, useState } from "react";
import { loadPageContent, getApiBase } from "../utils/pageApi";

// on 404/error this resolves to null — caller is expected to fall back to hardcoded defaults
export function usePageContent(pageId) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadPageContent(pageId)
      .then((data) => {
        if (!cancelled) setContent(data || null);
      })
      .catch(() => {
        if (!cancelled) setContent(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pageId]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.debug("usePageContent", pageId, { content, loading });
  }, [pageId, content, loading]);

  return { content, loading };
}

export function resolveImage(url) {
  if (!url || typeof url !== "string") return url;
  if (/^https?:\/\//.test(url) || url.startsWith("data:")) return url;
  const API = getApiBase();
  if (url.startsWith("/")) return `${API}${url}`;
  if (url.startsWith("uploads/")) return `${API}/${url}`;
  return url;
}
