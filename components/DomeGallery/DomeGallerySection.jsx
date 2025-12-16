import React, { useMemo } from 'react';
import DomeGallery from './DomeGallery';

export default function DomeGallerySection() {
  const images = useMemo(() => {
    const mods = import.meta.glob('../../assets/img/dome-gallery/*.{jpg,jpeg,png,webp}', {
      eager: true,
      import: 'default'
    });

    const sorted = Object.entries(mods)
      .sort(([a], [b]) => {
        const na = parseInt(a.match(/foto(\d+)/i)?.[1] || '999', 10);
        const nb = parseInt(b.match(/foto(\d+)/i)?.[1] || '999', 10);
        return na - nb;
      })
      .map(([, src]) => ({ src, alt: 'Clean Splash' }));

    return sorted;
  }, []);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B5E86] text-center">Galería</h2>
        <p className="text-center text-gray-600 mt-2">Algunos trabajos y resultados reales.</p>

        {/* domo grande */}
        <div className="mt-10 w-full" style={{ height: '90vh', minHeight: 680 }}>
          <DomeGallery
            images={images}
            grayscale={false}
            autoRotate={true}
            autoRotateSpeedDegPerSec={5}
            autoRotateIdleMs={900}
            minRadius={980}
            fit={0.82}
            overlayBlurColor="rgba(255,255,255,0)"
            imageBorderRadius="30px"
            openedImageMaxWidth={820}
            openedImageMaxHeight={560}
          />
        </div>
      </div>
    </section>
  );
}
