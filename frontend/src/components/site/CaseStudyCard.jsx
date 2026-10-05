import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function CaseStudyCard({ study, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const { card } = study;
  return (
    <article className="flex flex-col rounded-2xl border border-[#D6E4F5] bg-white p-5 shadow-[0_6px_24px_-16px_rgba(21,94,239,0.35)]">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex h-9 min-w-[2.6rem] items-center justify-center rounded-lg bg-[#E8F0FC] px-2 text-sm font-extrabold text-brandblue">
          {study.num}
        </span>
        <H className="font-bold text-navy text-[17px] leading-snug">{study.cardTitle}</H>
      </div>

      <Link
        to={`/results/${study.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block rounded-xl border border-slate-200 bg-mist overflow-hidden"
      >
        <div className={`flex flex-col gap-1 ${card.image2 ? 'p-1' : ''}`}>
          <img
            src={card.image}
            alt=""
            loading="lazy"
            className={`w-full object-cover object-top ${card.image2 ? 'h-[104px]' : 'h-[210px]'}`}
          />
          {card.image2 && (
            <img src={card.image2} alt="" loading="lazy" className="w-full h-[104px] object-cover object-top" />
          )}
        </div>
      </Link>

      <p className="mt-5 font-jakarta text-lg font-extrabold leading-snug text-navy">{card.headline}</p>
      <ul className="mt-3 space-y-1.5 text-[15px] text-slate-600 flex-1">
        {card.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <Check size={17} className="mt-0.5 shrink-0 text-brandblue" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/results/${study.slug}`}
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border-2 border-brandblue/70 px-4 py-2 text-sm font-bold text-brandblue hover:bg-brandblue hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue focus-visible:ring-offset-2"
      >
        View Details <span className="sr-only">: {study.cardTitle}</span>
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
