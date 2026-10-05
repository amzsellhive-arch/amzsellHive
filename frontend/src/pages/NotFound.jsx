import SiteLayout from '@/components/site/SiteLayout';
import { Container, YellowButton } from '@/components/site/ui';
import useSeo from '@/hooks/useSeo';

export default function NotFound() {
  useSeo({ title: 'Page not found' });
  return (
    <SiteLayout>
      <Container className="py-24 text-center">
        <p className="font-jakarta text-6xl font-extrabold text-hive">404</p>
        <h1 className="mt-4 font-jakarta text-3xl font-extrabold text-navy">This page doesn’t exist.</h1>
        <p className="mt-3 text-slate-600">The link may be old or mistyped. Head back home or see our results.</p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <YellowButton to="/">Back to Home</YellowButton>
          <YellowButton to="/results" className="!bg-mist !shadow-none">See Results</YellowButton>
        </div>
      </Container>
    </SiteLayout>
  );
}
