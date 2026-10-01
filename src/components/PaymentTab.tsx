import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  Send, 
  FileCheck2, 
  Upload,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { appendOrderToSheet } from '../services/googleSheetsService';
import { StudentOrder } from '../types';

export const PaymentTab: React.FC = () => {
  const accountNumber = '03267976823';
  const accountTitle = 'AW Assignment Work Official Account';

  const [copied, setCopied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'JazzCash' | 'Easypaisa'>('Easypaisa');
  
  // Verification Form State
  const [studentName, setStudentName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [itemTitle, setItemTitle] = useState('Solved Assignment (300 PKR)');
  const [trxId, setTrxId] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum AW Assignment Work!\nMaine ${accountNumber} par payment send ki hai.\n\n*Name:* ${studentName || 'Student'}\n*Service:* ${itemTitle}\n*Trx ID:* ${trxId || 'Attached in screenshot'}\n\nKindly check screenshot and send me the solved assignment / notes.`
    );
    window.open(`https://wa.me/923267976823?text=${text}`, '_blank');
  };

  const handleOpenEasypaisa = () => {
    // Attempt to open Easypaisa app or web portal
    window.open('easypaisa://', '_blank');
    setTimeout(() => {
      // Fallback hint
    }, 500);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const orderPrice = itemTitle.includes('300') 
      ? 300 
      : itemTitle.includes('50') 
      ? 50 
      : itemTitle.includes('200') 
      ? 200 
      : 300;

    const newOrder: StudentOrder = {
      id: `AW-${Date.now().toString().slice(-6)}`,
      studentName: studentName || 'Student',
      whatsappNumber: whatsappNumber || accountNumber,
      itemTitle: itemTitle,
      classLevel: 'Selected Package',
      price: orderPrice,
      paymentMethod: selectedMethod,
      trxId: trxId || 'Screenshot Attached',
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Try to sync with Google Sheet if connected
    await appendOrderToSheet(newOrder);

    setSubmitting(false);
    setSubmitted(true);

    // Auto-open WhatsApp after 800ms
    setTimeout(() => {
      handleOpenWhatsApp();
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-5 space-y-6 pb-24">
      {/* Official Heading */}
      <div className="text-center space-y-1">
        <span className="bg-blue-100 text-[#1976D2] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Official Payment Gateway
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Payment Integration Screen
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Direct instant payment via JazzCash and Easypaisa with fast delivery.
        </p>
      </div>

      {/* Main Account Details Card */}
      <div className="bg-white rounded-2xl border-2 border-blue-400 shadow-xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] p-4 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-blue-100 font-bold">
              Account Information
            </span>
            <div className="flex items-center space-x-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>100% Verified</span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black mt-2 tracking-wide">
            {accountTitle}
          </h3>
          <p className="text-xs text-blue-100 font-urdu mt-0.5">
            اے ڈبلیو اسائنمنٹ ورک آفیشل اکاؤنٹ
          </p>
        </div>

        {/* Method Toggle Buttons */}
        <div className="grid grid-cols-2 p-3 gap-2 bg-slate-50 border-b border-slate-100">
          <button
            onClick={() => setSelectedMethod('Easypaisa')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              selectedMethod === 'Easypaisa'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
            <span>Easypaisa</span>
          </button>

          <button
            onClick={() => setSelectedMethod('JazzCash')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              selectedMethod === 'JazzCash'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            <span>JazzCash</span>
          </button>
        </div>

        {/* Account Number Display */}
        <div className="p-5 text-center space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Send Payment to this Number ({selectedMethod})
          </p>

          <div className="inline-block bg-blue-50 border-2 border-dashed border-[#2196F3] rounded-2xl px-6 py-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-wider font-mono">
              {accountNumber}
            </span>
          </div>

          {/* Action Buttons required: Copy Number, Open WhatsApp, Open Easypaisa App */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            {/* 1. Copy Number */}
            <button
              onClick={handleCopyNumber}
              className={`w-full py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Number!' : 'Copy Number'}</span>
            </button>

            {/* 2. Open WhatsApp */}
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-3 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp</span>
            </button>

            {/* 3. Open Easypaisa App */}
            <button
              onClick={handleOpenEasypaisa}
              className="w-full py-3 px-3 rounded-xl font-bold text-xs bg-[#2196F3] hover:bg-blue-600 text-white flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Easypaisa App</span>
            </button>
          </div>
        </div>

        {/* Mandatory Message Callout */}
        <div className="bg-amber-500 text-slate-950 p-3.5 text-center font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 shadow-inner">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-slate-900 flex-shrink-0" />
            <span className="uppercase tracking-wide font-black">Important Instruction:</span>
          </div>
          <span className="text-base font-extrabold underline decoration-slate-900 decoration-2">
            "Payment ke baad screenshot WhatsApp par bhejein"
          </span>
          <span className="font-urdu text-sm font-semibold mt-0.5">
            پیمنٹ سینڈ کرنے کے بعد اسکرین شاٹ لازمی واٹس ایپ نمبر پر بھیجیں۔
          </span>
        </div>
      </div>

      {/* Rate Card Quick Reminder */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Payment Pricing Chart
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 bg-blue-50 rounded-lg text-center border border-blue-100">
            <p className="text-slate-500 text-[10px]">Assignment</p>
            <p className="font-black text-[#2196F3] text-sm">300 PKR</p>
          </div>
          <div className="p-2.5 bg-blue-50 rounded-lg text-center border border-blue-100">
            <p className="text-slate-500 text-[10px]">Mazmoon</p>
            <p className="font-black text-[#2196F3] text-sm">50 PKR</p>
          </div>
          <div className="p-2.5 bg-blue-50 rounded-lg text-center border border-blue-100">
            <p className="text-slate-500 text-[10px]">Story</p>
            <p className="font-black text-[#2196F3] text-sm">50 PKR</p>
          </div>
          <div className="p-2.5 bg-amber-50 rounded-lg text-center border border-amber-200">
            <p className="text-slate-500 text-[10px]">Upload & Solve</p>
            <p className="font-black text-amber-600 text-sm">200 PKR</p>
          </div>
        </div>
      </div>

      {/* Online Verification Form */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Instant Order & Screenshot Verification
            </h3>
            <p className="text-xs text-slate-500">
              Submit your Trx ID here. It will automatically log to Google Sheets and notify WhatsApp.
            </p>
          </div>
          <FileCheck2 className="w-5 h-5 text-[#2196F3]" />
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center space-y-2 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-900 text-sm">Payment Details Logged!</h4>
            <p className="text-xs text-emerald-700">
              Your order is recorded and opening WhatsApp for direct delivery.
            </p>
            <button
              onClick={handleOpenWhatsApp}
              className="mt-2 bg-emerald-600 text-white text-xs font-bold py-2 px-4 rounded-lg inline-flex items-center gap-1.5 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Screenshot on WhatsApp Now</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitVerification} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Student Name / طالب علم کا نام *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ali"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Your WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="03001234567"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Select Item / Service
              </label>
              <select
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              >
                <option value="Solved Assignment - 300 PKR">Solved Assignment - 300 PKR</option>
                <option value="Urdu / English Mazmoon - 50 PKR">Urdu / English Mazmoon - 50 PKR</option>
                <option value="Story Writing with Moral - 50 PKR">Story Writing with Moral - 50 PKR</option>
                <option value="Upload & Solve Custom Assignment - 200 PKR">
                  Upload & Solve Custom Assignment - 200 PKR
                </option>
                <option value="All Classes Complete Package - 500 PKR">
                  All Classes Complete Package - 500 PKR
                </option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Transaction ID (TID / Trx ID)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1284792190"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Attach Payment Screenshot (Optional)
                </label>
                <label className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-600">
                  <Upload className="w-3.5 h-3.5" />
                  <span className="truncate">
                    {screenshotPreview ? 'Screenshot Attached ✓' : 'Select Screenshot'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {screenshotPreview && (
              <div className="relative inline-block mt-2">
                <img
                  src={screenshotPreview}
                  alt="Receipt Preview"
                  className="h-20 w-auto rounded border border-slate-300 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setScreenshotPreview(null)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                >
                  ✕
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2196F3] hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition active:scale-95 disabled:opacity-50 mt-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Recording Order...' : 'Submit & Open WhatsApp Confirmation'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Customer Support Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center space-x-3 text-xs text-slate-600">
        <PhoneCall className="w-5 h-5 text-[#2196F3] flex-shrink-0" />
        <div>
          <p className="font-bold text-slate-800">Need Immediate Help with Payment?</p>
          <p className="text-[11px]">
            Call or WhatsApp our support directly at <span className="font-bold text-[#2196F3]">03267976823</span>. Timings: 9:00 AM to 11:00 PM (Monday to Sunday).
          </p>
        </div>
      </div>
    </div>
  );
};
