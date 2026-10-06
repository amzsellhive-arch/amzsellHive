import { FOUNDERS } from '@/data/site';
import { BrandIcon } from '@/components/site/BrandIcons';

// Founder + Co-Founder cards, shared by the About and Home pages.
export default function FounderCards({ className = '' }) {
  return (
    <ul className={`grid grid-cols-1 min-[440px]:grid-cols-2 gap-5 ${className}`}>
      {FOUNDERS.map((f) => (
        <li
          key={f.name}
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-20px_rgba(8,35,63,0.45)]"
        >
          <div className="relative flex items-center justify-center bg-gradient-to-b from-navy to-navy-deep pt-12 pb-6">
            <img
              src={f.img}
              alt={`Portrait of ${f.name}, ${f.role} of SellHive`}
              loading="lazy"
              className="aspect-square w-[68%] max-w-[220px] rounded-full object-cover ring-4 ring-hive/80"
            />
            <span className="absolute top-3 left-3 rounded-full bg-hive px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
              {f.role}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-navy text-lg">{f.name}</h3>
                <p className="text-[#E0A800] font-semibold text-sm">{f.role}</p>
              </div>
              {f.linkedin && (
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${f.name} on LinkedIn`}
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0A66C2] hover:opacity-90 transition-opacity"
                >
                  <BrandIcon name="linkedin" size={16} color="#fff" />
                </a>
              )}
            </div>
            <span className="mt-3 block h-0.5 w-8 bg-hive" aria-hidden="true" />
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.bio}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
