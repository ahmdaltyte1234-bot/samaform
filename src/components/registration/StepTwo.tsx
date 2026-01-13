import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Home, Building2, Store, UtensilsCrossed, Briefcase, Sparkles } from 'lucide-react';

interface StepTwoData {
  projectType: string;
}

interface StepTwoProps {
  data: StepTwoData;
  onChange: (data: StepTwoData) => void;
  errors: Partial<Record<keyof StepTwoData, string>>;
}

const projectTypes = [
  { id: 'apartment', icon: Home, label: 'Apartment', labelAr: 'شقة', desc: 'Residential apartments', descAr: 'الشقق السكنية' },
  { id: 'villa', icon: Building2, label: 'Villa / Palace', labelAr: 'فيلا / قصر', desc: 'Luxury residences', descAr: 'المساكن الفاخرة' },
  { id: 'shop', icon: Store, label: 'Shop / Store', labelAr: 'محل / متجر', desc: 'Retail spaces', descAr: 'المساحات التجارية' },
  { id: 'restaurant', icon: UtensilsCrossed, label: 'Restaurant / Cafe', labelAr: 'مطعم / كافيه', desc: 'Dining establishments', descAr: 'المطاعم والمقاهي' },
  { id: 'office', icon: Briefcase, label: 'Office / Company', labelAr: 'مكتب / شركة', desc: 'Work environments', descAr: 'بيئات العمل' },
  { id: 'salon', icon: Sparkles, label: 'Beauty Salon', labelAr: 'صالون تجميل', desc: 'Beauty & wellness', descAr: 'الجمال والعافية' },
];

const StepTwo = ({ data, onChange, errors }: StepTwoProps) => {
  const { isRTL } = useLanguage();

  const handleSelect = (typeId: string) => {
    onChange({ ...data, projectType: typeId });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={cn('text-2xl font-bold text-foreground', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'نوع المشروع' : 'Project Type'}
        </h2>
        <p className={cn('text-muted-foreground mt-2', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'اختر نوع المساحة التي تريد تصميمها' : 'Select the type of space you want to design'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = data.projectType === type.id;

          return (
            <button
              key={type.id}
              type="button"
              onClick={() => handleSelect(type.id)}
              className={cn(
                'p-6 rounded-xl border-2 transition-all duration-300 text-left',
                isRTL ? 'text-right' : '',
                isSelected
                  ? 'border-accent bg-accent/10 shadow-lg'
                  : 'border-border hover:border-accent/50 hover:bg-muted/50'
              )}
            >
              <div className={cn('flex items-start gap-4', isRTL ? 'flex-row-reverse' : '')}>
                <div
                  className={cn(
                    'p-3 rounded-lg',
                    isSelected ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className={cn('font-semibold text-foreground', isRTL ? 'font-arabic' : '')}>
                    {isRTL ? type.labelAr : type.label}
                  </h3>
                  <p className={cn('text-sm text-muted-foreground mt-1', isRTL ? 'font-arabic' : '')}>
                    {isRTL ? type.descAr : type.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {errors.projectType && (
        <p className={cn('text-sm text-destructive text-center', isRTL ? 'font-arabic' : '')}>
          {errors.projectType}
        </p>
      )}
    </div>
  );
};

export default StepTwo;
