import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface StepOneData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
}

interface StepOneProps {
  data: StepOneData;
  onChange: (data: StepOneData) => void;
  errors: Partial<Record<keyof StepOneData, string>>;
}

const StepOne = ({ data, onChange, errors }: StepOneProps) => {
  const { isRTL, t } = useLanguage();

  const handleChange = (field: keyof StepOneData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: 'fullName' as const, label: t('form.fullName'), labelAr: 'الاسم الكامل', type: 'text', placeholder: t('form.fullNamePlaceholder'), placeholderAr: 'أدخل اسمك الكامل' },
    { key: 'email' as const, label: t('form.email'), labelAr: 'البريد الإلكتروني', type: 'email', placeholder: t('form.emailPlaceholder'), placeholderAr: 'أدخل بريدك الإلكتروني' },
    { key: 'phone' as const, label: t('form.phone'), labelAr: 'رقم الهاتف', type: 'tel', placeholder: t('form.phonePlaceholder'), placeholderAr: 'أدخل رقم هاتفك' },
    { key: 'city' as const, label: t('form.city'), labelAr: 'المدينة', type: 'text', placeholder: t('form.cityPlaceholder'), placeholderAr: 'أدخل مدينتك' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={cn('text-2xl font-bold text-foreground', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
        </h2>
        <p className={cn('text-muted-foreground mt-2', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'أخبرنا عن نفسك' : 'Tell us about yourself'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label
              htmlFor={field.key}
              className={cn('text-sm font-medium', isRTL ? 'font-arabic' : '')}
            >
              {isRTL ? field.labelAr : field.label}
            </Label>
            <Input
              id={field.key}
              type={field.type}
              value={data[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={isRTL ? field.placeholderAr : field.placeholder}
              className={cn(
                'h-12',
                isRTL ? 'text-right font-arabic' : '',
                errors[field.key] ? 'border-destructive' : ''
              )}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors[field.key] && (
              <p className={cn('text-sm text-destructive', isRTL ? 'font-arabic' : '')}>
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepOne;
