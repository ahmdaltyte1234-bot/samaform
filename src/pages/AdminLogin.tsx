import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLogin = () => {
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is an admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', data.user.id)
        .maybeSingle();

      if (adminError) throw adminError;

      if (!adminData) {
        await supabase.auth.signOut();
        throw new Error(isRTL ? 'ليس لديك صلاحية الوصول' : 'You do not have admin access');
      }

      toast({
        title: isRTL ? 'تم تسجيل الدخول بنجاح' : 'Login successful',
      });

      navigate('/admin');
    } catch (error: any) {
      toast({
        title: isRTL ? 'خطأ في تسجيل الدخول' : 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className={cn('text-2xl font-bold text-foreground', isRTL && 'font-arabic')}>
              {isRTL ? 'لوحة التحكم' : 'Admin Panel'}
            </h1>
            <p className={cn('text-muted-foreground mt-2', isRTL && 'font-arabic')}>
              {isRTL ? 'تسجيل الدخول للمتابعة' : 'Sign in to continue'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={isRTL ? 'font-arabic' : ''}>
                {isRTL ? 'البريد الإلكتروني' : 'Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                required
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={isRTL ? 'font-arabic' : ''}>
                {isRTL ? 'كلمة المرور' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                required
                dir="ltr"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isRTL ? 'جاري التحميل...' : 'Loading...'}
                </>
              ) : (
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className={cn('text-sm text-muted-foreground hover:text-foreground', isRTL && 'font-arabic')}
            >
              {isRTL ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
