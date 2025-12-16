import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

const DEFAULTS = {
  maxVerticalRotationDeg: 6,
  dragSensitivity: 18,
  segments: 35
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = deg => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  const normalized = (pool || [])
    .map(img =>
      typeof img === 'string'
        ? { src: img, alt: '' }
        : { src: img?.src || '', alt: img?.alt || '' }
    )
    .filter(i => i.src);

  if (normalized.length === 0) return coords.map(c => ({ ...c, src: '', alt: '' }));

  const used = Array.from({ length: totalSlots }, (_, i) => normalized[i % normalized.length]);

  // evita repetidos seguidos
  for (let i = 1; i < used.length; i++) {
    if (used[i].src === used[i - 1].src) {
      for (let j = i + 1; j < used.length; j++) {
        if (used[j].src !== used[i].src) {
          const tmp = used[i];
          used[i] = used[j];
          used[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({ ...c, src: used[i].src, alt: used[i].alt }));
}

export default function DomeGallery({
  images = [],

  // tamaño / domo
  fit = 0.82,
  fitBasis = 'auto',
  minRadius = 980,
  maxRadius = Infinity,
  padFactor = 0.16,

  // overlay / fondo
  overlayBlurColor = 'rgba(255,255,255,0)',

  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  segments = DEFAULTS.segments,

  // auto movimiento
  autoRotate = true,
  autoRotateSpeedDegPerSec = 10,
  autoRotateIdleMs = 900,

  // color ON
  grayscale = false,

  imageBorderRadius = '30px',

  // Overlay abierto (más chico + redondeado)
  openedImageMaxWidth = 820,
  openedImageMaxHeight = 560
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);

  const viewerRef = useRef(null);
  const scrimRef = useRef(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);

  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const lastInteractionAtRef = useRef(0);

  const rafRef = useRef(null);
  const lastRafTsRef = useRef(0);

  const openedRef = useRef(false);
  const openedElRef = useRef(null);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg, yDeg) => {
    const el = sphereRef.current;
    if (!el) return;
    el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;

      let basis;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }

      let radius = basis * fit;
      const heightGuard = h * 1.5;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));

      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');

      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });

    ro.observe(root);
    return () => ro.disconnect();
  }, [applyTransform, fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius]);

  useEffect(() => {
    if (!autoRotate) return;

    const tick = ts => {
      const lastTs = lastRafTsRef.current || ts;
      const dt = Math.min(50, ts - lastTs);
      lastRafTsRef.current = ts;

      const now = performance.now();
      const idleOk = now - lastInteractionAtRef.current > autoRotateIdleMs;

      if (!openedRef.current && !draggingRef.current && !movedRef.current && idleOk) {
        const deltaDeg = (autoRotateSpeedDegPerSec * dt) / 1000;
        const nextY = wrapAngleSigned(rotationRef.current.y + deltaDeg);
        rotationRef.current = { ...rotationRef.current, y: nextY };
        applyTransform(rotationRef.current.x, nextY);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [autoRotate, autoRotateSpeedDegPerSec, autoRotateIdleMs, applyTransform]);

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (openedRef.current) return;
        const evt = event;
        draggingRef.current = true;
        movedRef.current = false;
        lastInteractionAtRef.current = performance.now();

        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
      },
      onDrag: ({ event, last }) => {
        if (openedRef.current) return;
        if (!draggingRef.current || !startPosRef.current) return;

        const evt = event;
        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);

        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        lastInteractionAtRef.current = performance.now();

        if (last) {
          draggingRef.current = false;
          setTimeout(() => (movedRef.current = false), 120);
        }
      }
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  const openImage = useCallback(
    src => {
      if (!src) return;
      if (openedRef.current) return;

      openedRef.current = true;
      lastInteractionAtRef.current = performance.now();

      const viewer = viewerRef.current;
      const root = rootRef.current;
      if (!viewer || !root) return;

      root.setAttribute('data-opened', 'true');

      const overlay = document.createElement('div');
      overlay.className = 'dg-open';
      overlay.style.setProperty('--max-w', `${openedImageMaxWidth}px`);
      overlay.style.setProperty('--max-h', `${openedImageMaxHeight}px`);

      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Imagen';
      overlay.appendChild(img);

      viewer.appendChild(overlay);
      openedElRef.current = overlay;

      requestAnimationFrame(() => overlay.classList.add('is-visible'));
    },
    [openedImageMaxWidth, openedImageMaxHeight]
  );

  const closeImage = useCallback(() => {
    const root = rootRef.current;
    const overlay = openedElRef.current;

    if (overlay) {
      overlay.classList.remove('is-visible');
      overlay.addEventListener(
        'transitionend',
        () => overlay.remove(),
        { once: true }
      );
    }

    openedElRef.current = null;
    openedRef.current = false;

    if (root) root.removeAttribute('data-opened');
    lastInteractionAtRef.current = performance.now();
  }, []);

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    const onScrim = () => {
      if (!openedRef.current) return;
      closeImage();
    };

    const onKey = e => {
      if (e.key === 'Escape' && openedRef.current) closeImage();
    };

    scrim.addEventListener('click', onScrim);
    window.addEventListener('keydown', onKey);

    return () => {
      scrim.removeEventListener('click', onScrim);
      window.removeEventListener('keydown', onKey);
    };
  }, [closeImage]);

  const onTileClick = useCallback(
    e => {
      if (draggingRef.current) return;
      if (movedRef.current) return;
      const src = e.currentTarget?.dataset?.src;
      openImage(src);
    },
    [openImage]
  );

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{
        ['--segments-x']: segments,
        ['--segments-y']: segments,
        ['--overlay-blur-color']: overlayBlurColor,
        ['--tile-radius']: imageBorderRadius,
        ['--image-filter']: grayscale ? 'grayscale(1)' : 'none'
      }}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                style={{
                  ['--offset-x']: it.x,
                  ['--offset-y']: it.y,
                  ['--item-size-x']: it.sizeX,
                  ['--item-size-y']: it.sizeY
                }}
              >
                <button
                  type="button"
                  className="item__image"
                  data-src={it.src}
                  onClick={onTileClick}
                  aria-label="Abrir imagen"
                >
                  {it.src ? <img src={it.src} draggable={false} alt={it.alt || ''} /> : null}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* overlays del domo */}
        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />
        <div className="edge-fade edge-fade--left" />
        <div className="edge-fade edge-fade--right" />

        {/* Viewer overlay */}
        <div className="dg-viewer" ref={viewerRef}>
          <div className="dg-scrim" ref={scrimRef} />
        </div>
      </main>
    </div>
  );
}
