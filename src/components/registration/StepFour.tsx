import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Upload, X, Image, Camera } from 'lucide-react';
import { useRef } from 'react';

interface StepFourData {
  inspirationImages: File[];
  currentSpacePhotos: File[];
}

interface StepFourProps {
  data: StepFourData;
  onChange: (data: StepFourData) => void;
}

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const StepFour = ({ data, onChange }: StepFourProps) => {
  const { isRTL } = useLanguage();
  const inspirationInputRef = useRef<HTMLInputElement>(null);
  const spaceInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'inspirationImages' | 'currentSpacePhotos'
  ) => {
    const files = Array.from(e.target.files || []);
    const currentFiles = data[type];
    
    // Filter valid files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > MAX_FILE_SIZE) return false;
      return true;
    });

    // Limit total files
    const availableSlots = MAX_FILES - currentFiles.length;
    const newFiles = validFiles.slice(0, availableSlots);

    onChange({
      ...data,
      [type]: [...currentFiles, ...newFiles],
    });

    // Reset input
    e.target.value = '';
  };

  const removeFile = (type: 'inspirationImages' | 'currentSpacePhotos', index: number) => {
    const newFiles = [...data[type]];
    newFiles.splice(index, 1);
    onChange({
      ...data,
      [type]: newFiles,
    });
  };

  const getPreviewUrl = (file: File) => URL.createObjectURL(file);

  const FileUploadZone = ({
    type,
    inputRef,
    icon: Icon,
    title,
    titleAr,
    description,
    descriptionAr,
  }: {
    type: 'inspirationImages' | 'currentSpacePhotos';
    inputRef: React.RefObject<HTMLInputElement>;
    icon: typeof Image;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
  }) => {
    const files = data[type];
    const canAddMore = files.length < MAX_FILES;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-accent" />
          <h3 className={cn('font-semibold text-foreground', isRTL ? 'font-arabic' : '')}>
            {isRTL ? titleAr : title}
          </h3>
          <span className="text-sm text-muted-foreground">
            ({files.length}/{MAX_FILES})
          </span>
        </div>
        
        <p className={cn('text-sm text-muted-foreground', isRTL ? 'font-arabic' : '')}>
          {isRTL ? descriptionAr : description}
        </p>

        {/* Upload Zone */}
        {canAddMore && (
          <div
            onClick={() => inputRef.current?.click()}
            className={cn(
              'border-2 border-dashed border-border rounded-xl p-8 cursor-pointer',
              'hover:border-accent hover:bg-accent/5 transition-all duration-200',
              'flex flex-col items-center justify-center gap-3'
            )}
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Upload className="w-6 h-6 text-accent" />
            </div>
            <p className={cn('text-sm text-muted-foreground text-center', isRTL ? 'font-arabic' : '')}>
              {isRTL ? 'انقر للتحميل أو اسحب الملفات هنا' : 'Click to upload or drag files here'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isRTL ? 'PNG, JPG, WEBP (حتى 10 ميجابايت)' : 'PNG, JPG, WEBP (up to 10MB)'}
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileChange(e, type)}
          className="hidden"
        />

        {/* Preview Grid */}
        {files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={getPreviewUrl(file)}
                  alt={`${type} ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => removeFile(type, index)}
                  className={cn(
                    'absolute -top-2 -right-2 w-6 h-6 rounded-full',
                    'bg-destructive text-destructive-foreground',
                    'flex items-center justify-center',
                    'opacity-0 group-hover:opacity-100 transition-opacity'
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className={cn('text-2xl font-bold text-foreground', isRTL ? 'font-arabic' : '')}>
          {isRTL ? 'صور المشروع' : 'Project Images'}
        </h2>
        <p className={cn('text-muted-foreground mt-2', isRTL ? 'font-arabic' : '')}>
          {isRTL 
            ? 'شارك معنا صور إلهامك والمساحة الحالية لفهم رؤيتك بشكل أفضل' 
            : 'Share inspiration images and current space photos to help us understand your vision'}
        </p>
      </div>

      {/* Inspiration Images */}
      <FileUploadZone
        type="inspirationImages"
        inputRef={inspirationInputRef}
        icon={Image}
        title="Inspiration Images"
        titleAr="صور الإلهام"
        description="Upload images that inspire your design vision (Pinterest, magazines, etc.)"
        descriptionAr="حمّل صور تلهم رؤيتك التصميمية (بينتريست، مجلات، إلخ)"
      />

      <div className="border-t border-border" />

      {/* Current Space Photos */}
      <FileUploadZone
        type="currentSpacePhotos"
        inputRef={spaceInputRef}
        icon={Camera}
        title="Current Space Photos"
        titleAr="صور المساحة الحالية"
        description="Upload photos of your current space that needs to be redesigned"
        descriptionAr="حمّل صور للمساحة الحالية التي تحتاج إلى إعادة تصميم"
      />

      {/* Optional Note */}
      <p className={cn('text-sm text-muted-foreground text-center italic', isRTL ? 'font-arabic' : '')}>
        {isRTL 
          ? '* تحميل الصور اختياري ولكنه يساعدنا على فهم متطلباتك بشكل أفضل' 
          : '* Uploading images is optional but helps us better understand your requirements'}
      </p>
    </div>
  );
};

export default StepFour;
