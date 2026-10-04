/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Menu,
  Search,
  Home,
  User,
  GraduationCap,
  ClipboardEdit,
  BarChart2,
  DollarSign,
  Bell,
  Table,
  Power,
  ChevronDown,
  Link2,
  Settings,
  X,
  ExternalLink,
  Moon,
  Sun,
} from 'lucide-react';
import {
  CULogo,
  LibraryBooksIcon,
  GmailMIcon,
  MoodleIcon,
  OpenBookIcon,
} from './components/CuBrandIcons';
import { Language } from './data/cuData';
import { TimetableCalendarView } from './components/TimetableCalendarView';
import { StudentProfileView } from './components/StudentProfileView';
import { StudentLoginView } from './components/StudentLoginView';
import { CuPublicSiteView } from './components/CuPublicSiteView';
import { PortalSecondaryViews } from './components/PortalSecondaryViews';

type AppScreenMode = 'student_portal' | 'student_login' | 'cu_public' | 'programs_auth';

type PortalSection =
  | 'home'
  | 'profile'
  | 'current_semester'
  | 'registration'
  | 'signs'
  | 'finance'
  | 'announcements'
  | 'surveys';

export default function App() {
  const [screenMode, setScreenMode] = useState<AppScreenMode>('student_portal');
  const [activeSection, setActiveSection] = useState<PortalSection>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [semesterSubOpen, setSemesterSubOpen] = useState(false);
  const [registrationSubOpen, setRegistrationSubOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [gearMenuOpen, setGearMenuOpen] = useState(false);
  const [quickPopup, setQuickPopup] = useState<
    null | 'library' | 'gmail' | 'moodle' | 'guide' | 'links'
  >(null);

  const isKa = language === 'ka';

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ka' : 'en'));
  };

  // Screen 1: Dark Login Screen (Video 2: 00:00 - 00:06)
  if (screenMode === 'student_login') {
    return (
      <StudentLoginView
        language={language}
        onToggleLanguage={toggleLanguage}
        onLoginSuccess={() => {
          setScreenMode('student_portal');
          setActiveSection('home');
        }}
        onOpenPublicSite={() => setScreenMode('cu_public')}
      />
    );
  }

  // Screen 2 & 3: cu.edu.ge Main Website & programs.cu.edu.ge Authorization (Video 1: 00:07 - 00:20)
  if (screenMode === 'cu_public' || screenMode === 'programs_auth') {
    return (
      <CuPublicSiteView
        initialMode={screenMode === 'programs_auth' ? 'programs_auth' : 'cu_home'}
        language={language}
        onToggleLanguage={toggleLanguage}
        onEnterStudentPortal={() => {
          setScreenMode('student_portal');
          setActiveSection('home');
        }}
        onEnterStudentLogin={() => setScreenMode('student_login')}
      />
    );
  }

  // Navigation items matching Video 1 (00:26 - 00:27)
  const navItems: Array<{
    id: PortalSection;
    labelEn: string;
    labelKa: string;
    icon: React.ReactNode;
    hasSubmenu?: boolean;
  }> = [
    {
      id: 'home',
      labelEn: 'Home',
      labelKa: 'მთავარი',
      icon: <Home className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'profile',
      labelEn: 'Profile',
      labelKa: 'პროფილი',
      icon: <User className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'current_semester',
      labelEn: 'Current semester',
      labelKa: 'მიმდინარე სემესტრი',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
      hasSubmenu: true,
    },
    {
      id: 'registration',
      labelEn: 'Registration',
      labelKa: 'რეგისტრაცია',
      icon: <ClipboardEdit className="w-4 h-4 shrink-0" />,
      hasSubmenu: true,
    },
    {
      id: 'signs',
      labelEn: 'Signs',
      labelKa: 'ნიშნები',
      icon: <BarChart2 className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'finance',
      labelEn: 'Finance',
      labelKa: 'ფინანსები',
      icon: <DollarSign className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'announcements',
      labelEn: 'Announcements and notices',
      labelKa: 'განცხადებები და ცნობები',
      icon: <Bell className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'surveys',
      labelEn: 'Surveys and forms',
      labelKa: 'კითხვარები და ანკეტები',
      icon: <Table className="w-4 h-4 shrink-0" />,
    },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (!sidebarSearch.trim()) return true;
    const q = sidebarSearch.toLowerCase();
    return (
      item.labelEn.toLowerCase().includes(q) || item.labelKa.toLowerCase().includes(q)
    );
  });

  const handleSelectSection = (id: PortalSection) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors ${
        darkMode ? 'bg-[#121417] text-[#e9ecef]' : 'bg-[#f8f9fa] text-[#212529]'
      }`}
    >
      {/* LEFT SIDEBAR NAVIGATION DRAWER (Exact Carbon Copy of Video 1 at 00:26 - 00:27) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <aside
            className={`w-[265px] h-full flex flex-col border-r shadow-2xl z-20 overflow-y-auto ${
              darkMode
                ? 'bg-[#1b1e21] border-[#32383e] text-[#e9ecef]'
                : 'bg-white border-[#dedede] text-[#212529]'
            }`}
          >
            {/* Top Student Header inside Sidebar */}
            <div className="p-3.5 flex items-center gap-3">
              <div className="shrink-0">
                <CULogo size={40} showText={false} />
              </div>
              <div className="min-w-0 leading-snug">
                <button
                  type="button"
                  onClick={() => handleSelectSection('profile')}
                  className="text-[13.5px] font-medium text-[#4183c4] hover:underline block truncate cursor-pointer"
                >
                  Sajin Kurattiparambil Saji
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSection('profile')}
                  className="text-[12.5px] text-[#4183c4] hover:underline block truncate cursor-pointer"
                >
                  s_saji@cu.edu.ge
                </button>
              </div>
            </div>

            {/* Search Input Box inside Sidebar */}
            <div className="px-3.5 pb-3">
              <div className="relative">
                <input
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder={isKa ? 'ძებნა ...' : 'Search ...'}
                  className={`w-full h-[34px] pl-3 pr-8 text-[13px] rounded-[4px] border focus:outline-none ${
                    darkMode
                      ? 'bg-[#121417] border-[#383f45] text-white placeholder-[#6c757d]'
                      : 'bg-white border-[#dedede] text-[#212529] placeholder-[#999999]'
                  }`}
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Navigation Menu Items */}
            <nav className="flex-1 px-2 space-y-0.5 text-[13.5px]">
              {filteredNavItems.map((item) => {
                const isActive = activeSection === item.id;
                const isSubExpanded =
                  (item.id === 'current_semester' && semesterSubOpen) ||
                  (item.id === 'registration' && registrationSubOpen);

                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.id === 'current_semester') {
                          setSemesterSubOpen((prev) => !prev);
                          setActiveSection('current_semester');
                        } else if (item.id === 'registration') {
                          setRegistrationSubOpen((prev) => !prev);
                          setActiveSection('registration');
                        } else {
                          handleSelectSection(item.id);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#1b1c1d] text-white font-semibold'
                          : darkMode
                            ? 'text-[#ced4da] hover:bg-[#25292e]'
                            : 'text-[#333333] hover:bg-[#f2f2f2]'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        {item.icon}
                        <span className="truncate">
                          {isKa ? item.labelKa : item.labelEn}
                        </span>
                      </span>
                      {item.hasSubmenu && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            isSubExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>

                    {/* Optional Submenu items for Current Semester & Registration */}
                    {item.id === 'current_semester' && semesterSubOpen && (
                      <div className="pl-9 pr-2 py-1 space-y-1 text-[12.5px]">
                        <button
                          type="button"
                          onClick={() => handleSelectSection('current_semester')}
                          className="w-full text-left py-1.5 text-[#4183c4] hover:underline cursor-pointer block"
                        >
                          {isKa ? 'საგნები და შეფასებები' : 'Courses & Evaluations'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectSection('home')}
                          className="w-full text-left py-1.5 text-[#6c757d] hover:text-[#2185d0] cursor-pointer block"
                        >
                          {isKa ? 'ცხრილი (Timetable)' : 'Schedule (Timetable)'}
                        </button>
                      </div>
                    )}

                    {item.id === 'registration' && registrationSubOpen && (
                      <div className="pl-9 pr-2 py-1 space-y-1 text-[12.5px]">
                        <button
                          type="button"
                          onClick={() => handleSelectSection('registration')}
                          className="w-full text-left py-1.5 text-[#4183c4] hover:underline cursor-pointer block"
                        >
                          {isKa ? 'საგნების არჩევა' : 'Course Selection (Fall 2026)'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Log Out Button in Red matching Video 1 (00:26 - 00:27) */}
              <div className="pt-2 mt-2 border-t border-gray-100 dark:border-[#2c3136]">
                <button
                  type="button"
                  onClick={() => {
                    setSidebarOpen(false);
                    setScreenMode('student_login');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-[#db2828] hover:bg-[#db2828]/10 font-medium transition-colors cursor-pointer"
                >
                  <Power className="w-4 h-4 shrink-0 text-[#db2828]" />
                  <span>{isKa ? 'გასვლა' : 'Log out'}</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Backdrop overlay */}
          <div
            className="flex-1 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* TOP NAVIGATION BAR (Exact Carbon Copy of student.cu.edu.ge in Screenshot & Videos) */}
      <header
        className={`h-[48px] w-full px-3 sm:px-4 border-b flex items-center justify-between sticky top-0 z-30 transition-colors ${
          darkMode
            ? 'bg-[#1b1e21] border-[#32383e]'
            : 'bg-white border-[#e0e1e2]'
        }`}
      >
        {/* Left: Blue Hamburger Menu Button + Quick View Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="bg-[#2185d0] hover:bg-[#1678c2] active:bg-[#1a69a4] text-white w-[36px] h-[30px] rounded-[4px] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Right: Top Bar Icons (Library, Gmail, Moodle, Open Book, Link, Language, Gear) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* 1. Library Bookshelf Icon */}
          <button
            type="button"
            onClick={() => setQuickPopup('library')}
            title="CU e-Library"
            className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <LibraryBooksIcon className="w-[17px] h-[17px]" />
          </button>

          {/* 2. Gmail 'M' Icon */}
          <button
            type="button"
            onClick={() => setQuickPopup('gmail')}
            title="CU Student Mail (s_saji@cu.edu.ge)"
            className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <GmailMIcon className="w-[17px] h-[17px]" />
          </button>

          {/* 3. Moodle 'm' Icon */}
          <button
            type="button"
            onClick={() => setQuickPopup('moodle')}
            title="CU Moodle Learning Management System"
            className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <MoodleIcon className="w-[19px] h-[17px]" />
          </button>

          {/* 4. Student Guide Open Book Icon */}
          <button
            type="button"
            onClick={() => setQuickPopup('guide')}
            title="Student Guide"
            className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <OpenBookIcon className="w-[17px] h-[17px]" />
          </button>

          {/* 5. Chain Link Icon */}
          <button
            type="button"
            onClick={() => setQuickPopup('links')}
            title="CU Portals (cu.edu.ge / programs.cu.edu.ge)"
            className={`p-1 hover:opacity-80 transition-opacity cursor-pointer ${
              darkMode ? 'text-[#adb5bd]' : 'text-[#555555]'
            }`}
          >
            <Link2 className="w-[16px] h-[16px] -rotate-45" />
          </button>

          {/* 6. Language Toggle (English / ქარ) */}
          <button
            type="button"
            onClick={toggleLanguage}
            className={`text-[13px] font-normal px-1 py-0.5 hover:underline cursor-pointer ${
              darkMode ? 'text-[#e9ecef]' : 'text-[#212529]'
            }`}
          >
            {isKa ? 'ქარ' : 'English'}
          </button>

          {/* 7. Settings Gear Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setGearMenuOpen((prev) => !prev)}
              className={`flex items-center gap-0.5 p-1 rounded hover:bg-black/5 cursor-pointer ${
                darkMode ? 'text-[#e9ecef]' : 'text-[#212529]'
              }`}
              title="Settings & Portal Navigation"
            >
              <Settings className="w-[15px] h-[15px]" />
              <ChevronDown className="w-3 h-3" />
            </button>

            {gearMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setGearMenuOpen(false)}
                />
                <div
                  className={`absolute right-0 mt-2 w-60 rounded-[4px] border shadow-lg py-1.5 z-40 text-[12.5px] ${
                    darkMode
                      ? 'bg-[#212529] border-[#383f45] text-[#e9ecef]'
                      : 'bg-white border-gray-200 text-[#212529]'
                  }`}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase text-[#6c757d]">
                    {isKa ? 'გვერდები' : 'Student Portal Views'}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('home');
                      setGearMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-black/5 cursor-pointer ${
                      activeSection === 'home' ? 'font-semibold text-[#2185d0]' : ''
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>{isKa ? 'მთავარი (ცხრილი)' : 'Home (Timetable 28.9 - 4.10)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('profile');
                      setGearMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-black/5 cursor-pointer ${
                      activeSection === 'profile' ? 'font-semibold text-[#2185d0]' : ''
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{isKa ? 'პროფილი (Sajin Saji)' : 'Profile (Sajin K. Saji)'}</span>
                  </button>

                  <div className="my-1 border-t border-gray-100 dark:border-[#32383e]" />
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase text-[#6c757d]">
                    {isKa ? 'თემა და პორტალები' : 'Theme & CU Websites'}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setDarkMode((prev) => !prev);
                      setGearMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-black/5 cursor-pointer"
                  >
                    {darkMode ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span>Switch to Light Mode (Video 1)</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-[#2185d0]" />
                        <span>Switch to Dark Mode (Video 2)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGearMenuOpen(false);
                      setScreenMode('cu_public');
                    }}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-black/5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#f39200]" />
                    <span>cu.edu.ge (Main Campus Site)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGearMenuOpen(false);
                      setScreenMode('programs_auth');
                    }}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-black/5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#4a89dc]" />
                    <span>programs.cu.edu.ge (Authorization)</span>
                  </button>

                  <div className="my-1 border-t border-gray-100 dark:border-[#32383e]" />
                  <button
                    type="button"
                    onClick={() => {
                      setGearMenuOpen(false);
                      setScreenMode('student_login');
                    }}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 text-[#db2828] hover:bg-[#db2828]/10 font-medium cursor-pointer"
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{isKa ? 'გასვლა (Login Screen)' : 'Log out (Dark Login View)'}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT VIEWPORT */}
      <main className="flex-1 w-full max-w-[1180px] mx-auto p-2.5 sm:p-4">
        {activeSection === 'home' && (
          <TimetableCalendarView language={language} darkMode={darkMode} />
        )}

        {activeSection === 'profile' && (
          <StudentProfileView language={language} darkMode={darkMode} />
        )}

        {activeSection !== 'home' && activeSection !== 'profile' && (
          <PortalSecondaryViews
            section={activeSection}
            language={language}
            darkMode={darkMode}
          />
        )}
      </main>

      {/* Top Bar Resource Modal (Library, Gmail, Moodle, Student Guide, Quick Portal Switcher) */}
      {quickPopup && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setQuickPopup(null)}
        >
          <div
            className={`w-full max-w-md rounded-[6px] border shadow-xl p-5 ${
              darkMode
                ? 'bg-[#212529] border-[#383f45] text-[#f8f9fa]'
                : 'bg-white border-gray-200 text-[#212529]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#383f45]">
              <h3 className="font-bold text-[15px]">
                {quickPopup === 'library' && 'Caucasus University e-Library'}
                {quickPopup === 'gmail' && 'CU Student Workspace Mail'}
                {quickPopup === 'moodle' && 'CU Moodle (moodle.cu.edu.ge)'}
                {quickPopup === 'guide' && 'Student Portal Guide & Regulations'}
                {quickPopup === 'links' && 'Caucasus University Portals'}
              </h3>
              <button
                type="button"
                onClick={() => setQuickPopup(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-[13px] space-y-3">
              {quickPopup === 'library' && (
                <p>
                  Connected as <strong>Sajin Kurattiparambil Saji (V4829164)</strong>. Access
                  Elsevier ClinicalKey, UpToDate, and Caucasus University School of
                  Medicine digital textbooks.
                </p>
              )}
              {quickPopup === 'gmail' && (
                <p>
                  Signed in to Google Workspace account:{' '}
                  <strong className="text-[#2185d0]">s_saji@cu.edu.ge</strong>
                </p>
              )}
              {quickPopup === 'moodle' && (
                <p>
                  Active Fall 2026 Moodle courses: Pathology 1, Immunology,
                  Introduction to Clinical Practice 1, Clinical Skills (part 1),
                  Basic Pharmacology I, Microbiology &amp; Virology 1, Medical Law.
                </p>
              )}
              {quickPopup === 'guide' && (
                <p>
                  School of Medicine — One-level Medical Doctor (MD) English-language
                  Program Academic Regulations &amp; Clinical Rotation Handbook.
                </p>
              )}
              {quickPopup === 'links' && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setQuickPopup(null);
                      setActiveSection('home');
                    }}
                    className="w-full text-left p-2.5 rounded border border-gray-200 dark:border-[#383f45] hover:border-[#2185d0] flex items-center justify-between cursor-pointer"
                  >
                    <span>student.cu.edu.ge — Schedule (28.9.2026 – 4.10.2026)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#2185d0]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickPopup(null);
                      setActiveSection('profile');
                    }}
                    className="w-full text-left p-2.5 rounded border border-gray-200 dark:border-[#383f45] hover:border-[#2185d0] flex items-center justify-between cursor-pointer"
                  >
                    <span>student.cu.edu.ge — Profile (Sajin Kurattiparambil Saji)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#2185d0]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickPopup(null);
                      setScreenMode('student_login');
                    }}
                    className="w-full text-left p-2.5 rounded border border-gray-200 dark:border-[#383f45] hover:border-[#2185d0] flex items-center justify-between cursor-pointer"
                  >
                    <span>student.cu.edu.ge — Login Screen (Dark Theme)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#2185d0]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickPopup(null);
                      setScreenMode('programs_auth');
                    }}
                    className="w-full text-left p-2.5 rounded border border-gray-200 dark:border-[#383f45] hover:border-[#2185d0] flex items-center justify-between cursor-pointer"
                  >
                    <span>programs.cu.edu.ge — Authorization (Student / Lecturer)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#2185d0]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickPopup(null);
                      setScreenMode('cu_public');
                    }}
                    className="w-full text-left p-2.5 rounded border border-gray-200 dark:border-[#383f45] hover:border-[#2185d0] flex items-center justify-between cursor-pointer"
                  >
                    <span>cu.edu.ge — Caucasus University Main Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#2185d0]" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setQuickPopup(null)}
                className="px-4 py-1.5 bg-[#2185d0] hover:bg-[#1678c2] text-white text-[12px] font-medium rounded-[4px] cursor-pointer"
              >
                {isKa ? 'დახურვა' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
