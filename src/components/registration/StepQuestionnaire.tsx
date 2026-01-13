import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface QuestionnaireData {
  answers: Record<string, string | string[]>;
}

interface StepQuestionnaireProps {
  projectType: string;
  data: QuestionnaireData;
  onChange: (data: QuestionnaireData) => void;
}

interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'text';
  question: string;
  questionAr: string;
  options?: { value: string; label: string; labelAr: string }[];
}

// Questions specific to each project type
const questionsByType: Record<string, Question[]> = {
  apartment: [
    {
      id: 'rooms',
      type: 'radio',
      question: 'How many rooms need to be designed?',
      questionAr: 'كم عدد الغرف التي تحتاج للتصميم؟',
      options: [
        { value: '1-2', label: '1-2 rooms', labelAr: '١-٢ غرف' },
        { value: '3-4', label: '3-4 rooms', labelAr: '٣-٤ غرف' },
        { value: '5+', label: '5+ rooms', labelAr: '٥+ غرف' },
      ],
    },
    {
      id: 'style',
      type: 'radio',
      question: 'What interior style do you prefer?',
      questionAr: 'ما هو أسلوب التصميم المفضل لديك؟',
      options: [
        { value: 'modern', label: 'Modern Minimalist', labelAr: 'عصري بسيط' },
        { value: 'classic', label: 'Classic Elegant', labelAr: 'كلاسيكي أنيق' },
        { value: 'contemporary', label: 'Contemporary', labelAr: 'معاصر' },
        { value: 'arabic', label: 'Arabic Traditional', labelAr: 'عربي تقليدي' },
      ],
    },
    {
      id: 'priority',
      type: 'checkbox',
      question: 'What are your priorities? (Select all that apply)',
      questionAr: 'ما هي أولوياتك؟ (اختر كل ما ينطبق)',
      options: [
        { value: 'storage', label: 'Storage Solutions', labelAr: 'حلول التخزين' },
        { value: 'lighting', label: 'Natural Lighting', labelAr: 'الإضاءة الطبيعية' },
        { value: 'smart', label: 'Smart Home Features', labelAr: 'ميزات المنزل الذكي' },
        { value: 'eco', label: 'Eco-Friendly Materials', labelAr: 'مواد صديقة للبيئة' },
      ],
    },
    {
      id: 'special_requests',
      type: 'text',
      question: 'Any specific requirements or preferences?',
      questionAr: 'هل لديك متطلبات أو تفضيلات محددة؟',
    },
  ],
  villa: [
    {
      id: 'floors',
      type: 'radio',
      question: 'How many floors does your villa have?',
      questionAr: 'كم عدد طوابق الفيلا؟',
      options: [
        { value: '1', label: '1 floor', labelAr: 'طابق واحد' },
        { value: '2', label: '2 floors', labelAr: 'طابقين' },
        { value: '3+', label: '3+ floors', labelAr: '٣+ طوابق' },
      ],
    },
    {
      id: 'outdoor',
      type: 'checkbox',
      question: 'Which outdoor areas need design?',
      questionAr: 'ما هي المناطق الخارجية التي تحتاج للتصميم؟',
      options: [
        { value: 'garden', label: 'Garden/Landscaping', labelAr: 'الحديقة' },
        { value: 'pool', label: 'Pool Area', labelAr: 'منطقة المسبح' },
        { value: 'terrace', label: 'Terrace/Balcony', labelAr: 'التراس/الشرفة' },
        { value: 'parking', label: 'Parking/Driveway', labelAr: 'موقف السيارات' },
      ],
    },
    {
      id: 'style',
      type: 'radio',
      question: 'What architectural style do you prefer?',
      questionAr: 'ما هو الأسلوب المعماري المفضل لديك؟',
      options: [
        { value: 'modern', label: 'Modern/Contemporary', labelAr: 'عصري/معاصر' },
        { value: 'mediterranean', label: 'Mediterranean', labelAr: 'متوسطي' },
        { value: 'islamic', label: 'Islamic/Arabian', labelAr: 'إسلامي/عربي' },
        { value: 'luxury', label: 'Luxury Palatial', labelAr: 'قصر فاخر' },
      ],
    },
    {
      id: 'special_requests',
      type: 'text',
      question: 'Any specific requirements or preferences?',
      questionAr: 'هل لديك متطلبات أو تفضيلات محددة؟',
    },
  ],
  shop: [
    {
      id: 'business_type',
      type: 'radio',
      question: 'What type of retail business?',
      questionAr: 'ما نوع النشاط التجاري؟',
      options: [
        { value: 'clothing', label: 'Clothing/Fashion', labelAr: 'ملابس/أزياء' },
        { value: 'electronics', label: 'Electronics', labelAr: 'إلكترونيات' },
        { value: 'grocery', label: 'Grocery/Supermarket', labelAr: 'بقالة/سوبرماركت' },
        { value: 'other', label: 'Other Retail', labelAr: 'تجزئة أخرى' },
      ],
    },
    {
      id: 'features',
      type: 'checkbox',
      question: 'What features do you need?',
      questionAr: 'ما هي الميزات التي تحتاجها؟',
      options: [
        { value: 'display', label: 'Display Windows', labelAr: 'واجهات عرض' },
        { value: 'storage', label: 'Storage Room', labelAr: 'غرفة تخزين' },
        { value: 'fitting', label: 'Fitting Rooms', labelAr: 'غرف قياس' },
        { value: 'cashier', label: 'Cashier Counter', labelAr: 'منطقة الكاشير' },
      ],
    },
    {
      id: 'brand_style',
      type: 'radio',
      question: 'What brand atmosphere do you want?',
      questionAr: 'ما هو جو العلامة التجارية المطلوب؟',
      options: [
        { value: 'premium', label: 'Premium/Luxury', labelAr: 'فاخر/راقي' },
        { value: 'modern', label: 'Modern/Trendy', labelAr: 'عصري/عصري' },
        { value: 'friendly', label: 'Friendly/Welcoming', labelAr: 'ودي/مرحب' },
        { value: 'minimal', label: 'Clean/Minimal', labelAr: 'نظيف/بسيط' },
      ],
    },
    {
      id: 'special_requests',
      type: 'text',
      question: 'Any specific requirements or preferences?',
      questionAr: 'هل لديك متطلبات أو تفضيلات محددة؟',
    },
  ],
  restaurant: [
    {
      id: 'cuisine_type',
      type: 'radio',
      question: 'What type of cuisine will you serve?',
      questionAr: 'ما نوع المطبخ الذي ستقدمه؟',
      options: [
        { value: 'arabic', label: 'Arabic/Middle Eastern', labelAr: 'عربي/شرق أوسطي' },
        { value: 'international', label: 'International', labelAr: 'عالمي' },
        { value: 'fastfood', label: 'Fast Food/Casual', labelAr: 'وجبات سريعة' },
        { value: 'fine', label: 'Fine Dining', labelAr: 'مطاعم راقية' },
      ],
    },
    {
      id: 'seating',
      type: 'radio',
      question: 'Expected seating capacity?',
      questionAr: 'سعة الجلوس المتوقعة؟',
      options: [
        { value: 'small', label: 'Up to 30 seats', labelAr: 'حتى ٣٠ مقعد' },
        { value: 'medium', label: '30-60 seats', labelAr: '٣٠-٦٠ مقعد' },
        { value: 'large', label: '60-100 seats', labelAr: '٦٠-١٠٠ مقعد' },
        { value: 'xlarge', label: '100+ seats', labelAr: '١٠٠+ مقعد' },
      ],
    },
    {
      id: 'features',
      type: 'checkbox',
      question: 'What areas do you need?',
      questionAr: 'ما هي المناطق التي تحتاجها؟',
      options: [
        { value: 'outdoor', label: 'Outdoor Seating', labelAr: 'جلوس خارجي' },
        { value: 'private', label: 'Private Rooms', labelAr: 'غرف خاصة' },
        { value: 'bar', label: 'Bar/Counter', labelAr: 'بار/كاونتر' },
        { value: 'kitchen', label: 'Open Kitchen', labelAr: 'مطبخ مفتوح' },
      ],
    },
    {
      id: 'special_requests',
      type: 'text',
      question: 'Any specific requirements or preferences?',
      questionAr: 'هل لديك متطلبات أو تفضيلات محددة؟',
    },
  ],
  office: [
    {
      id: 'company_size',
      type: 'radio',
      question: 'How many employees will use this space?',
      questionAr: 'كم عدد الموظفين الذين سيستخدمون هذا المكان؟',
      options: [
        { value: 'small', label: '1-10 employees', labelAr: '١-١٠ موظفين' },
        { value: 'medium', label: '10-30 employees', labelAr: '١٠-٣٠ موظف' },
        { value: 'large', label: '30-50 employees', labelAr: '٣٠-٥٠ موظف' },
        { value: 'xlarge', label: '50+ employees', labelAr: '٥٠+ موظف' },
      ],
    },
    {
      id: 'work_style',
      type: 'radio',
      question: 'What work environment do you prefer?',
      questionAr: 'ما بيئة العمل المفضلة لديك؟',
      options: [
        { value: 'open', label: 'Open Plan', labelAr: 'مفتوح' },
        { value: 'private', label: 'Private Offices', labelAr: 'مكاتب خاصة' },
        { value: 'hybrid', label: 'Hybrid/Mixed', labelAr: 'مختلط' },
        { value: 'cowork', label: 'Co-working Style', labelAr: 'أسلوب العمل المشترك' },
      ],
    },
    {
      id: 'amenities',
      type: 'checkbox',
      question: 'What amenities do you need?',
      questionAr: 'ما هي المرافق التي تحتاجها؟',
      options: [
        { value: 'meeting', label: 'Meeting Rooms', labelAr: 'قاعات اجتماعات' },
        { value: 'reception', label: 'Reception Area', labelAr: 'منطقة استقبال' },
        { value: 'kitchen', label: 'Kitchen/Pantry', labelAr: 'مطبخ' },
        { value: 'lounge', label: 'Break/Lounge Area', labelAr: 'منطقة استراحة' },
      ],
    },
    {
      id: 'special_requests',
      type: 'text',
      question: 'Any specific requirements or preferences?',
      questionAr: 'هل لديك متطلبات أو تفضيلات محددة؟',
    },
  ],
  salon: [
    {
      id: 'services',
      type: 'checkbox',
      question: 'What services will you offer?',
      questionAr: 'ما هي الخدمات التي ستقدمها؟',
      options: [
        { value: 'hair', label: 'Hair Styling', labelAr: 'تصفيف الشعر' },
        { value: 'nails', label: 'Nail Care', labelAr: 'العناية بالأظافر' },
        { value: 'skin', label: 'Skin Care/Facial', labelAr: 'العناية بالبشرة' },
        { value: 'spa', label: 'Spa/Massage', labelAr: 'سبا/مساج' },
      ],
    },
    {
      id: 'stations',
      type: 'radio',
      question: 'How many service stations do you need?',
      questionAr: 'كم عدد محطات الخدمة التي تحتاجها؟',
      options: [
        { value: 'small', label: '1-3 stations', labelAr: '١-٣ محطات' },
        { value: 'medium', label: '4-6 stations', labelAr: '٤-٦ محطات' },
        { value: 'large', label: '7-10 stations', labelAr: '٧-١٠ محطات' },
        { value: 'xlarge', label: '10+ stations', labelAr: '١٠+ محطات' },
      ],
    },
    {
      id: 'ambiance',
      type: 'radio',
      question: 'What ambiance do you want to create?',
      questionAr: 'ما الأجواء التي تريد خلقها؟',
      options: [
        { value: 'luxury', label: 'Luxury/High-End', labelAr: 'فاخر/راقي' },
        { value: 'modern', label: 'Modern/Trendy', labelAr: 'عصري/عصري' },
        { value: 'zen', label: 'Zen/Relaxing', labelAr: 'هادئ/مريح' },
        { value: 'chic', label: 'Chic/Boutique', labelAr: 'أنيق' },
      ],
    },
    {
      id: 'special_requests',
      type: 'text',
      question: 'Any specific requirements or preferences?',
      questionAr: 'هل لديك متطلبات أو تفضيلات محددة؟',
    },
  ],
};

