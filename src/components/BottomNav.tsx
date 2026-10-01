import React from 'react';
import { Home, BookOpen, UploadCloud, Tag, CreditCard } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      urdu: 'ہوم',
      icon: Home,
    },
    {
      id: 'sections',
      label: 'Notes & Study',
      urdu: 'نوٹس',
      icon: BookOpen,
    },
    {
      id: 'upload',
      label: 'Upload & Solve',
      urdu: 'حل کروائیں',
      icon: UploadCloud,
      highlight: true,
      badge: '200 PKR',
    },
    {
      id: 'pricing',
      label: 'Pricing',
      urdu: 'قیمتیں',
      icon: Tag,
    },
    {
      id: 'payment',
      label: 'Payment',
      urdu: 'پیمنٹ',
      icon: CreditCard,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="relative -top-4 flex flex-col items-center group focus:outline-none"
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all transform active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#1976D2] to-[#2196F3] text-white ring-4 ring-blue-100'
                      : 'bg-[#2196F3] text-white hover:bg-blue-600 ring-2 ring-white'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold text-[#2196F3] mt-0.5 tracking-tight">
                  {item.label}
                </span>
                <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full absolute -top-1 shadow">
                  {item.badge}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 flex flex-col items-center py-1 transition relative ${
                isActive ? 'text-[#2196F3] font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 transition ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[11px] leading-tight">{item.label}</span>
              <span className="text-[9px] opacity-75 font-urdu">{item.urdu}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#2196F3] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
