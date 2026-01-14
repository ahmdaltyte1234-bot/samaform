import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LogOut, RefreshCw, Eye, Loader2, LayoutDashboard } from 'lucide-react';

interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  project_type: string;
  area_size: string | null;
  budget: string | null;
  timeline: string | null;
  additional_notes: string | null;
  questionnaire_answers: Record<string, unknown> | null;
  status: string;
  created_at: string;
}

const projectTypeLabels: Record<string, { en: string; ar: string }> = {
  apartment: { en: 'Apartment', ar: 'شقة' },
  villa: { en: 'Villa', ar: 'فيلا' },
  shop: { en: 'Shop', ar: 'محل تجاري' },
  restaurant: { en: 'Restaurant', ar: 'مطعم' },
  office: { en: 'Office', ar: 'مكتب' },
  salon: { en: 'Beauty Salon', ar: 'صالون تجميل' },
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  contacted: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  in_progress: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const Admin = () => {
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    checkAuth();
    fetchSubmissions();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/admin/login');
      return;
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (!adminData) {
      await supabase.auth.signOut();
      navigate('/admin/login');
    }
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: isRTL ? 'خطأ في تحميل البيانات' : 'Error loading data',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      // Map the data to our Submission type, parsing questionnaire_answers
      const mappedData: Submission[] = (data || []).map((item) => ({
        ...item,
        questionnaire_answers: typeof item.questionnaire_answers === 'object' 
          ? (item.questionnaire_answers as Record<string, unknown>) 
          : null,
      }));
      setSubmissions(mappedData);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('submissions')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: isRTL ? 'خطأ في التحديث' : 'Update failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: isRTL ? 'تم التحديث بنجاح' : 'Status updated',
      });
      fetchSubmissions();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className={cn('flex items-center justify-between', isRTL && 'flex-row-reverse')}>
            <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className={cn('text-xl font-bold text-foreground', isRTL && 'font-arabic')}>
                  {isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}
                </h1>
                <p className={cn('text-sm text-muted-foreground', isRTL && 'font-arabic')}>
                  {isRTL ? 'إدارة طلبات العملاء' : 'Manage client submissions'}
                </p>
              </div>
            </div>

            <div className={cn('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchSubmissions}
                disabled={isLoading}
              >
                <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className={cn('hidden sm:inline', isRTL && 'font-arabic')}>
                  {isRTL ? 'خروج' : 'Logout'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: isRTL ? 'الإجمالي' : 'Total', value: submissions.length, color: 'bg-primary/10 text-primary' },
            { label: isRTL ? 'قيد الانتظار' : 'Pending', value: submissions.filter(s => s.status === 'pending').length, color: 'bg-yellow-500/10 text-yellow-600' },
            { label: isRTL ? 'قيد التنفيذ' : 'In Progress', value: submissions.filter(s => s.status === 'in_progress').length, color: 'bg-purple-500/10 text-purple-600' },
            { label: isRTL ? 'مكتمل' : 'Completed', value: submissions.filter(s => s.status === 'completed').length, color: 'bg-green-500/10 text-green-600' },
          ].map((stat, i) => (
            <div key={i} className={cn('rounded-xl p-4 border border-border', stat.color)}>
              <p className={cn('text-sm opacity-80', isRTL && 'font-arabic')}>{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-20">
              <p className={cn('text-muted-foreground', isRTL && 'font-arabic')}>
                {isRTL ? 'لا توجد طلبات حتى الآن' : 'No submissions yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={isRTL ? 'text-right font-arabic' : ''}>
                      {isRTL ? 'الاسم' : 'Name'}
                    </TableHead>
                    <TableHead className={isRTL ? 'text-right font-arabic' : ''}>
                      {isRTL ? 'نوع المشروع' : 'Project Type'}
                    </TableHead>
                    <TableHead className={isRTL ? 'text-right font-arabic' : ''}>
                      {isRTL ? 'المدينة' : 'City'}
                    </TableHead>
                    <TableHead className={isRTL ? 'text-right font-arabic' : ''}>
                      {isRTL ? 'التاريخ' : 'Date'}
                    </TableHead>
                    <TableHead className={isRTL ? 'text-right font-arabic' : ''}>
                      {isRTL ? 'الحالة' : 'Status'}
                    </TableHead>
                    <TableHead className={isRTL ? 'text-right font-arabic' : ''}>
                      {isRTL ? 'الإجراءات' : 'Actions'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p>{submission.full_name}</p>
                          <p className="text-sm text-muted-foreground">{submission.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {projectTypeLabels[submission.project_type]?.[isRTL ? 'ar' : 'en'] || submission.project_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{submission.city}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(submission.created_at)}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={submission.status}
                          onValueChange={(value) => updateStatus(submission.id, value)}
                        >
                          <SelectTrigger className={cn('w-32', statusColors[submission.status])}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">{isRTL ? 'قيد الانتظار' : 'Pending'}</SelectItem>
                            <SelectItem value="contacted">{isRTL ? 'تم التواصل' : 'Contacted'}</SelectItem>
                            <SelectItem value="in_progress">{isRTL ? 'قيد التنفيذ' : 'In Progress'}</SelectItem>
                            <SelectItem value="completed">{isRTL ? 'مكتمل' : 'Completed'}</SelectItem>
                            <SelectItem value="cancelled">{isRTL ? 'ملغي' : 'Cancelled'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className={isRTL ? 'font-arabic text-right' : ''}>
              {isRTL ? 'تفاصيل الطلب' : 'Submission Details'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className={cn('font-semibold text-foreground', isRTL && 'font-arabic text-right')}>
                  {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{isRTL ? 'الاسم' : 'Name'}</p>
                    <p className="font-medium">{selectedSubmission.full_name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isRTL ? 'البريد' : 'Email'}</p>
                    <p className="font-medium">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isRTL ? 'الهاتف' : 'Phone'}</p>
                    <p className="font-medium" dir="ltr">{selectedSubmission.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isRTL ? 'المدينة' : 'City'}</p>
                    <p className="font-medium">{selectedSubmission.city}</p>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <h3 className={cn('font-semibold text-foreground', isRTL && 'font-arabic text-right')}>
                  {isRTL ? 'معلومات المشروع' : 'Project Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{isRTL ? 'نوع المشروع' : 'Project Type'}</p>
                    <p className="font-medium">
                      {projectTypeLabels[selectedSubmission.project_type]?.[isRTL ? 'ar' : 'en'] || selectedSubmission.project_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isRTL ? 'المساحة' : 'Area Size'}</p>
                    <p className="font-medium">{selectedSubmission.area_size || '-'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isRTL ? 'الميزانية' : 'Budget'}</p>
                    <p className="font-medium">{selectedSubmission.budget || '-'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{isRTL ? 'الجدول الزمني' : 'Timeline'}</p>
                    <p className="font-medium">{selectedSubmission.timeline || '-'}</p>
                  </div>
                </div>
                {selectedSubmission.additional_notes && (
                  <div>
                    <p className="text-muted-foreground text-sm">{isRTL ? 'ملاحظات إضافية' : 'Additional Notes'}</p>
                    <p className="text-sm mt-1">{selectedSubmission.additional_notes}</p>
                  </div>
                )}
              </div>

              {/* Questionnaire Answers */}
              {Object.keys(selectedSubmission.questionnaire_answers || {}).length > 0 && (
                <div className="space-y-3">
                  <h3 className={cn('font-semibold text-foreground', isRTL && 'font-arabic text-right')}>
                    {isRTL ? 'إجابات الاستبيان' : 'Questionnaire Answers'}
                  </h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selectedSubmission.questionnaire_answers).map(([key, value]) => (
                      <div key={key} className="border-b border-border pb-2">
                        <p className="text-muted-foreground">{key}</p>
                        <p className="font-medium">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
