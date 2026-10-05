import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Container({ className = '', children }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = 'orange', className = '' }) {
  const color = tone === 'yellow' ? 'text-hive' : 'text-[#F15A24]';
  return (
    <p className={`text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] ${color} ${className}`}>
      {children}
    </p>
  );
}

/** Highlight helper: <Hl>word</Hl> renders in SellHive yellow */
export function Hl({ children, className = '' }) {
  return <span className={`text-hive ${className}`}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '', as: Tag = 'h2' }) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignCls} ${className}`}>
      {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
      <Tag className="font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight text-navy leading-[1.15]">
        {title}
      </Tag>
      {subtitle && <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-hive whitespace-nowrap';
const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[15px]',
};

export function YellowButton({ to, href, children, size = 'lg', className = '', arrow = true, ...rest }) {
  const cls = `${base} ${sizes[size]} bg-hive text-navy hover:bg-hive-dark shadow-[0_6px_20px_-6px_rgba(255,196,0,0.6)] ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight size={17} aria-hidden="true" />}
    </>
  );
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <Link to={to} className={cls} {...rest}>{inner}</Link>;
}

/** Outline button — `dark` for use on navy backgrounds */
export function OutlineButton({ to, href, children, size = 'lg', dark = false, icon: Icon, className = '', arrow = true, ...rest }) {
  const tone = dark
    ? 'border-2 border-hive/70 text-white hover:bg-white/10'
    : 'border-2 border-brandblue/70 text-brandblue hover:bg-brandblue/5';
  const cls = `${base} ${sizes[size]} ${tone} ${className}`;
  const inner = (
    <>
      {Icon && <Icon size={17} aria-hidden="true" />}
      {children}
      {arrow && <ArrowRight size={17} aria-hidden="true" />}
    </>
  );
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <Link to={to} className={cls} {...rest}>{inner}</Link>;
}

/** Row of small icon + label trust points */
export function TrustRow({ items, dark = true, className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className={`flex items-center gap-2 text-sm font-medium ${dark ? 'text-white/90' : 'text-navy'}`}>
          <Icon size={18} className="text-hive shrink-0" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

/**
 * Dark split hero used across inner pages. The image bleeds to the right
 * edge and fades into navy on the left, matching the approved mockups.
 */
export function PageHero({ eyebrow, title, body, actions, trust, image, imageAlt = '', imageClassName = '', compact = false }) {
  return (
    <section className="relative bg-navy-deep text-white overflow-hidden">
      {image && (
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]" aria-hidden={imageAlt ? undefined : true}>
          <img
            src={image}
            alt={imageAlt}
            className={`h-full w-full object-cover ${imageClassName}`}
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/10" />
          <div className="absolute inset-0 bg-navy-deep/60 lg:hidden" />
        </div>
      )}
      <Container className={`relative ${compact ? 'py-14 lg:py-16' : 'py-16 sm:py-20 lg:py-24'}`}>
        <div className="max-w-xl">
          {eyebrow && <Eyebrow tone="yellow" className="mb-3">{eyebrow}</Eyebrow>}
          <h1 className="font-jakarta text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight">
            {title}
          </h1>
          {body && <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-lg">{body}</p>}
          {actions && <div className="mt-8 flex flex-col sm:flex-row gap-3">{actions}</div>}
          {trust && <TrustRow items={trust} className="mt-8" />}
        </div>
      </Container>
    </section>
  );
}

/** Dark closing CTA band with subtle box imagery on both sides */
export function CtaBand({ eyebrow, title, body, primary, secondary, trust }) {
  return (
    <section className="relative bg-navy-deep text-white overflow-hidden">
      <img
        src="/images/site/results-hero.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="hidden md:block absolute -left-24 bottom-0 h-full w-[34%] object-cover opacity-25 [mask-image:linear-gradient(to_right,black,transparent)]"
      />
      <img
        src="/images/site/results-hero.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="hidden md:block absolute -right-24 bottom-0 h-full w-[34%] object-cover opacity-25 -scale-x-100 [mask-image:linear-gradient(to_right,black,transparent)]"
      />
      <Container className="relative py-16 sm:py-20 text-center">
        {eyebrow && <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-white/80 mb-3">{eyebrow}</p>}
        <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-tight tracking-tight max-w-3xl mx-auto">
          {title}
        </h2>
        {body && <p className="mt-4 text-white/80 text-base sm:text-lg max-w-2xl mx-auto">{body}</p>}
        {(primary || secondary) && (
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {primary}
            {secondary}
          </div>
        )}
        {trust && <TrustRow items={trust} className="mt-7 justify-center" />}
      </Container>
    </section>
  );
}
