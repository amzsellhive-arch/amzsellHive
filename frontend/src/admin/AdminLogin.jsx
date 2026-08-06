import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../lib/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { Lock, Mail, LogIn, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await authApi.login(form);
      toast({ title: 'Logged in', description: `Welcome back, ${user.name || 'Admin'}` });
      navigate('/admin');
    } catch (err) {
      const msg = err?.response?.data?.errors?.email?.[0] || 'Invalid credentials';
      toast({ title: 'Login failed', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(30,20%,98%)] via-white to-[hsl(16,90%,97%)] p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={16} /> Back to site
        </Link>
        <div className="bg-white rounded-2xl border border-border shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[hsl(16,80%,52%)]/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={26} className="text-[hsl(16,80%,52%)]" />
            </div>
            <h1 className="text-2xl font-extrabold">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to manage your SellHive CMS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@sellhive.com"
                  required
                  className="rounded-xl pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="rounded-xl pl-10"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-glow bg-[hsl(16,80%,52%)] hover:bg-[hsl(16,80%,45%)] text-white font-bold py-5 rounded-full"
            >
              {loading ? 'Signing in...' : (
                <>
                  <LogIn size={16} className="mr-2" /> Sign in
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
