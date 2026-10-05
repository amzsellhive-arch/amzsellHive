import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster as ShadcnToaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Services from './pages/Services';
import Results from './pages/Results';
import About from './pages/About';
import Contact from './pages/Contact';
import Audit from './pages/Audit';
import CaseStudy from './pages/CaseStudy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import BlogPosts from './admin/BlogPosts';
import BlogEditor from './admin/BlogEditor';
import SiteSettings from './admin/SiteSettings';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import LeadsTable from './admin/LeadsTable';
import AuditRequests from './admin/AuditRequests';
import CmsEditor from './admin/CmsEditor';
import ResultCards from './admin/ResultCards';
import Testimonials from './admin/Testimonials';
import RequireAdmin from './components/ui/RequireAdmin';
import AuthCallback from './pages/AuthCallback';
import AuthError from './pages/AuthError';

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/services" element={<Services />} />
    <Route path="/results" element={<Results />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/audit" element={<Audit />} />
    <Route path="/results/:slug" element={<CaseStudy />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/resources" element={<Navigate to="/blog" replace />} />
    <Route path="/privacy-policy" element={<Legal type="privacy" />} />
    <Route path="/terms" element={<Legal type="terms" />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin"
      element={
        <RequireAdmin>
          <AdminDashboard />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/leads"
      element={
        <RequireAdmin>
          <LeadsTable />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/audits"
      element={
        <RequireAdmin>
          <AuditRequests />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/cms"
      element={
        <RequireAdmin>
          <CmsEditor />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/result-cards"
      element={
        <RequireAdmin>
          <ResultCards />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/testimonials"
      element={
        <RequireAdmin>
          <Testimonials />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/blog"
      element={
        <RequireAdmin>
          <BlogPosts />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/blog/new"
      element={
        <RequireAdmin>
          <BlogEditor />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/blog/:id"
      element={
        <RequireAdmin>
          <BlogEditor />
        </RequireAdmin>
      }
    />
    <Route
      path="/admin/settings"
      element={
        <RequireAdmin>
          <SiteSettings />
        </RequireAdmin>
      }
    />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/auth/error" element={<AuthError />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <ShadcnToaster />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
export { AppRoutes };
