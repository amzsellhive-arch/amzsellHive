import { Link } from 'react-router-dom';
import SiteLayout from '@/components/site/SiteLayout';
import { Container } from '@/components/site/ui';
import useSiteSettings from '@/hooks/useSiteSettings';
import useSeo from '@/hooks/useSeo';

// NOTE: general-purpose policy text. The client should have it reviewed
// for their jurisdiction before relying on it.
const UPDATED = 'October 2026';

function privacy(email) {
  return [
    ['Who we are', `SellHive provides Amazon and marketplace account management services. This policy explains what personal information we collect through sellhive.net, how we use it and the choices you have. Questions can be sent to ${email}.`],
    ['Information we collect', 'When you fill in our contact or audit forms we collect the details you provide — such as your name, email address, brand or store name, main marketplace and your message. We also collect basic technical data (browser type, pages visited, approximate location) through server logs and standard analytics.'],
    ['How we use it', 'We use your information to reply to your enquiry, prepare your free account audit, provide our services, send service-related emails and improve our website. We do not sell your personal information.'],
    ['Account data you share with us', 'If you give us access to Seller Central or advertising data for an audit or engagement, we use it only to deliver that work and keep it strictly confidential.'],
    ['Sharing', 'We share information only with service providers who help us run the website and our business (for example hosting and email providers), under confidentiality obligations, or where required by law.'],
    ['Retention', 'We keep enquiry and client records for as long as needed to provide our services and meet legal or accounting obligations, then delete or anonymise them.'],
    ['Your rights', `You can ask us to access, correct or delete the personal information we hold about you, or to stop contacting you, by emailing ${email}.`],
    ['Cookies', 'Our website may use essential cookies and local storage to keep the site working (for example, to retry a form submission if your connection drops). You can clear these through your browser settings.'],
    ['Changes', 'We may update this policy from time to time. The latest version will always be on this page.'],
  ];
}

function terms(email) {
  return [
    ['Agreement', 'By using sellhive.net you agree to these terms. If you do not agree, please do not use the website.'],
    ['Our services', 'Information on this website describes the services SellHive offers. The specific scope, fees and terms of any engagement are agreed with each client in writing after the free audit.'],
    ['Free audit', 'The free account audit is provided without obligation. Findings and recommendations are based on the data available to us at the time and are not a guarantee of future results.'],
    ['Results', 'Case studies show results from specific accounts during specific periods. Amazon performance depends on many factors outside our control, so past results do not guarantee similar outcomes for your account.'],
    ['Intellectual property', 'The content, design and branding on this website belong to SellHive unless stated otherwise. Amazon, Walmart, eBay, TikTok Shop, Shopify and other marks are trademarks of their respective owners and are used only to identify those platforms.'],
    ['Acceptable use', 'You agree not to misuse the website, attempt to gain unauthorised access, or submit false or harmful information through our forms.'],
    ['Limitation of liability', 'The website is provided “as is”. To the extent permitted by law, SellHive is not liable for any indirect or consequential loss arising from your use of the website.'],
    ['Contact', `Questions about these terms can be sent to ${email}.`],
  ];
}

export default function LegalPage({ type }) {
  const { settings } = useSiteSettings();
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  const sections = isPrivacy ? privacy(settings.email) : terms(settings.email);
  useSeo({ title, description: `${title} for SellHive (sellhive.net).` });

  return (
    <SiteLayout>
      <section className="bg-navy-deep text-white">
        <Container className="py-14">
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-3 text-white/70">Last updated: {UPDATED}</p>
        </Container>
      </section>
      <Container className="py-14">
        <div className="max-w-3xl space-y-8">
          {sections.map(([h, p]) => (
            <section key={h}>
              <h2 className="font-jakarta text-xl font-extrabold text-navy">{h}</h2>
              <p className="mt-2 text-slate-700 leading-relaxed">{p}</p>
            </section>
          ))}
          <p className="text-slate-600">
            See also our {isPrivacy ? <Link to="/terms" className="text-brandblue underline">Terms of Service</Link> : <Link to="/privacy-policy" className="text-brandblue underline">Privacy Policy</Link>}.
          </p>
        </div>
      </Container>
    </SiteLayout>
  );
}
