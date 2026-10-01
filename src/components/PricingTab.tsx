import React from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  FileCheck, 
  HelpCircle,
  MessageCircle,
  UploadCloud,
  BookOpen
} from 'lucide-react';

interface PricingTabProps {
  onSelectTab: (tab: string) => void;
}

export const PricingTab: React.FC<PricingTabProps> = ({ onSelectTab }) => {
  const pricingPlans = [
    {
      id: 'assignment',
      name: 'Solved Assignment',
      urdu: 'مکمل حل شدہ اسائنمنٹ',
      price: '300 PKR',
      unit: 'each assignment',
      color: 'border-blue-500 bg-blue-50/40',
      badge: 'Most Popular',
      badgeColor: 'bg-[#2196F3] text-white',
      features: [
        'AIOU All Codes (Autumn & Spring)',
        'Matric, FA, FSc, BA, B.Ed, M.Ed',
        'Available in Typed PDF & Handwritten',
        '100% Plagiarism Free & High Marks Guaranteed',
        'Instant delivery on WhatsApp & Google Drive',
      ],
      actionText: 'Get Solved Assignment',
      actionTab: 'sections',
    },
    {
      id: 'upload',
      name: 'Upload & Solve Service',
      urdu: 'اپنی اسائنمنٹ اپلوڈ کر کے حل کروائیں',
      price: '200 PKR',
      unit: 'per uploaded assignment',
      color: 'border-amber-500 bg-amber-50/50',
      badge: 'Custom Solution',
      badgeColor: 'bg-amber-500 text-slate-950 font-black',
      features: [
        'Upload your questions / paper photo',
        'Solved by subject specialists',
        'Turnaround within 12 - 24 hours',
        'Step-by-step numericals & answers',
        'Unlimited revisions if needed',
      ],
      actionText: 'Upload & Solve - 200 PKR',
      actionTab: 'upload',
    },
    {
      id: 'mazmoon',
      name: 'Mazmoon / Essay Writing',
      urdu: 'مضمون نویسی (اردو اور انگلش)',
      price: '50 PKR',
      unit: 'per essay',
      color: 'border-emerald-500 bg-emerald-50/40',
      badge: 'Budget Friendly',
      badgeColor: 'bg-emerald-600 text-white',
      features: [
        'High-scoring Urdu & English Mazameen',
        'Relevant Ashaar (اشعار) & Quotes included',
        'Heading-wise structured layout',
        'All standard board topics covered',
        'Downloadable & easy to memorize',
      ],
      actionText: 'View All Mazameen',
      actionTab: 'sections',
    },
    {
      id: 'story',
      name: 'Story Writing',
      urdu: 'کہانی نویسی مع اخلاقی سبق',
      price: '50 PKR',
      unit: 'per story',
      color: 'border-purple-500 bg-purple-50/40',
      badge: 'Standard Format',
      badgeColor: 'bg-purple-600 text-white',
      features: [
        'Famous board exam stories',
        'Bilingual (English with Urdu translation)',
        'Clear Moral Lessons (اخلاقی سبق)',
        'Vocabulary & difficult word meanings',
        'Ready for 9th, 10th & Middle exams',
      ],
      actionText: 'View All Stories',
      actionTab: 'sections',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 space-y-6 pb-24">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="bg-blue-100 text-[#1976D2] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          Official Transparent Pricing
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Affordable Rates for Pakistani Students
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          No hidden fees. Verified solutions for AIOU, Punjab University, BISE boards across Pakistan.
        </p>
      </div>

      {/* Main 4 Pricing Cards Required */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl border-2 ${plan.color} p-5 shadow-sm hover:shadow-md transition relative flex flex-col justify-between`}
          >
            {plan.badge && (
              <span
                className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${plan.badgeColor}`}
              >
                {plan.badge}
              </span>
            )}

            <div>
              <h3 className="font-extrabold text-lg text-slate-900">{plan.name}</h3>
              <p className="font-urdu text-xs text-slate-600 mb-3">{plan.urdu}</p>

              <div className="flex items-baseline space-x-1.5 my-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {plan.price}
                </span>
                <span className="text-xs font-semibold text-slate-500">/{plan.unit}</span>
              </div>

              <div className="border-t border-slate-200/80 my-3" />

              <ul className="space-y-2 text-xs text-slate-700">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200/60 flex flex-col gap-2">
              <button
                onClick={() => onSelectTab(plan.actionTab)}
                className="w-full bg-[#2196F3] hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition active:scale-95"
              >
                <span>{plan.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelectTab('payment')}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-1.5 px-3 rounded-lg text-[11px] text-center"
              >
                Pay via JazzCash / Easypaisa (03267976823)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Free Notes Notice */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">
              English Grammar & Complete Class Notes = 100% FREE
            </h4>
            <p className="text-xs text-slate-500">
              Read all 12 tenses, vocabulary, active/passive voice, and basic notes online at zero cost.
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectTab('sections')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex-shrink-0"
        >
          Read Free
        </button>
      </div>

      {/* Assurance Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2196F3]" />
          Our 100% Student Guarantee
        </h4>
        <p>
          AW Assignment Work is trusted by thousands of Pakistani students. Payments are received through our official account <strong>03267976823</strong> (JazzCash & Easypaisa). Delivery is sent via WhatsApp and Google Drive immediately upon receipt verification.
        </p>
      </div>
    </div>
  );
};
