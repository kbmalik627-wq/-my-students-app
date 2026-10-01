import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { 
  UploadCloud, 
  Camera, 
  Image, 
  FileText, 
  CheckCircle, 
  MessageCircle, 
  Cloud, 
  Send, 
  AlertTriangle,
  Sparkles,
  Check
} from 'lucide-react';
import { uploadFileToDrive } from '../services/googleDriveService';
import { appendOrderToSheet } from '../services/googleSheetsService';
import { StudentOrder } from '../types';

interface UploadTabProps {
  user: User | null;
  onRequestSignIn: () => void;
  onSelectTab: (tab: string) => void;
}

export const UploadTab: React.FC<UploadTabProps> = ({
  user,
  onRequestSignIn,
  onSelectTab,
}) => {
  const [studentName, setStudentName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [classLevel, setClassLevel] = useState('AIOU (Allama Iqbal Open University)');
  const [courseCode, setCourseCode] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedToDriveUrl, setSavedToDriveUrl] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !notes.trim()) {
      alert('Please upload an assignment file or write questions in the notes box.');
      return;
    }

    setIsSubmitting(true);

    let driveLink = '';
    // 1. If user is signed in with Google, upload to Google Drive
    if (user && selectedFile) {
      try {
        const safeName = `Assignment_200PKR_${studentName || 'Student'}_${selectedFile.name}`;
        const uploaded = await uploadFileToDrive(safeName, selectedFile, selectedFile.type || 'application/octet-stream');
        if (uploaded.webViewLink) {
          driveLink = uploaded.webViewLink;
          setSavedToDriveUrl(driveLink);
        }
      } catch (err) {
        console.warn('Google Drive direct upload notice:', err);
      }
    }

    // 2. Log into Google Sheets
    const order: StudentOrder = {
      id: `SOLVE-${Date.now().toString().slice(-6)}`,
      studentName: studentName || 'Student',
      whatsappNumber: whatsappNumber || '03267976823',
      itemTitle: `Upload & Solve (${courseCode || classLevel})`,
      classLevel: classLevel,
      price: 200,
      paymentMethod: 'Easypaisa',
      trxId: 'Pending / WhatsApp Verification',
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      driveFileUrl: driveLink,
      fileNotes: notes,
    };

    await appendOrderToSheet(order);

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleOpenWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum AW Assignment Work!\nMaine "Upload & Solve (200 PKR)" service ke liye request submit ki hai:\n\n*Name:* ${studentName}\n*WhatsApp:* ${whatsappNumber}\n*Class / University:* ${classLevel}\n*Subject / Code:* ${courseCode}\n*Deadline:* ${deadline || 'Urgent'}\n*Questions/Notes:* ${notes || 'File uploaded'}\n${savedToDriveUrl ? `*Google Drive File:* ${savedToDriveUrl}\n` : ''}\nMaine assignment ki pictures / document ready rakha hai. Please solve kar dein.`
    );
    window.open(`https://wa.me/923267976823?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-5 space-y-6 pb-24">
      {/* Top Banner with exact requested button/title */}
      <div className="bg-gradient-to-r from-[#1976D2] to-[#2196F3] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase shadow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Special Student Offer</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
          Apni Assignment Upload Karke Hal Karwain
        </h2>

        <div className="inline-block bg-white text-[#1976D2] font-black text-lg px-4 py-1 rounded-xl shadow-md">
          Price: 200 PKR Only
        </div>

        <p className="text-xs sm:text-sm text-blue-100 font-urdu dir-rtl">
          اپنی اسائنمنٹ، سوالنامہ یا پیپر کی تصویر کھینچ کر اپلوڈ کریں اور ہماری تجربہ کار ٹیم سے 100٪ درست حل کروائیں۔
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-white rounded-2xl border-2 border-emerald-400 p-6 shadow-xl text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            Assignment Details Submitted Successfully!
          </h3>

          <p className="text-xs sm:text-sm text-slate-600">
            Aapki assignment ki request hamaray system me register ho chuki hai. Final verification aur solving start karne ke liye abhi WhatsApp par connect karein.
          </p>

          {savedToDriveUrl && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-[#2196F3]" />
                File saved to your Google Drive!
              </span>
              <a
                href={savedToDriveUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline text-[#2196F3]"
              >
                View
              </a>
            </div>
          )}

          <div className="pt-2 space-y-2">
            <button
              onClick={handleOpenWhatsAppChat}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send File & Details to WhatsApp (03267976823)</span>
            </button>

            <button
              onClick={() => onSelectTab('payment')}
              className="w-full bg-[#2196F3] hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <span>Pay 200 PKR via JazzCash / Easypaisa</span>
            </button>

            <button
              onClick={() => setIsSuccess(false)}
              className="text-xs text-slate-500 underline pt-2 block mx-auto"
            >
              Upload Another Assignment
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-md space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#2196F3]" />
              Upload Question Paper / Questions
            </h3>
            <p className="text-xs text-slate-500">
              Take a photo using camera or choose from gallery / PDF.
            </p>
          </div>

          {/* Upload Area */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Assignment File / Images *
            </label>

            <div className="grid grid-cols-2 gap-2">
              {/* Camera Button */}
              <label className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 border-dashed border-[#2196F3] bg-blue-50/50 hover:bg-blue-50 cursor-pointer transition text-center">
                <Camera className="w-6 h-6 text-[#2196F3]" />
                <span className="text-xs font-bold text-slate-700">Use Camera</span>
                <span className="text-[10px] text-slate-500">Take clear photo</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Gallery / Document Button */}
              <label className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer transition text-center">
                <Image className="w-6 h-6 text-slate-600" />
                <span className="text-xs font-bold text-slate-700">Gallery / PDF</span>
                <span className="text-[10px] text-slate-500">Images, PDF, Doc</span>
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Selected File Feedback */}
            {selectedFile && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="w-4 h-4 text-[#2196F3] flex-shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">{selectedFile.name}</span>
                  <span className="text-[10px] text-slate-400">
                    ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setFilePreview(null);
                  }}
                  className="text-red-500 font-bold px-2 py-1 hover:bg-red-50 rounded"
                >
                  ✕
                </button>
              </div>
            )}

            {filePreview && (
              <div className="mt-2 text-center">
                <img
                  src={filePreview}
                  alt="Assignment Preview"
                  className="max-h-48 rounded-xl border border-slate-300 mx-auto object-contain shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Student Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Your Full Name / نام *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Asad Mehmood"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                WhatsApp Number *
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Class / University *
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              >
                <option value="AIOU (Allama Iqbal Open University)">AIOU (Allama Iqbal Open University)</option>
                <option value="Punjab University (PU)">Punjab University (PU)</option>
                <option value="B.Ed & M.Ed">B.Ed & M.Ed</option>
                <option value="Matric (9th & 10th)">Matric (9th & 10th)</option>
                <option value="FA / FSc (11th & 12th)">FA / FSc (11th & 12th)</option>
                <option value="BA / BSc / Associate Degree">BA / BSc / Associate Degree</option>
                <option value="BS / Masters">BS / Masters</option>
                <option value="Middle (6th-8th)">Middle (6th-8th)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Course Code or Subject
              </label>
              <input
                type="text"
                placeholder="e.g. 1423, 8601, Physics"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">
              Submission Deadline / آخری تاریخ
            </label>
            <input
              type="text"
              placeholder="e.g. Urgent (within 24 hours) or 15 October"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">
              Assignment Questions / Specific Instructions (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="You can type or paste assignment questions or instructions here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
            />
          </div>

          {/* Google Workspace Drive Sync Option */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-[#4285F4]" />
              <div>
                <p className="font-bold text-slate-800">Google Drive Backup</p>
                <p className="text-[11px] text-slate-500">
                  {user
                    ? `Will be backed up to ${user.email}'s Drive`
                    : 'Sign in to auto-save file in your Google Drive'}
                </p>
              </div>
            </div>
            {!user && (
              <button
                type="button"
                onClick={onRequestSignIn}
                className="bg-white border border-slate-300 hover:bg-slate-100 font-semibold px-2.5 py-1 rounded-lg text-slate-700 text-[11px]"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2196F3] hover:bg-blue-600 text-white font-black text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSubmitting
                ? 'Uploading & Registering...'
                : 'Apni Assignment Upload Karke Hal Karwain - 200 PKR'}
            </span>
          </button>
        </form>
      )}
    </div>
  );
};
