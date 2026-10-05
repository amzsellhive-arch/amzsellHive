import Markdown from 'markdown-to-jsx';
import { Link } from 'react-router-dom';

function SmartLink({ href = '', children, ...rest }) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return <Link to={href} {...rest}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

// Renders admin-authored Markdown. Raw HTML is disabled for safety.
export default function BlogMarkdown({ children }) {
  return (
    <div className="prose prose-lg max-w-none prose-slate font-jakarta prose-headings:font-jakarta prose-headings:font-extrabold prose-headings:text-navy prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-[1.75rem] prose-h3:text-[1.35rem] prose-p:leading-8 prose-li:leading-8 prose-strong:text-navy prose-a:text-brandblue prose-a:font-semibold prose-a:underline-offset-4 prose-blockquote:border-l-hive prose-blockquote:text-navy prose-blockquote:font-semibold prose-blockquote:not-italic prose-img:rounded-xl prose-img:border prose-img:border-slate-200 prose-table:text-base prose-th:text-navy prose-code:before:content-none prose-code:after:content-none prose-code:bg-mist prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
      <Markdown
        options={{
          forceBlock: true,
          disableParsingRawHTML: true,
          overrides: {
            a: { component: SmartLink },
            img: { props: { loading: 'lazy' } },
            table: { component: ({ children }) => <div className="overflow-x-auto"><table>{children}</table></div> },
          },
        }}
      >
        {children || ''}
      </Markdown>
    </div>
  );
}
