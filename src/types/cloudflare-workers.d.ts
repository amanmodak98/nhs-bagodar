// Cloudflare Workers ambient type declarations
// Used by Pages Functions in functions/api/

declare global {
  interface R2Object {
    readonly body: ReadableStream;
    readonly httpEtag: string;
    readonly httpMetadata?: { contentType?: string; contentLanguage?: string; contentDisposition?: string; contentEncoding?: string; cacheControl?: string };
    readonly key: string;
    readonly size: number;
    readonly uploaded: Date;
  }
  interface R2Bucket {
    get(key: string): Promise<R2Object | null>;
    put(key: string, value: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob, options?: { httpMetadata?: { contentType?: string } }): Promise<R2Object>;
    delete(key: string): Promise<void>;
    list(options?: { prefix?: string; limit?: number }): Promise<{ objects: R2Object[] }>;
  }
  interface D1PreparedStatement {
    bind(...values: any[]): D1PreparedStatement;
    first<T = unknown>(): Promise<T | null>;
    all<T = unknown>(): Promise<{ results: T[] }>;
    run(): Promise<{ success: boolean; meta: { last_row_id?: number; changes?: number } }>;
  }
  interface D1Database {
    prepare(query: string): D1PreparedStatement;
  }
  interface PagesFunction<E = unknown> {
    (context: { request: Request; env: E; params: Record<string, string | string[]>; data?: any; waitUntil?: (p: Promise<any>) => void; passThroughOnException?: () => void; next?: (input?: Request | string) => Promise<Response> }): Promise<Response> | Response;
  }
}

export {};