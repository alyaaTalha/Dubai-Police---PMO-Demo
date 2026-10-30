import { useState } from 'react';
import { Check, Contrast, Eye, Type, Volume2, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../ui/dropdown-menu';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import Wheelchair from '../../imports/Wheelchair';
import { useLanguage } from '../../i18n/LanguageContext';

export function AccessibilityMenu() {
  const { tr } = useLanguage();
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal');
  const [colorBlindMode, setColorBlindMode] = useState<'none' | 'green' | 'red'>('none');
  const [screenReader, setScreenReader] = useState(false);
  const [textSize, setTextSize] = useState([100]);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="h-5 w-5">
            <Wheelchair />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>{tr('Accessibility Settings', 'إعدادات إمكانية الوصول')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Contrast */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Contrast className="h-4 w-4 me-2" />
            {tr('Contrast', 'التباين')}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setContrast('normal')}>
              <span className="flex-1">{tr('Normal', 'عادي')}</span>
              {contrast === 'normal' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setContrast('high')}>
              <span className="flex-1">{tr('High Contrast', 'تباين عالٍ')}</span>
              {contrast === 'high' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Dark Mode */}
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="text-sm">{tr('Dark Mode', 'الوضع الداكن')}</span>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>

        <DropdownMenuSeparator />

        {/* Color Blind Mode */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Eye className="h-4 w-4 me-2" />
            {tr('Color Blind Mode', 'وضع عمى الألوان')}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setColorBlindMode('none')}>
              <span className="flex-1">{tr('None', 'لا شيء')}</span>
              {colorBlindMode === 'none' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setColorBlindMode('green')}>
              <span className="flex-1">{tr('Green Weakness', 'ضعف تمييز الأخضر')}</span>
              {colorBlindMode === 'green' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setColorBlindMode('red')}>
              <span className="flex-1">{tr('Red Weakness', 'ضعف تمييز الأحمر')}</span>
              {colorBlindMode === 'red' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Screen Reader */}
        <div className="px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <span className="text-sm">{tr('Screen Reader', 'قارئ الشاشة')}</span>
          </div>
          <Switch
            checked={screenReader}
            onCheckedChange={setScreenReader}
          />
        </div>

        <DropdownMenuSeparator />

        {/* Text Size */}
        <div className="px-2 py-3">
          <div className="flex items-center gap-2 mb-3">
            <Type className="h-4 w-4" />
            <span className="text-sm">{tr('Text Size', 'حجم النص')}</span>
            <span className="text-xs text-muted-foreground ms-auto">{textSize[0]}%</span>
          </div>
          <Slider
            value={textSize}
            onValueChange={setTextSize}
            min={75}
            max={150}
            step={25}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>75%</span>
            <span>150%</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
