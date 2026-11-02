import { useLanguage } from '../../i18n/LanguageContext';

export function Footer() {
  const { tr } = useLanguage();
  return (
    <div className="w-full bg-[#008755] h-[42px] flex items-center px-3 flex-shrink-0">
      <p className="font-['Dubai:Regular',_sans-serif] text-[16px] text-white leading-[24px] font-[Dubai]">
        {tr('Copyright 2026 Dubai Police, All Rights Reserved.', 'حقوق النشر 2026 شرطة دبي، جميع الحقوق محفوظة.')}
      </p>
    </div>
  );
}
