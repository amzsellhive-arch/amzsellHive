import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Seamless auto-scrolling strip with prev/next arrows.
 * - pauses on hover / keyboard focus / touch
 * - respects prefers-reduced-motion (no auto-scroll)
 * - native swipe on touch devices
 */
export default function LogoCarousel({ items, renderItem, label, speed = 0.35 }) {
  const ref = useRef(null);
  const paused = useRef(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', fn);
    return () => mq.removeEventListener?.('change', fn);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    let acc = 0;
    const tick = () => {
      const el = ref.current;
      if (el && !paused.current) {
        acc += speed;
        if (acc >= 1) {
          const step = Math.floor(acc);
          acc -= step;
          el.scrollLeft += step;
          const half = el.scrollWidth / 2;
          if (el.scrollLeft >= half) el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, speed]);

  const nudge = (dir) => {
    const el = ref.current;
    if (!el) return;
    paused.current = true;
    const half = el.scrollWidth / 2;
    if (dir < 0 && el.scrollLeft < 260) el.scrollLeft += half;
    el.scrollBy({ left: dir * 260, behavior: 'smooth' });
    window.clearTimeout(nudge.t);
    nudge.t = window.setTimeout(() => {
      paused.current = false;
    }, 1600);
  };

  const list = reduced ? items : [...items, ...items];

  return (
    <div
      className="relative flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-3 shadow-[0_4px_20px_-12px_rgba(8,35,63,0.25)]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => setTimeout(() => (paused.current = false), 1500)}
    >
      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label={`Previous ${label}`}
        className="shrink-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-mist text-brandblue hover:bg-brandblue hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue"
      >
        <ChevronLeft size={18} />
      </button>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex-1 overflow-x-auto no-scrollbar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue rounded-lg [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <ul className={`flex items-center w-max ${reduced ? 'flex-wrap justify-center w-full' : ''}`}>
          {list.map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              aria-hidden={i >= items.length ? true : undefined}
              className="flex h-16 items-center justify-center px-6 sm:px-8 border-r border-slate-100 last:border-r-0"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label={`Next ${label}`}
        className="shrink-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-mist text-brandblue hover:bg-brandblue hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
