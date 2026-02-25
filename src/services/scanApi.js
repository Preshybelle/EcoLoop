/**
 * Scan API – frontend client for the material scan (AI/YOLO) backend.
 *
 * Backend contract:
 * - POST {baseUrl}/api/scan
 * - Request body (JSON): { "image": "<data URL string>" }  (e.g. data:image/jpeg;base64,...)
 * - Response (JSON): {
 *     "materialType": string,
 *     "subtype": string,
 *     "confidence": number,   // 0–100
 *     "recycled": boolean
 *   }
 */

const getScanApiBaseUrl = () => {
  return typeof import.meta !== "undefined" && import.meta.env?.VITE_SCAN_API_URL
    ? import.meta.env.VITE_SCAN_API_URL.replace(/\/$/, "")
    : "";
};

/**
 * Call the backend to scan a material image.
 * Tries /api/v1/scan first (same prefix as auth/listings), then /api/scan.
 * @param {string} imageDataUrl - Data URL of the image (e.g. from sessionStorage or FileReader)
 * @returns {Promise<{ materialType: string, subtype: string, confidence: number, recycled: boolean }>}
 * @throws {Error} on network or server error
 */
export async function scanMaterialImage(imageDataUrl) {
  const base = getScanApiBaseUrl();
  if (!base) {
    throw new Error("Scan API URL not configured. Set VITE_SCAN_API_URL in your .env file (see .env.example).");
  }

  const pathsToTry = ["/api/v1/scan", "/api/scan"];
  let lastError = null;

  for (const path of pathsToTry) {
    try {
      const url = `${base}${path}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl }),
      });

      if (!res.ok) {
        const text = await res.text();
        lastError = new Error(res.status === 422 || res.status === 400 ? text || "Invalid image" : text || `Scan failed (${res.status})`);
        continue;
      }

      const data = await res.json();
      return {
        materialType: data.materialType ?? "Unknown",
        subtype: data.subtype ?? "—",
        confidence: typeof data.confidence === "number" ? data.confidence : 0,
        recycled: Boolean(data.recycled),
      };
    } catch (err) {
      lastError = err;
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        lastError = new Error("Network error: cannot reach scan API. Check CORS, backend is running, and VITE_SCAN_API_URL is correct.");
      }
    }
  }

  throw lastError || new Error("Scan failed");
}
