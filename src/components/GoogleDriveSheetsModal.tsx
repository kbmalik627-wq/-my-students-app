import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  X, 
  Cloud, 
  FileSpreadsheet, 
  FileText, 
  ExternalLink, 
  Trash2, 
  RefreshCw, 
  Plus, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  listAppDriveFiles, 
  deleteDriveFile, 
  DriveUploadedFile 
} from '../services/googleDriveService';
import { 
  fetchOrdersFromSheet, 
  getOrCreateOrderSpreadsheet, 
  SheetEntry 
} from '../services/googleSheetsService';

interface GoogleDriveSheetsModalProps {
  user: User | null;
  onClose: () => void;
  onRequestSignIn: () => void;
}

export const GoogleDriveSheetsModal: React.FC<GoogleDriveSheetsModalProps> = ({
  user,
  onClose,
  onRequestSignIn,
}) => {
  const [activeTab, setActiveTab] = useState<'drive' | 'sheets'>('drive');
  const [driveFiles, setDriveFiles] = useState<DriveUploadedFile[]>([]);
  const [sheetOrders, setSheetOrders] = useState<SheetEntry[]>([]);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const files = await listAppDriveFiles();
      setDriveFiles(files);

      const orders = await fetchOrdersFromSheet();
      setSheetOrders(orders);

      const currentSheetId = localStorage.getItem('aw_assignment_spreadsheet_id');
      if (currentSheetId) {
        setSpreadsheetId(currentSheetId);
      }
    } catch (err: any) {
      console.warn('Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSheet = async () => {
    setLoading(true);
    try {
      const id = await getOrCreateOrderSpreadsheet();
      setSpreadsheetId(id);
      setSyncMessage('Google Sheet created and connected successfully!');
      setTimeout(() => setSyncMessage(null), 3500);
      loadData();
    } catch (err: any) {
      alert('Failed to create Google Sheet: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (file: DriveUploadedFile) => {
    try {
      const success = await deleteDriveFile(file.id, file.name);
      if (success) {
        setDriveFiles((prev) => prev.filter((f) => f.id !== file.id));
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete file from Drive');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-[#2196F3] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base">Google Workspace Integration</h2>
              <p className="text-[11px] text-blue-100">Google Drive & Google Sheets Manager</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status Bar */}
        {user ? (
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 truncate">
              {user.photoURL && (
                <img src={user.photoURL} alt="Avatar" className="w-5 h-5 rounded-full" />
              )}
              <span className="font-semibold text-slate-700 truncate">{user.email}</span>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="text-[#2196F3] hover:text-blue-700 flex items-center gap-1 font-bold disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        ) : (
          <div className="bg-blue-50 border-b border-blue-200 p-4 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-[#2196F3] mx-auto" />
            <p className="font-bold text-slate-800 text-sm">Connect Google Account</p>
            <p className="text-xs text-slate-600">
              Sign in with Google to automatically backup your solved notes to Google Drive and keep track of assignment orders in Google Sheets.
            </p>
            <button
              onClick={onRequestSignIn}
              className="mt-2 bg-[#2196F3] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow inline-flex items-center gap-2"
            >
              <Cloud className="w-4 h-4" />
              <span>Sign in with Google</span>
            </button>
          </div>
        )}

        {/* Tab switchers if user is logged in */}
        {user && (
          <>
            <div className="grid grid-cols-2 p-2 bg-slate-100 border-b border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('drive')}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'drive'
                    ? 'bg-white text-[#2196F3] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cloud className="w-4 h-4" />
                <span>Google Drive ({driveFiles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('sheets')}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'sheets'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Google Sheets Log ({sheetOrders.length})</span>
              </button>
            </div>

            {/* Notification message */}
            {syncMessage && (
              <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2 border-b border-emerald-200 flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{syncMessage}</span>
              </div>
            )}

            {/* Tab content */}
            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              {activeTab === 'drive' ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Files Stored in your Google Drive
                    </h3>
                  </div>

                  {driveFiles.length === 0 ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-xs text-slate-500 space-y-1">
                      <Cloud className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <p className="font-semibold text-slate-700">No files saved yet</p>
                      <p>Open any Solved Assignment or upload a file and click "Save Copy to My Google Drive".</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {driveFiles.map((file) => (
                        <div
                          key={file.id}
                          className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm hover:border-blue-200 text-xs"
                        >
                          <div className="flex items-center space-x-2.5 truncate mr-2">
                            <FileText className="w-5 h-5 text-[#2196F3] flex-shrink-0" />
                            <div className="truncate">
                              <p className="font-bold text-slate-800 truncate">{file.name}</p>
                              <p className="text-[10px] text-slate-400">
                                {file.createdTime ? new Date(file.createdTime).toLocaleDateString() : 'Recent'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 flex-shrink-0">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-[#2196F3] hover:bg-blue-50 rounded-lg"
                                title="Open in Google Drive"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteFile(file)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                              title="Delete from Google Drive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Sheets Tab */
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Student Orders & Solved Log
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Track your assignment orders in a live Google Sheet.
                      </p>
                    </div>

                    {spreadsheetId ? (
                      <a
                        href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Sheet</span>
                      </a>
                    ) : (
                      <button
                        onClick={handleCreateSheet}
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create Sheet</span>
                      </button>
                    )}
                  </div>

                  {sheetOrders.length === 0 ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-xs text-slate-500 space-y-1">
                      <FileSpreadsheet className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                      <p className="font-semibold text-slate-700">No orders logged yet</p>
                      <p>When you submit a payment receipt or upload an assignment, it will sync automatically to Google Sheets.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {sheetOrders.map((ord, i) => (
                        <div
                          key={i}
                          className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{ord.itemTitle}</span>
                            <span className="font-black text-[#2196F3]">{ord.amount} PKR</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>{ord.studentName} ({ord.classLevel})</span>
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                              {ord.status}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                            <span>Method: {ord.paymentMethod}</span>
                            <span>{ord.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-2.5 rounded-xl transition"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
