import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import ProgressBar from '@/components/registration/ProgressBar';
import StepOne from '@/components/registration/StepOne';
import StepTwo from '@/components/registration/StepTwo';
import StepThree from '@/components/registration/StepThree';
import StepQuestionnaire from '@/components/registration/StepQuestionnaire';
import StepFour from '@/components/registration/StepFour';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
const steps = [
  { title: 'Basic Info', titleAr: 'المعلومات الأساسية' },
  { title: 'Project Type', titleAr: 'نوع المشروع' },
  { title: 'Details', titleAr: 'التفاصيل' },
  { title: 'Questions', titleAr: 'الأسئلة' },
  { title: 'Images', titleAr: 'الصور' },
];

interface FormData {
  // Step 1
  fullName: string;
  email: string;
  phone: string;
  city: string;
  // Step 2
  projectType: string;
  // Step 3
  areaSize: string;
  budget: string;
  timeline: string;
  additionalNotes: string;
  // Step 4 - Questionnaire
  questionnaireAnswers: Record<string, string | string[]>;
  // Step 5
  inspirationImages: File[];
  currentSpacePhotos: File[];
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  projectType: '',
  areaSize: '',
  budget: '',
  timeline: '',
  additionalNotes: '',
  questionnaireAnswers: {},
  inspirationImages: [],
  currentSpacePhotos: [],
};

const Register = () => {
  const { isRTL, t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = isRTL ? 'الاسم مطلوب' : 'Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = isRTL ? 'الاسم قصير جداً' : 'Name is too short';
    }

    if (!formData.email.trim()) {
      newErrors.email = isRTL ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isRTL ? 'البريد الإلكتروني غير صالح' : 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = isRTL ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = isRTL ? 'رقم الهاتف غير صالح' : 'Invalid phone number';
    }

    if (!formData.city.trim()) {
      newErrors.city = isRTL ? 'المدينة مطلوبة' : 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.projectType) {
      newErrors.projectType = isRTL ? 'يرجى اختيار نوع المشروع' : 'Please select a project type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.areaSize) {
      newErrors.areaSize = isRTL ? 'يرجى اختيار المساحة' : 'Please select area size';
    }

    if (!formData.budget) {
      newErrors.budget = isRTL ? 'يرجى اختيار الميزانية' : 'Please select budget';
    }

    if (!formData.timeline) {
      newErrors.timeline = isRTL ? 'يرجى اختيار الجدول الزمني' : 'Please select timeline';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = true; // Questionnaire answers are optional but encouraged
        break;
      case 5:
        isValid = true; // Images are optional
        break;
    }

    if (isValid) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('submissions').insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        project_type: formData.projectType,
        area_size: formData.areaSize || null,
        budget: formData.budget || null,
        timeline: formData.timeline || null,
        additional_notes: formData.additionalNotes || null,
        questionnaire_answers: formData.questionnaireAnswers,
        // Note: Images would need storage bucket integration for production
      });

      if (error) throw error;

      toast({
        title: isRTL ? 'تم إرسال طلبك بنجاح!' : 'Your request has been submitted!',
        description: isRTL ? 'سنتواصل معك خلال 24 ساعة' : "We'll contact you within 24 hours",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: isRTL ? 'حدث خطأ' : 'Submission failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStepOneData = (data: Pick<FormData, 'fullName' | 'email' | 'phone' | 'city'>) => {
    setFormData({ ...formData, ...data });
  };

  const updateStepTwoData = (data: Pick<FormData, 'projectType'>) => {
    setFormData({ ...formData, ...data });
  };

  const updateStepThreeData = (data: Pick<FormData, 'areaSize' | 'budget' | 'timeline' | 'additionalNotes'>) => {
    setFormData({ ...formData, ...data });
  };

  const updateQuestionnaireData = (data: { answers: Record<string, string | string[]> }) => {
    setFormData({ ...formData, questionnaireAnswers: data.answers });
  };

  const updateStepFiveData = (data: Pick<FormData, 'inspirationImages' | 'currentSpacePhotos'>) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Bar */}
          <ProgressBar
            currentStep={currentStep}
            totalSteps={5}
            steps={steps}
          />

          {/* Form Card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-10">
            {/* Step Content */}
            {currentStep === 1 && (
              <StepOne
                data={{
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                  city: formData.city,
                }}
                onChange={updateStepOneData}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <StepTwo
                data={{ projectType: formData.projectType }}
                onChange={updateStepTwoData}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <StepThree
                data={{
                  areaSize: formData.areaSize,
                  budget: formData.budget,
                  timeline: formData.timeline,
                  additionalNotes: formData.additionalNotes,
                }}
                onChange={updateStepThreeData}
                errors={errors}
              />
            )}

            {currentStep === 4 && (
              <StepQuestionnaire
                projectType={formData.projectType}
                data={{ answers: formData.questionnaireAnswers }}
                onChange={updateQuestionnaireData}
              />
            )}

            {currentStep === 5 && (
              <StepFour
                data={{
                  inspirationImages: formData.inspirationImages,
                  currentSpacePhotos: formData.currentSpacePhotos,
                }}
                onChange={updateStepFiveData}
              />
            )}

            {/* Navigation Buttons */}
            <div className={cn('flex items-center justify-between mt-10 pt-6 border-t border-border', isRTL ? 'flex-row-reverse' : '')}>
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={cn('gap-2', isRTL ? 'flex-row-reverse' : '')}
              >
                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'السابق' : 'Previous'}
                </span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className={cn('gap-2 bg-accent hover:bg-accent/90 text-accent-foreground', isRTL ? 'flex-row-reverse' : '')}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className={isRTL ? 'font-arabic' : ''}>
                      {isRTL ? 'جاري الإرسال...' : 'Submitting...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className={isRTL ? 'font-arabic' : ''}>
                      {currentStep === 5
                        ? isRTL ? 'إرسال' : 'Submit'
                        : isRTL ? 'التالي' : 'Next'}
                    </span>
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
