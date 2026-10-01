import React, { useState } from 'react';
import { EducationalItem } from '../types';
import { User } from 'firebase/auth';
import { uploadFileToDrive } from '../services/googleDriveService';
import { 
  X, 
  Download, 
  Cloud, 
  MessageCircle, 
  Copy, 
  Check, 
  CreditCard, 
  FileText, 
  CheckCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ItemDetailModalProps {
  item: EducationalItem | null;
  onClose: () => void;
  user: User | null;
  onSelectTab: (tab: string) => void;
  onRequestSignIn: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  user,
  onSelectTab,
  onRequestSignIn,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSavingToDrive, setIsSavingToDrive] = useState(false);
  const [driveSaveSuccess, setDriveSaveSuccess] = useState(false);
  const [driveFileUrl, setDriveFileUrl] = useState<string | null>(null);

  if (!item) return null;

  const handleCopy = () => {
    const text = `${item.title}\n\n${item.description}\n\n${item.previewContent}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToDrive = async () => {
    if (!user) {
      onRequestSignIn();
      return;
    }

    setIsSavingToDrive(true);
    try {
      const content = `AW Assignment Work - Solved Notes
=======================================
Title: ${item.title}
Urdu Title: ${item.urduTitle || ''}
Class / Level: ${item.classLevel}
Subject: ${item.subject}
Price: ${item.price} PKR
Website: AW Assignment Work Pakistan (03267976823)

CONTENT / PREVIEW:
---------------------------------------
${item.previewContent}

Description:
${item.description}
`;

      const safeFileName = `${item.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_AW.txt`;
      const uploaded = await uploadFileToDrive(safeFileName, content, 'text/plain');
      setDriveSaveSuccess(true);
      if (uploaded.webViewLink) {
        setDriveFileUrl(uploaded.webViewLink);
      }
    } catch (err: any) {
      console.error('Failed to save to Drive:', err);
      alert('Google Drive save note: ' + (err.message || 'Please make sure Google Drive permission is granted.'));
    } finally {
      setIsSavingToDrive(false);
    }
  };

  const handleOrderWhatsApp = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum AW Assignment Work!\nMujhe ye assignment / notes chahiye:\n\n*Item:* ${item.title}\n*Code/Subject:* ${item.code || item.subject}\n*Class:* ${item.classLevel}\n*Price:* ${item.price} PKR\n\nKindly send JazzCash / Easypaisa payment details & complete file.`
    );
    window.open(`https://wa.me/923267976823?text=${text}`, '_blank');
  };

  const handleGoToPayment = () => {
    onClose();
    onSelectTab('payment');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#1976D2] to-[#2196F3] text-white p-4 flex items-start justify-between">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {item.classLevel}
              </span>
              {item.code && (
                <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded-full">
                  Code: {item.code}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold leading-snug">{item.title}</h2>
            {item.urduTitle && (
              <p className="text-blue-100 font-urdu text-sm mt-1 dir-rtl text-right">
                {item.urduTitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Price & Guarantee Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-900">Official Price:</p>
              <div className="text-2xl font-black text-[#2196F3] flex items-baseline gap-1">
                {item.price > 0 ? `${item.price} PKR` : 'FREE NOTES'}
                {item.price > 0 && <span className="text-xs font-normal text-slate-500">/ each</span>}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> 100% Solved & Accurate
              </span>
              <p className="text-[11px] text-slate-500 mt-1">Available Typed PDF & Handwritten</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Overview & Details
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {item.description}
            </p>
          </div>

          {/* Solved Sample / Reading Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#2196F3]" />
                Preview Sample & Solution
              </h3>
              <button
                onClick={handleCopy}
                className="text-xs text-[#2196F3] hover:text-blue-700 flex items-center gap-1 font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <div className={`p-3.5 rounded-xl border border-slate-200 bg-slate-900 text-slate-100 text-xs sm:text-sm font-mono whitespace-pre-wrap max-h-56 overflow-y-auto leading-relaxed ${
              item.language === 'Urdu' || item.category === 'mazmoon' ? 'font-urdu dir-rtl text-right text-base leading-loose font-normal' : ''
            }`}>
              {item.previewContent}
            </div>
          </div>

          {/* Google Drive Status Notification */}
          {driveSaveSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-emerald-600" />
                <span>Saved successfully to your Google Drive!</span>
              </div>
              {driveFileUrl && (
                <a
                  href={driveFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline text-emerald-700"
                >
                  Open in Drive
                </a>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
          {/* Main Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleOrderWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get on WhatsApp</span>
            </button>

            <button
              onClick={handleGoToPayment}
              className="w-full bg-[#2196F3] hover:bg-blue-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition active:scale-95"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay JazzCash/Easypaisa</span>
            </button>
          </div>

          {/* Google Drive Action */}
          <button
            onClick={handleSaveToDrive}
            disabled={isSavingToDrive}
            className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Cloud className="w-4 h-4 text-[#4285F4]" />
            <span>
              {isSavingToDrive
                ? 'Saving to Google Drive...'
                : user
                ? 'Save Copy to My Google Drive'
                : 'Sign in to Save Copy to Google Drive'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
