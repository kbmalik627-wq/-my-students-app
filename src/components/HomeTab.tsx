import React, { useState } from 'react';
import { EducationalItem, CategoryType } from '../types';
import { EDUCATIONAL_ITEMS, ALL_CLASSES } from '../data/mockData';
import { 
  Search, 
  FileText, 
  Feather, 
  BookOpen, 
  GraduationCap, 
  Languages, 
  Layers, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Copy, 
  Check, 
  MessageCircle, 
  CreditCard,
  Flame,
  FileCheck,
  ShieldCheck,
  Award
} from 'lucide-react';

interface HomeTabProps {
  onSelectItem: (item: EducationalItem) => void;
  onSelectCategory: (cat: CategoryType) => void;
  onSelectTab: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onSelectItem,
  onSelectCategory,
  onSelectTab,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [copiedNumber, setCopiedNumber] = useState(false);

  const officialNumber = '03267976823';

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(officialNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent('Assalam-o-Alaikum AW Assignment Work! Mujhe solved assignment / notes chahiye.');
    window.open(`https://wa.me/923267976823?text=${text}`, '_blank');
  };

  const sections = [
    {
      id: 'assignments' as CategoryType,
      title: 'Solved Assignments',
      urdu: 'حل شدہ اسائنمنٹس',
      price: '300 PKR',
      icon: FileText,
      gradient: 'from-[#2196F3] to-[#1976D2]',
      tag: 'AIOU & Boards',
    },
    {
      id: 'mazmoon' as CategoryType,
      title: 'Mazmoon / Essay Writing',
      urdu: 'مضمون نویسی (اردو و انگلش)',
      price: '50 PKR',
      icon: Feather,
      gradient: 'from-emerald-500 to-emerald-700',
      tag: 'Urdu & English',
    },
    {
      id: 'stories' as CategoryType,
      title: 'Story Writing',
      urdu: 'کہانی نویسی مع اخلاقی سبق',
      price: '50 PKR',
      icon: BookOpen,
      gradient: 'from-purple-500 to-purple-700',
      tag: 'Moral Stories',
    },
    {
      id: 'grammar' as CategoryType,
      title: 'English Grammar & Notes',
      urdu: 'انگلش گرامر اور تمام ٹینسیز',
      price: 'Free Notes',
      icon: GraduationCap,
      gradient: 'from-amber-500 to-amber-700',
      tag: 'Tenses & Rules',
    },
    {
      id: 'vocabulary' as CategoryType,
      title: 'Words Meaning / Vocabulary',
      urdu: 'الفاظ و معنی اور تلفظ',
      price: 'Free Notes',
      icon: Languages,
      gradient: 'from-teal-500 to-teal-700',
      tag: 'Meanings & Synonyms',
    },
    {
      id: 'class_notes' as CategoryType,
      title: 'Complete Notes for Every Class',
      urdu: 'تمام کلاسز کے حل شدہ نوٹس',
      price: 'All Classes',
      icon: Layers,
      gradient: 'from-indigo-500 to-indigo-700',
      tag: 'Play Group to Masters',
    },
  ];

