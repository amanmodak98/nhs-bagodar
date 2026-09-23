'use client';

import { useRef, useState } from 'react';

interface FileUploaderProps {
  folder?: string;
  onUploaded: (info: { url: string; key: string; size: number; contentType: string; filename: string }) => void;
  label?: string;
  accept?: string;
  className?: string;
}

export function FileUploader({ folder = 'uploads', onUploaded, label = 'Choose file', accept, className }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setProgress(`Reading ${file.name}…`);
    setUploading(true);

    try {
      // Read file as base64
      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let binary = '';
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, Math.min(i + chunk, bytes.length))));
      }
      const base64 = btoa(binary);

      setProgress('Uploading to R2…');
      const r = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || 'application/octet-stream',
          base64,
          folder,
        }),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data.error || `Upload failed (${r.status})`);
      }
      const data = await r.json();
      onUploaded({
        url: data.url,
        key: data.key,
        size: data.size,
        contentType: data.contentType,
        filename: file.name,
      });
      setProgress(`Uploaded ${file.name}`);
    } catch (e: any) {
      setError(e.message || String(e));
      setProgress(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={className}>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = '';
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 px-3 py-1.5 border border-rule text-[11px] font-semibold tracking-wide uppercase text-ink hover:bg-sand-50 disabled:opacity-50"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 4v12m0 0-4-4m4 4 4-4" strokeLinecap="round" />
        </svg>
        {uploading ? 'Uploading…' : label}
      </button>
      {progress && <p className="text-[10px] text-slate-500 mt-1">{progress}</p>}
      {error && <p className="text-[10px] text-amber-700 mt-1">{error}</p>}
    </div>
  );
}