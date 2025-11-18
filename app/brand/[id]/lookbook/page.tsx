'use client';

import { use } from 'react';
import Image from 'next/image';
import { brands } from '@/data/brands';
import { useEffect, useRef } from 'react';

export default function LookbookPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const brand = brands.find(b => b.id === resolvedParams.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!brand?.featuredLookbook || !containerRef.current) return;

    const container = containerRef.current;
    const panelCount = brand.featuredLookbook.length;
    const panelWidth = window.innerWidth;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = (panelCount - 1) * window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      // Translate container horizontally
      const translateX = -progress * (panelCount - 1) * panelWidth;
      container.style.transform = `translateX(${translateX}px)`;

      // Update scroll indicator
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.width = `${progress * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [brand]);

  if (!brand || !brand.featuredLookbook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Lookbook not found</h1>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-hidden" style={{ height: `${brand.featuredLookbook.length * 100}vh` }}>
      {/* Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          ref={scrollProgressRef}
          className="h-full bg-gray-900 transition-all duration-300"
          style={{ width: '0%' }}
        />
      </div>

      {/* Scroll Hint on First Panel */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 text-center animate-bounce">
        <div className="text-gray-600 mb-2">SCROLL</div>
        <div className="w-px h-8 bg-gray-600 mx-auto" />
      </div>

      {/* Horizontal Panels Container */}
      <div
        ref={containerRef}
        className="flex fixed inset-0"
        style={{
          width: `${brand.featuredLookbook.length * 100}vw`,
        }}
      >
        {brand.featuredLookbook.map((image, index) => (
          <div
            key={image.id}
            className="relative flex-shrink-0"
            style={{ width: '100vw', height: '100vh' }}
          >
            <Image
              src={image.image}
              alt={image.caption || `Lookbook ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {image.caption && (
              <div className="absolute bottom-20 left-20">
                <p className="text-white text-2xl font-light">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

