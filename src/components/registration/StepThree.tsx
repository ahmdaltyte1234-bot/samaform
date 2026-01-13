import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StepThreeData {
  areaSize: string;
  budget: string;
  timeline: string;
  additionalNotes: string;
}

interface StepThreeProps {
  data: StepThreeData;
  onChange: (data: StepThreeData) => void;
  errors: Partial<Record<keyof StepThreeData, string>>;
}

const areaSizes = [
  { value: 'small', label: 'Small (< 100 sqm)', labelAr: 'صغير (أقل من 100 متر مربع)' },
  { value: 'medium', label: 'Medium (100-300 sqm)', labelAr: 'متوسط (100-300 متر مربع)' },
  { value: 'large', label: 'Large (300-500 sqm)', labelAr: 'كبير (300-500 متر مربع)' },
  { value: 'xlarge', label: 'Very Large (> 500 sqm)', labelAr: 'كبير جداً (أكثر من 500 متر مربع)' },
];

const budgets = [
  { value: 'economy', label: 'Economy', labelAr: 'اقتصادي' },
  { value: 'standard', label: 'Standard', labelAr: 'قياسي' },
  { value: 'premium', label: 'Premium', labelAr: 'متميز' },
  { value: 'luxury', label: 'Luxury', labelAr: 'فاخر' },
];

const timelines = [
  { value: 'urgent', label: 'Urgent (< 1 month)', labelAr: 'عاجل (أقل من شهر)' },
  { value: 'normal', label: 'Normal (1-3 months)', labelAr: 'عادي (1-3 أشهر)' },
  { value: 'relaxed', label: 'Relaxed (3-6 months)', labelAr: 'مريح (3-6 أشهر)' },
  { value: 'flexible', label: 'Flexible', labelAr: 'مرن' },
];

const StepThree = ({ data, onChange, errors }: StepThreeProps) => {
  const { isRTL } = useLanguage();

  const handleChange = (field: keyof StepThreeData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={cn('text-2xl font-bold text-foreground', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'تفاصيل المشروع' : 'Project Details'}
        </h2>
        <p className={cn('text-muted-foreground mt-2', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'أخبرنا المزيد عن متطلبات مشروعك' : 'Tell us more about your project requirements'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Area Size */}
        <div className="space-y-2">
          <Label className={cn('text-sm font-medium', isRTL ? 'font-arabic' : '')}>
            {isRTL ? 'مساحة المشروع' : 'Project Area'}
          </Label>
          <Select
            value={data.areaSize}
            onValueChange={(value) => handleChange('areaSize', value)}
          >
            <SelectTrigger className={cn('h-12', isRTL ? 'text-right font-arabic' : '', errors.areaSize ? 'border-destructive' : '')}>
              <SelectValue placeholder={isRTL ? 'اختر المساحة' : 'Select area size'} />
            </SelectTrigger>
            <SelectContent>
              {areaSizes.map((size) => (
                <SelectItem key={size.value} value={size.value} className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? size.labelAr : size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.areaSize && (
            <p className={cn('text-sm text-destructive', isRTL ? 'font-arabic' : '')}>
              {errors.areaSize}
            </p>
          )}
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label className={cn('text-sm font-medium', isRTL ? 'font-arabic' : '')}>
            {isRTL ? 'الميزانية' : 'Budget'}
          </Label>
          <Select
            value={data.budget}
            onValueChange={(value) => handleChange('budget', value)}
          >
            <SelectTrigger className={cn('h-12', isRTL ? 'text-right font-arabic' : '', errors.budget ? 'border-destructive' : '')}>
              <SelectValue placeholder={isRTL ? 'اختر الميزانية' : 'Select budget'} />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget.value} value={budget.value} className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? budget.labelAr : budget.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget && (
            <p className={cn('text-sm text-destructive', isRTL ? 'font-arabic' : '')}>
              {errors.budget}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <Label className={cn('text-sm font-medium', isRTL ? 'font-arabic' : '')}>
            {isRTL ? 'الجدول الزمني' : 'Timeline'}
          </Label>
          <Select
            value={data.timeline}
            onValueChange={(value) => handleChange('timeline', value)}
          >
            <SelectTrigger className={cn('h-12', isRTL ? 'text-right font-arabic' : '', errors.timeline ? 'border-destructive' : '')}>
              <SelectValue placeholder={isRTL ? 'اختر الجدول الزمني' : 'Select timeline'} />
            </SelectTrigger>
            <SelectContent>
              {timelines.map((timeline) => (
                <SelectItem key={timeline.value} value={timeline.value} className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? timeline.labelAr : timeline.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timeline && (
            <p className={cn('text-sm text-destructive', isRTL ? 'font-arabic' : '')}>
              {errors.timeline}
            </p>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <Label className={cn('text-sm font-medium', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'ملاحظات إضافية (اختياري)' : 'Additional Notes (Optional)'}
        </Label>
        <Textarea
          value={data.additionalNotes}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          placeholder={isRTL ? 'أخبرنا بأي متطلبات أو تفضيلات إضافية...' : 'Tell us about any additional requirements or preferences...'}
          className={cn('min-h-[120px]', isRTL ? 'text-right font-arabic' : '')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>
    </div>
  );
};

export default StepThree;
