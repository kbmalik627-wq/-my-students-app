/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn } from './services/firebaseAuth';
import { EducationalItem, CategoryType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { SectionsTab } from './components/SectionsTab';
import { PricingTab } from './components/PricingTab';
import { PaymentTab } from './components/PaymentTab';
import { UploadTab } from './components/UploadTab';
import { ItemDetailModal } from './components/ItemDetailModal';
import { GoogleDriveSheetsModal } from './components/GoogleDriveSheetsModal';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('assignments');
  const [selectedItem, setSelectedItem] = useState<EducationalItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDriveModal, setShowDriveModal] = useState<boolean>(false);

  useEffect(() => {
    // Initialize Firebase Auth listener with in-memory token management
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
      },
      () => {
        setUser(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleRequestSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
      }
    } catch (err: any) {
      console.warn('Sign-in cancelled or failed:', err);
    }
  };

  const handleSelectCategory = (cat: CategoryType) => {
    setActiveCategory(cat);
    setCurrentTab('sections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent(
      'Assalam-o-Alaikum AW Assignment Work! Mujhe solved assignments / notes chahiye.'
    );
    window.open(`https://wa.me/923267976823?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* App Header */}
      <Header
        user={user}
        onUserChange={setUser}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenDriveModal={() => setShowDriveModal(true)}
        onSelectTab={handleTabChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto">
        {currentTab === 'home' && (
          <HomeTab
            onSelectItem={setSelectedItem}
            onSelectCategory={handleSelectCategory}
            onSelectTab={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {currentTab === 'sections' && (
          <SectionsTab
            initialCategory={activeCategory}
            onSelectItem={setSelectedItem}
            onSelectTab={handleTabChange}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingTab onSelectTab={handleTabChange} />
        )}

        {currentTab === 'payment' && (
          <PaymentTab />
        )}

        {currentTab === 'upload' && (
          <UploadTab
            user={user}
            onRequestSignIn={handleRequestSignIn}
            onSelectTab={handleTabChange}
          />
        )}
      </main>

      {/* Floating WhatsApp Action Button */}
      <button
        onClick={handleFloatingWhatsApp}
        className="fixed bottom-20 right-4 z-40 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition ring-4 ring-emerald-100 group"
        title="Direct WhatsApp Chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs ml-0 group-hover:ml-2">
          Chat on WhatsApp
        </span>
      </button>

      {/* Android Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleTabChange}
      />

      {/* Detail / Solved Reading & Order Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          user={user}
          onSelectTab={handleTabChange}
          onRequestSignIn={handleRequestSignIn}
        />
      )}

      {/* Google Workspace Drive & Sheets Management Modal */}
      {showDriveModal && (
        <GoogleDriveSheetsModal
          user={user}
          onClose={() => setShowDriveModal(false)}
          onRequestSignIn={handleRequestSignIn}
        />
      )}
    </div>
  );
}