const StepQuestionnaire = ({ projectType, data, onChange }: StepQuestionnaireProps) => {
  const { isRTL } = useLanguage();
  const questions = questionsByType[projectType] || questionsByType.apartment;

  const handleRadioChange = (questionId: string, value: string) => {
    onChange({
      answers: { ...data.answers, [questionId]: value },
    });
  };

  const handleCheckboxChange = (questionId: string, value: string, checked: boolean) => {
    const currentValues = (data.answers[questionId] as string[]) || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onChange({
      answers: { ...data.answers, [questionId]: newValues },
    });
  };

  const handleTextChange = (questionId: string, value: string) => {
    onChange({
      answers: { ...data.answers, [questionId]: value },
    });
  };

  const getProjectTypeLabel = () => {
    const labels: Record<string, { en: string; ar: string }> = {
      apartment: { en: 'Apartment', ar: 'الشقة' },
      villa: { en: 'Villa / Palace', ar: 'الفيلا / القصر' },
      shop: { en: 'Shop / Store', ar: 'المحل / المتجر' },
      restaurant: { en: 'Restaurant / Cafe', ar: 'المطعم / الكافيه' },
      office: { en: 'Office / Company', ar: 'المكتب / الشركة' },
      salon: { en: 'Beauty Salon', ar: 'صالون التجميل' },
    };
    return labels[projectType] || labels.apartment;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={cn('text-2xl font-bold text-foreground', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'أسئلة تفصيلية' : 'Detailed Questions'}
        </h2>
        <p className={cn('text-muted-foreground mt-2', isRTL ? 'font-arabic' : '')}>
          {isRTL
            ? `أجب على الأسئلة التالية المتعلقة بـ ${getProjectTypeLabel().ar}`
            : `Answer the following questions about your ${getProjectTypeLabel().en}`}
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="space-y-4">
            <Label className={cn('text-base font-medium', isRTL ? 'font-arabic block text-right' : '')}>
              <span className="text-accent">{index + 1}.</span>{' '}
              {isRTL ? q.questionAr : q.question}
            </Label>

            {q.type === 'radio' && q.options && (
              <RadioGroup
                value={(data.answers[q.id] as string) || ''}
                onValueChange={(value) => handleRadioChange(q.id, value)}
                className={cn('grid gap-3', isRTL ? 'text-right' : '')}
              >
                {q.options.map((opt) => (
                  <div
                    key={opt.value}
                    className={cn(
                      'flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/50 transition-colors',
                      isRTL ? 'flex-row-reverse space-x-reverse' : ''
                    )}
                  >
                    <RadioGroupItem value={opt.value} id={`${q.id}-${opt.value}`} />
                    <Label
                      htmlFor={`${q.id}-${opt.value}`}
                      className={cn('cursor-pointer flex-1', isRTL ? 'font-arabic' : '')}
                    >
                      {isRTL ? opt.labelAr : opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {q.type === 'checkbox' && q.options && (
              <div className={cn('grid gap-3', isRTL ? 'text-right' : '')}>
                {q.options.map((opt) => {
                  const currentValues = (data.answers[q.id] as string[]) || [];
                  const isChecked = currentValues.includes(opt.value);

                  return (
                    <div
                      key={opt.value}
                      className={cn(
                        'flex items-center space-x-3 p-3 rounded-lg border transition-colors',
                        isChecked ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/50',
                        isRTL ? 'flex-row-reverse space-x-reverse' : ''
                      )}
                    >
                      <Checkbox
                        id={`${q.id}-${opt.value}`}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(q.id, opt.value, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`${q.id}-${opt.value}`}
                        className={cn('cursor-pointer flex-1', isRTL ? 'font-arabic' : '')}
                      >
                        {isRTL ? opt.labelAr : opt.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}

            {q.type === 'text' && (
              <Textarea
                placeholder={isRTL ? 'اكتب هنا...' : 'Type here...'}
                value={(data.answers[q.id] as string) || ''}
                onChange={(e) => handleTextChange(q.id, e.target.value)}
                className={cn('min-h-[100px]', isRTL ? 'font-arabic text-right' : '')}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepQuestionnaire;
