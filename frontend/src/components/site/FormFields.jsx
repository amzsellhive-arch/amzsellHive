import { ChevronDown } from 'lucide-react';

const inputBase =
  'w-full rounded-lg border bg-[#F8FAFC] px-4 py-3 text-[15px] text-navy placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:border-brandblue focus:ring-2 focus:ring-brandblue/20';

export function Field({ id, label, required, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const describe = (id, error) => (error ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` } : {});

export function TextInput({ id, error, ...props }) {
  return (
    <input
      id={id}
      name={id}
      className={`${inputBase} ${error ? 'border-red-400' : 'border-slate-200'}`}
      {...describe(id, error)}
      {...props}
    />
  );
}

export function TextArea({ id, error, rows = 4, ...props }) {
  return (
    <textarea
      id={id}
      name={id}
      rows={rows}
      className={`${inputBase} resize-y ${error ? 'border-red-400' : 'border-slate-200'}`}
      {...describe(id, error)}
      {...props}
    />
  );
}

export function SelectInput({ id, error, placeholder, options, value, ...props }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        className={`${inputBase} appearance-none pr-10 ${value ? '' : 'text-slate-400'} ${error ? 'border-red-400' : 'border-slate-200'}`}
        {...describe(id, error)}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-navy">{o}</option>
        ))}
      </select>
      <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
    </div>
  );
}

// Shared validators (mirror the Laravel FormRequest rules)
export const validators = {
  name(v) {
    const s = v.trim();
    if (!s) return 'Please enter your name.';
    if (s.length < 3) return 'Your name must be at least 3 characters.';
    if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(s)) return 'Please use letters only in your name.';
    return null;
  },
  email(v) {
    const s = v.trim();
    if (!s) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return 'Please enter a valid email address, like you@brand.com.';
    return null;
  },
};

export function serverErrors(error) {
  if (error?.response?.status === 422 && error.response.data?.errors) {
    const out = {};
    Object.keys(error.response.data.errors).forEach((k) => {
      out[k] = error.response.data.errors[k][0];
    });
    return out;
  }
  return null;
}
