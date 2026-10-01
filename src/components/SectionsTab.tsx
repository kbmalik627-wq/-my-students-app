import React, { useState } from 'react';
import { 
  CategoryType, 
  EducationalItem, 
  GrammarLesson, 
  VocabWord 
} from '../types';
import { 
  EDUCATIONAL_ITEMS, 
  ALL_CLASSES, 
  GRAMMAR_LESSONS, 
  VOCAB_WORDS 
} from '../data/mockData';
import { 
  FileText, 
  Feather, 
  BookOpen, 
  GraduationCap, 
  Languages, 
  Layers, 
  Search, 
  Star, 
  Download, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  BookMarked
} from 'lucide-react';

interface SectionsTabProps {
  initialCategory?: CategoryType;
  onSelectItem: (item: EducationalItem) => void;
  onSelectTab: (tab: string) => void;
}

export const SectionsTab: React.FC<SectionsTabProps> = ({
  initialCategory = 'assignments',
  onSelectItem,
  onSelectTab,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(initialCategory);
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [query, setQuery] = useState('');
  const [activeGrammarTab, setActiveGrammarTab] = useState<'lessons' | 'voice' | 'applications'>('lessons');

  const sectionsConfig: {
    id: CategoryType;
    label: string;
    urdu: string;
    priceTag?: string;
    icon: any;
    color: string;
  }[] = [
    {
      id: 'assignments',
      label: 'Solved Assignments',
      urdu: 'حل شدہ اسائنمنٹس',
      priceTag: '300 PKR',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'mazmoon',
      label: 'Mazmoon / Essays',
      urdu: 'مضمون نویسی',
      priceTag: '50 PKR',
      icon: Feather,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 'stories',
      label: 'Story Writing',
      urdu: 'کہانی نویسی',
      priceTag: '50 PKR',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'grammar',
      label: 'English Grammar',
      urdu: 'انگلش گرامر',
      priceTag: 'Free / نوٹس',
      icon: GraduationCap,
      color: 'from-amber-500 to-amber-600',
    },
    {
      id: 'vocabulary',
      label: 'Words Meaning',
      urdu: 'الفاظ و معنی',
      priceTag: 'Free / ذخیرہ الفاظ',
      icon: Languages,
      color: 'from-teal-500 to-teal-600',
    },
    {
      id: 'class_notes',
      label: 'Complete Notes',
      urdu: 'تمام کلاسز کے نوٹس',
      priceTag: 'All Classes',
      icon: Layers,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  // Filter items
  const filteredItems = EDUCATIONAL_ITEMS.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesClass =
      selectedClass === 'All Classes' || item.classLevel.toLowerCase().includes(selectedClass.toLowerCase());
    const matchesSearch =
      query === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.urduTitle && item.urduTitle.includes(query)) ||
      (item.code && item.code.includes(query)) ||
      item.subject.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesClass && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-5 space-y-5 pb-24">
      {/* 6 Category Selection Carousel */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <BookMarked className="w-4 h-4 text-[#2196F3]" />
            Study Sections & Categories
          </h2>
          <span className="text-[11px] text-slate-400 font-urdu">
            تمام مضامین اور حل شدہ نوٹس
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {sectionsConfig.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeCategory === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveCategory(sec.id)}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between relative overflow-hidden group active:scale-95 ${
                  isActive
                    ? 'border-[#2196F3] bg-blue-50/70 shadow-md ring-2 ring-blue-400/30'
                    : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <div>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition bg-gradient-to-tr ${sec.color} text-white shadow`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-xs text-slate-900 leading-tight">
                    {sec.label}
                  </h3>
                  <p className="font-urdu text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {sec.urdu}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-[10px] font-bold ${isActive ? 'text-[#2196F3]' : 'text-slate-500'}`}>
                    {sec.priceTag}
                  </span>
                  <ChevronRight className={`w-3 h-3 ${isActive ? 'text-[#2196F3]' : 'text-slate-300'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Class Level Selector Bar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
        {ALL_CLASSES.map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex-shrink-0 ${
              selectedClass === cls
                ? 'bg-[#2196F3] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Section-Specific In-Line Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder={`Search ${sectionsConfig.find((s) => s.id === activeCategory)?.label} by code, topic, or Urdu...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2196F3] shadow-sm"
        />
      </div>

      {/* Category Custom Views */}
      {activeCategory === 'grammar' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                English Grammar Master Guides
              </h3>
              <p className="text-xs text-slate-600 font-urdu">
                انگلش ٹینسیز کے فارمولے، پہچان اور آسان اردو تشریح
              </p>
            </div>
            <span className="bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 rounded-full">
              Free Access
            </span>
          </div>

          <div className="space-y-3">
            {GRAMMAR_LESSONS.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                      {lesson.category}
                    </span>
                    <h4 className="font-extrabold text-base text-slate-900 mt-1">
                      {lesson.title}
                    </h4>
                    <p className="font-urdu text-sm text-[#1976D2] font-semibold mt-0.5">
                      {lesson.urduTitle}
                    </p>
                  </div>
                </div>

                {lesson.urduIdentification && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs">
                    <p className="font-bold text-amber-900">اردو میں پہچان (Identification):</p>
                    <p className="font-urdu text-sm text-slate-800 mt-1">
                      {lesson.urduIdentification}
                    </p>
                  </div>
                )}

                {lesson.formula && (
                  <div className="bg-slate-900 text-emerald-300 font-mono text-xs p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-sans font-bold uppercase mb-1">
                      Formula Rule:
                    </span>
                    {lesson.formula}
                  </div>
                )}

                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-slate-700">Solved Board Examples:</p>
                  {lesson.examples.map((ex, i) => (
                    <div key={i} className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-800">{ex.english}</span>
                      <span className="font-urdu text-slate-600 text-sm text-right">{ex.urdu}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeCategory === 'vocabulary' ? (
        <div className="space-y-4">
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-teal-950 text-sm">
                High-Frequency English to Urdu Vocabulary
              </h3>
              <p className="text-xs text-teal-700 font-urdu">
                بورڈ امتحانات اور روزمرہ بول چال کے اہم الفاظ مع اردو تلفظ
              </p>
            </div>
            <span className="text-teal-900 font-black text-xs bg-teal-200 px-2 py-1 rounded-full">
              Free Study
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VOCAB_WORDS.map((vocab) => (
              <div
                key={vocab.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-lg text-slate-900">
                      {vocab.english}
                    </h4>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                      {vocab.partOfSpeech} • {vocab.pronunciationUrdu}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-urdu text-lg font-bold text-[#1976D2]">
                      {vocab.urduMeaning}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                  <p className="text-slate-700 font-medium italic">"{vocab.exampleSentence}"</p>
                  <p className="font-urdu text-slate-600 text-right dir-rtl">{vocab.urduSentence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Standard items grid (Assignments, Mazmoon, Stories, Class Notes) */
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-2">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">No items found matching your filters.</p>
              <p className="text-xs text-slate-500">
                You can upload your own custom assignment to get solved for 200 PKR.
              </p>
              <button
                onClick={() => onSelectTab('upload')}
                className="mt-2 bg-[#2196F3] text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Upload & Solve Custom Assignment (200 PKR)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          {item.classLevel}
                        </span>
                        {item.code && (
                          <span className="text-[10px] font-black bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                            Code: {item.code}
                          </span>
                        )}
                      </div>

                      <span className="font-black text-sm text-[#2196F3] flex-shrink-0">
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

                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center space-x-1 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({item.downloadsCount})</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#2196F3] font-bold">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View & Order</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
