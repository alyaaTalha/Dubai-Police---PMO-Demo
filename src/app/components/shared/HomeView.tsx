import { useState } from "react";
import { LayoutDashboard, LayoutGrid, LayoutTemplate } from "lucide-react";
import { HomePage, type HomePageProps } from "./HomePage";
import { HomePageBento } from "./HomePageBento";
import { HomePageMix } from "./HomePageMix";
import { useLanguage } from "../../i18n/LanguageContext";

type HomeLayout = 'classic' | 'bento' | 'mix';

const STORAGE_KEY = 'pmo.homeLayout';

// Option 3 is the chosen design. Set to true to bring back the switch and options 1 & 2.
const SHOW_LAYOUT_SWITCH = false;

function readLayout(): HomeLayout {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'bento' || saved === 'mix' ? saved : 'classic';
  } catch {
    return 'classic';
  }
}

/** Home page with a floating switch between the design options. */
export function HomeView(props: HomePageProps) {
  const { tr } = useLanguage();
  const [layout, setLayout] = useState<HomeLayout>(() => (SHOW_LAYOUT_SWITCH ? readLayout() : 'mix'));

  const choose = (next: HomeLayout) => {
    setLayout(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode etc.) — the choice just won't persist
    }
  };

  const options: Array<{ id: HomeLayout; icon: typeof LayoutGrid; label: string }> = [
    { id: 'classic', icon: LayoutDashboard, label: tr('Option 1', 'الخيار 1') },
    { id: 'bento', icon: LayoutGrid, label: tr('Option 2', 'الخيار 2') },
    { id: 'mix', icon: LayoutTemplate, label: tr('Option 3', 'الخيار 3') },
  ];

  return (
    <div className="relative h-full">
      {layout === 'classic' ? <HomePage {...props} /> : layout === 'bento' ? <HomePageBento {...props} /> : <HomePageMix {...props} />}

      {SHOW_LAYOUT_SWITCH && (
      <div
        role="group"
        aria-label={tr('Home page design', 'تصميم الصفحة الرئيسية')}
        className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full border border-gray-200 bg-white/95 p-1 shadow-lg backdrop-blur"
      >
        {options.map(({ id, icon: Icon, label }) => {
          const active = layout === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-[Dubai] transition-colors ${active ? 'bg-[#008755] text-white shadow-sm' : 'text-[#4b5563] hover:bg-gray-100'}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>
      )}
    </div>
  );
}