  // Popular and filtered list
  const popularAssignments = EDUCATIONAL_ITEMS.filter((item) => {
    const matchesClass =
      selectedClass === 'All Classes' ||
      item.classLevel.toLowerCase().includes(selectedClass.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.urduTitle && item.urduTitle.includes(searchQuery)) ||
      (item.code && item.code.includes(searchQuery)) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesClass && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6 pb-24">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-[#2196F3] via-[#1E88E5] to-[#1565C0] text-white rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-10 -bottom-10 w-32 h-32 rounded-full bg-blue-400/20 blur-lg pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            <Award className="w-3.5 h-3.5 text-yellow-300" />
            <span>Pakistan’s #1 Educational Portal for Students</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
            AW Assignment Work
            <span className="block text-blue-100 text-lg sm:text-xl font-bold font-urdu mt-0.5">
              تمام حل شدہ اسائنمنٹس، مضامین، کہانیاں اور گرامر نوٹس
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 max-w-lg leading-relaxed">
            Allama Iqbal Open University (AIOU), Punjab University, BISE Lahore, Rawalpindi, Faisalabad & all boards covered. 100% accurate solutions.
          </p>

          {/* Quick CTA Buttons in Hero */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => onSelectTab('upload')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg transition active:scale-95"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Apni Assignment Upload Karke Hal Karwain (200 PKR)</span>
            </button>

            <button
              onClick={() => onSelectTab('payment')}
              className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/30 flex items-center gap-1.5 transition active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-emerald-300" />
              <span>JazzCash / Easypaisa Gateway</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Payment Quick Ribbon */}
      <div className="bg-white border-2 border-blue-400 rounded-2xl p-3.5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2196F3] flex items-center justify-center font-black flex-shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                JazzCash & Easypaisa
              </span>
              <span className="text-xs font-bold text-slate-700">Official Account</span>
            </div>
            <p className="text-lg font-black text-slate-900 tracking-wider font-mono">
              {officialNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={handleCopyNumber}
            className="flex-1 sm:flex-none px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition"
          >
            {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedNumber ? 'Copied!' : 'Copy Number'}</span>
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="flex-1 sm:flex-none px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Open WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Search Bar on Home Screen */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search AIOU Code (1423, 8601), Urdu Mazmoon, Tenses, Physics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2196F3] transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Search Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs text-slate-600 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-[#2196F3]" />
            Trending:
          </span>
          {['AIOU 1423', 'AIOU 8601', 'علامہ اقبال', 'The Thirsty Crow', '12 Tenses', '9th Physics'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(tag)}
                className="bg-white hover:bg-blue-50 hover:text-[#2196F3] px-2.5 py-1 rounded-full border border-slate-200 text-[11px] font-medium transition flex-shrink-0"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>

      {/* Class Level Selector Bar (Play Group to BS/Masters, Matric, FA, BA, B.Ed, M.Ed, AIOU, PU) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Class & University
          </h3>
          <span className="text-[11px] font-urdu text-slate-400">کلاس کا انتخاب کریں</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {ALL_CLASSES.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex-shrink-0 ${
                selectedClass === cls
                  ? 'bg-[#2196F3] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* The 6 Main Requested Sections Grid (With Icons & Prices) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            All Study Sections
          </h3>
          <button
            onClick={() => onSelectTab('sections')}
            className="text-xs font-bold text-[#2196F3] hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => {
                  onSelectCategory(sec.id);
                  onSelectTab('sections');
                }}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-blue-400 transition cursor-pointer flex flex-col justify-between group active:scale-95"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${sec.gradient} text-white flex items-center justify-center shadow`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="bg-blue-50 text-[#1976D2] font-black text-xs px-2 py-0.5 rounded-lg border border-blue-100">
                      {sec.price}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-[#2196F3] transition leading-snug">
                    {sec.title}
                  </h4>
                  <p className="font-urdu text-xs text-slate-500 mt-0.5">{sec.urdu}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-[#2196F3]">
                  <span>{sec.tag}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Banner: "Apni Assignment Upload Karke Hal Karwain - 200 PKR" */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-3xl p-5 text-slate-950 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-block bg-slate-900 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
            Special Student Service
          </div>
          <h3 className="text-lg sm:text-xl font-black tracking-tight">
            Apni Assignment Upload Karke Hal Karwain - 200 PKR
          </h3>
          <p className="text-xs text-slate-800 font-medium">
            Take a photo of your paper or questions. Solved accurately within 24 hours!
          </p>
        </div>

        <button
          onClick={() => onSelectTab('upload')}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 flex-shrink-0"
        >
          <UploadCloud className="w-4 h-4 text-amber-300" />
          <span>Upload Assignment Now</span>
        </button>
      </div>

      {/* Popular Solved Assignments list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              Popular Solved Assignments ({selectedClass})
            </h3>
            <p className="text-[11px] text-slate-400 font-urdu">سب سے زیادہ ڈاؤنلوڈ شدہ اسائنمنٹس</p>
          </div>

          <button
            onClick={() => {
              onSelectCategory('assignments');
              onSelectTab('sections');
            }}
            className="text-xs font-bold text-[#2196F3] hover:underline"
          >
            See All ({popularAssignments.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {popularAssignments.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-blue-400 transition cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {item.classLevel}
                  </span>
                  <span className="font-black text-sm text-[#2196F3]">
                    {item.price > 0 ? `${item.price} PKR` : 'FREE'}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#2196F3] transition leading-snug">
                  {item.title}
                </h4>

                {item.urduTitle && (
                  <p className="font-urdu text-xs text-slate-500 text-right mt-1 line-clamp-1">
                    {item.urduTitle}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center space-x-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({item.downloadsCount})</span>
                </div>

                <span className="font-bold text-[#2196F3]">View Solution →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Badges */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-2 border-r border-slate-100">
          <p className="font-black text-slate-900 text-sm sm:text-base">100%</p>
          <p className="text-[10px] sm:text-xs text-slate-500">Passing Guarantee</p>
        </div>
        <div className="p-2 border-r border-slate-100">
          <p className="font-black text-slate-900 text-sm sm:text-base">24/7</p>
          <p className="text-[10px] sm:text-xs text-slate-500">WhatsApp Support</p>
        </div>
        <div className="p-2">
          <p className="font-black text-slate-900 text-sm sm:text-base">Instant</p>
          <p className="text-[10px] sm:text-xs text-slate-500">JazzCash Verification</p>
        </div>
      </div>
    </div>
  );
};
