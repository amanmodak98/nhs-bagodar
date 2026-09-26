'use client';

import { GalleryManager } from '@/components/admin/GalleryManager';

export default function AdminGalleryPage() {
  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Gallery</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Manage caption, category, ordering and visibility for every photograph on the{' '}
          <a href="/gallery" className="underline">/gallery</a> page.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Filesystem seeds (117 images in <code className="font-mono">/public/images/</code>) appear automatically.
          Run "Seed filesystem stems" once after first deploy to write them to D1. New images can be
          uploaded via the existing R2 upload endpoint and added here with an R2 image key.
        </p>
      </header>
      <GalleryManager />
    </div>
  );
}
