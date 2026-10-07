const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

export class ApiError extends Error {
  status: number;
  response: any;

  constructor(message: string, status: number, response: any) {
    super(message);
    this.status = status;
    this.response = response;
  }
}

async function fetchClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T }> {
  const url = new URL(endpoint, BASE_URL);

  const headers = new Headers(options.headers);
  headers.set("X-Requested-With", "XMLHttpRequest");
  headers.set("Accept", "application/json");
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const xsrfToken = getCookie("XSRF-TOKEN");
  if (xsrfToken) {
    headers.set("X-XSRF-TOKEN", xsrfToken);
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      // Not JSON
    }
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status,
      { data: responseData }
    );
  }

  if (response.status === 204) {
    return { data: {} as T };
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Empty or non-JSON response
  }
  return { data: data as T };
}

export const apiClient = {
  get: <T>(url: string, config?: { params?: Record<string, any> }) => {
    let finalUrl = url;
    if (config?.params) {
      const searchParams = new URLSearchParams();
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        finalUrl += `?${queryString}`;
      }
    }
    return fetchClient<T>(finalUrl, { method: "GET" });
  },
  post: <T>(url: string, data?: any) => {
    return fetchClient<T>(url, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  put: <T>(url: string, data?: any) => {
    return fetchClient<T>(url, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  delete: <T>(url: string) => {
    return fetchClient<T>(url, { method: "DELETE" });
  },
};

export const initializeCsrf = async (): Promise<void> => {
  try {
    await apiClient.get("/sanctum/csrf-cookie");
    console.log("CSRF cookie initialized successfully");
  } catch (error) {
    console.error("Error initializing CSRF cookie:", error);
    throw error;
  }
};
