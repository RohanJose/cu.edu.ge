import React, { useState, useRef } from 'react';
import {
  Landmark,
  GraduationCap,
  BookOpen,
  UserCheck,
  CreditCard,
  User,
  Briefcase,
  Languages,
  FileText,
  Check,
  Camera,
  Plus,
  Download,
} from 'lucide-react';
import {
  INITIAL_STUDENT_PROFILE,
  Language,
  StudentProfileData,
} from '../data/cuData';

interface StudentProfileViewProps {
  language: Language;
  darkMode: boolean;
}

import DEFAULT_AVATAR_PATH from '../assets/images/student_avatar_sajin_1791107653445.jpg';

export function StudentProfileView({ language, darkMode }: StudentProfileViewProps) {
  const [profile, setProfile] = useState<StudentProfileData>(() => {
    try {
      const saved = localStorage.getItem('cu_student_profile_sajin_v2');
      return saved ? { ...INITIAL_STUDENT_PROFILE, ...JSON.parse(saved) } : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('cu_student_avatar_sajin_v2') || DEFAULT_AVATAR_PATH;
    } catch {
      return DEFAULT_AVATAR_PATH;
    }
  });

  const [activeTab, setActiveTab] = useState<
    'personal' | 'education' | 'work' | 'languages' | 'cv'
  >('personal');
  const [savedToast, setSavedToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isKa = language === 'ka';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('cu_student_profile_sajin_v2', JSON.stringify(profile));
    } catch {
      // ignore storage quota errors
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarUrl(reader.result);
        try {
          localStorage.setItem('cu_student_avatar_sajin_v2', reader.result);
        } catch {
          // ignore storage quota errors
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`w-full rounded-[4px] border p-4 sm:p-6 transition-colors ${
        darkMode
          ? 'bg-[#1b1e21] border-[#32383e] text-[#e9ecef]'
          : 'bg-white border-[#e0e1e2] text-[#212529] shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
      }`}
    >
      {/* Top Student Summary Section */}
      <div className="flex items-start gap-4 sm:gap-6">
        {/* Left: Student Portrait Photo */}
        <div className="relative group shrink-0 mt-2">
          <div className="w-[106px] sm:w-[130px] h-[134px] sm:h-[162px] rounded-[6px] overflow-hidden bg-white border border-gray-200 shadow-2xs">
            <img
              src={avatarUrl}
              alt="Sajin Kurattiparambil Saji"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR_PATH;
              }}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Click to change student photo"
            className="absolute inset-0 bg-black/0 group-hover:bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-[6px] cursor-pointer"
          >
            <span className="bg-white/90 text-gray-800 text-[10px] font-medium px-2 py-1 rounded flex items-center gap-1 shadow">
              <Camera className="w-3 h-3" />
              {isKa ? 'ფოტო' : 'Photo'}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        {/* Right: Student Name & Program Metadata */}
        <div className="flex-1 min-w-0">
          <h1
            className={`text-[17px] sm:text-[19px] font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-[#212529]'
            }`}
          >
            {isKa ? profile.fullNameKa : profile.fullNameEn}
          </h1>

          <div
            className={`text-[11.5px] sm:text-[12.5px] uppercase mt-1.5 mb-2.5 tracking-normal ${
              darkMode ? 'text-[#adb5bd]' : 'text-[#6c757d]'
            }`}
          >
            {profile.fullNameUpperEn}
          </div>

          <div
            className={`space-y-1.5 text-[12px] sm:text-[13px] leading-snug ${
              darkMode ? 'text-[#ced4da]' : 'text-[#5a6268]'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Landmark className="w-3.5 h-3.5 text-[#6987ab] shrink-0 mt-0.5" />
              <span>{isKa ? profile.schoolKa : profile.schoolEn}</span>
            </div>

            <div className="flex items-start gap-2.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#6987ab] shrink-0 mt-0.5" />
              <span>{isKa ? profile.degreeKa : profile.degreeEn}</span>
            </div>

            <div className="flex items-start gap-2.5">
              <BookOpen className="w-3.5 h-3.5 text-[#6987ab] shrink-0 mt-0.5" />
              <span>{isKa ? profile.programKa : profile.programEn}</span>
            </div>

            <div className="flex items-start gap-2.5">
              <UserCheck className="w-3.5 h-3.5 text-[#6987ab] shrink-0 mt-0.5" />
              <span>{isKa ? profile.statusKa : profile.statusEn}</span>
            </div>
          </div>

          <div
            className={`border-t my-2.5 ${
              darkMode ? 'border-[#32383e]' : 'border-[#f0f2f4]'
            }`}
          />

          <div
            className={`flex items-center gap-2.5 text-[12px] sm:text-[13px] tabular-nums ${
              darkMode ? 'text-[#ced4da]' : 'text-[#5a6268]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#6987ab] shrink-0" />
            <span>{profile.academicYear}</span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation Bar matching 85425c5d-7b4f-4c94-8e0d-08f3c56b7902.JPG */}
      <div
        className={`mt-5 border-b flex items-center overflow-x-auto no-scrollbar ${
          darkMode ? 'border-[#32383e]' : 'border-[#dee2e6]'
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-1.5 px-3 py-2.5 text-[12.5px] sm:text-[13px] whitespace-nowrap border-b-2 -mb-[1px] transition-colors cursor-pointer ${
            activeTab === 'personal'
              ? 'border-[#2185d0] text-[#2185d0] font-medium'
              : darkMode
                ? 'border-transparent text-[#adb5bd] hover:text-white'
                : 'border-transparent text-[#495057] hover:text-[#212529]'
          }`}
        >
          <User className="w-3.5 h-3.5 fill-current" />
          <span>{isKa ? 'პირადი ინფორმაცია' : 'Personal information'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('education')}
          className={`flex items-center gap-1.5 px-3 py-2.5 text-[12.5px] sm:text-[13px] whitespace-nowrap border-b-2 -mb-[1px] transition-colors cursor-pointer ${
            activeTab === 'education'
              ? 'border-[#2185d0] text-[#2185d0] font-medium'
              : darkMode
                ? 'border-transparent text-[#adb5bd] hover:text-white'
                : 'border-transparent text-[#495057] hover:text-[#212529]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>{isKa ? 'უმაღლესი განათლება' : 'Higher education'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('work')}
          className={`flex items-center gap-1.5 px-3 py-2.5 text-[12.5px] sm:text-[13px] whitespace-nowrap border-b-2 -mb-[1px] transition-colors cursor-pointer ${
            activeTab === 'work'
              ? 'border-[#2185d0] text-[#2185d0] font-medium'
              : darkMode
                ? 'border-transparent text-[#adb5bd] hover:text-white'
                : 'border-transparent text-[#495057] hover:text-[#212529]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>{isKa ? 'სამუშაო გამოცდილება' : 'Work experience'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('languages')}
          className={`flex items-center gap-1.5 px-3 py-2.5 text-[12.5px] sm:text-[13px] whitespace-nowrap border-b-2 -mb-[1px] transition-colors cursor-pointer ${
            activeTab === 'languages'
              ? 'border-[#2185d0] text-[#2185d0] font-medium'
              : darkMode
                ? 'border-transparent text-[#adb5bd] hover:text-white'
                : 'border-transparent text-[#495057] hover:text-[#212529]'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{isKa ? 'ენების ცოდნა' : 'Language skills'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cv')}
          className={`flex items-center gap-1.5 px-3 py-2.5 text-[12.5px] sm:text-[13px] whitespace-nowrap border-b-2 -mb-[1px] transition-colors cursor-pointer ${
            activeTab === 'cv'
              ? 'border-[#2185d0] text-[#2185d0] font-medium'
              : darkMode
                ? 'border-transparent text-[#adb5bd] hover:text-white'
                : 'border-transparent text-[#495057] hover:text-[#212529]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isKa ? 'CV-ის გენერირება' : 'Generate a CV'}</span>
        </button>
      </div>

      {/* TAB 1: PERSONAL INFORMATION (Exact 2-Column Grid from Screenshot) */}
      {activeTab === 'personal' && (
        <form onSubmit={handleSave} className="pt-5">
          <div className="grid grid-cols-2 gap-x-3.5 sm:gap-x-6 gap-y-5">
            {/* Row 1 Col 1: PERSONAL NUMBER */}
            <div>
              <label
                className={`block text-[10.5px] sm:text-[11.5px] uppercase mb-1.5 ${
                  darkMode ? 'text-[#ced4da]' : 'text-[#212529]'
                }`}
              >
                {isKa ? 'პირადი ნომერი' : 'PERSONAL NUMBER'}
              </label>
              <input
                type="text"
                readOnly
                value={profile.personalNumber}
                className={`w-full h-[36px] rounded-[4px] px-3 text-[12.5px] sm:text-[13px] border focus:outline-none ${
                  darkMode
                    ? 'bg-[#2a2e33] border-[#3a3f45] text-[#e9ecef]'
                    : 'bg-[#e9ecef] border-[#ced4da] text-[#212529]'
                }`}
              />
            </div>

            {/* Row 1 Col 2: CU EMAIL */}
            <div>
              <label
                className={`block text-[10.5px] sm:text-[11.5px] uppercase mb-1.5 ${
                  darkMode ? 'text-[#ced4da]' : 'text-[#212529]'
                }`}
              >
                {isKa ? 'CU ელ.ფოსტა' : 'CU EMAIL'}
              </label>
              <input
                type="email"
                readOnly
                value={profile.cuEmail}
                className={`w-full h-[36px] rounded-[4px] px-3 text-[12.5px] sm:text-[13px] border focus:outline-none ${
                  darkMode
                    ? 'bg-[#2a2e33] border-[#3a3f45] text-[#e9ecef]'
                    : 'bg-[#e9ecef] border-[#ced4da] text-[#212529]'
                }`}
              />
            </div>

            {/* Row 2 Col 1: PERSONAL EMAIL */}
            <div>
              <label
                className={`block text-[10.5px] sm:text-[11.5px] uppercase mb-1.5 ${
                  darkMode ? 'text-[#ced4da]' : 'text-[#212529]'
                }`}
              >
                {isKa ? 'პირადი ელ.ფოსტა' : 'PERSONAL EMAIL'}
              </label>
              <input
                type="email"
                value={profile.personalEmail}
                onChange={(e) =>
                  setProfile({ ...profile, personalEmail: e.target.value })
                }
                className={`w-full h-[36px] rounded-[4px] px-3 text-[12.5px] sm:text-[13px] border focus:border-[#80bdff] focus:outline-none ${
                  darkMode
                    ? 'bg-[#121417] border-[#3a3f45] text-white'
                    : 'bg-white border-[#ced4da] text-[#212529]'
                }`}
              />
            </div>

            {/* Row 2 Col 2: MOBILE */}
            <div>
              <label
                className={`block text-[10.5px] sm:text-[11.5px] uppercase mb-1.5 ${
                  darkMode ? 'text-[#ced4da]' : 'text-[#212529]'
                }`}
              >
                {isKa ? 'მობილური' : 'MOBILE'}
              </label>
              <input
                type="tel"
                value={profile.mobile}
                onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                className={`w-full h-[36px] rounded-[4px] px-3 text-[12.5px] sm:text-[13px] border focus:border-[#80bdff] focus:outline-none ${
                  darkMode
                    ? 'bg-[#121417] border-[#3a3f45] text-white'
                    : 'bg-white border-[#ced4da] text-[#212529]'
                }`}
              />
            </div>

            {/* Row 3 Col 1: ADDRESS (Resizable Textarea matching bottom-right corner lines in screenshot) */}
            <div>
              <label
                className={`block text-[10.5px] sm:text-[11.5px] uppercase mb-1.5 ${
                  darkMode ? 'text-[#ced4da]' : 'text-[#212529]'
                }`}
              >
                {isKa ? 'მისამართი' : 'ADDRESS'}
              </label>
              <textarea
                rows={1}
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className={`w-full h-[36px] min-h-[36px] rounded-[4px] px-3 py-1.5 text-[12.5px] sm:text-[13px] border resize-y focus:border-[#80bdff] focus:outline-none ${
                  darkMode
                    ? 'bg-[#121417] border-[#3a3f45] text-white'
                    : 'bg-white border-[#ced4da] text-[#212529]'
                }`}
              />
            </div>

            {/* Row 3 Col 2: LINKEDIN */}
            <div>
              <label
                className={`block text-[10.5px] sm:text-[11.5px] uppercase mb-1.5 ${
                  darkMode ? 'text-[#ced4da]' : 'text-[#212529]'
                }`}
              >
                LINKEDIN
              </label>
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) =>
                  setProfile({ ...profile, linkedin: e.target.value })
                }
                className={`w-full h-[36px] rounded-[4px] px-3 text-[12.5px] sm:text-[13px] border focus:border-[#80bdff] focus:outline-none ${
                  darkMode
                    ? 'bg-[#121417] border-[#3a3f45] text-white'
                    : 'bg-white border-[#ced4da] text-[#212529]'
                }`}
              />
            </div>
          </div>

          {/* Bottom Right Green Pill Save Button */}
          <div className="mt-8 mb-1 flex items-center justify-end gap-3">
            {savedToast && (
              <span className="text-[12px] text-[#28a745] flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                {isKa ? 'შენახულია' : 'Saved successfully'}
              </span>
            )}
            <button
              type="submit"
              className="bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] text-white text-[13px] font-medium px-4 py-1.5 rounded-full shadow-2xs transition-colors cursor-pointer"
            >
              {isKa ? 'შენახვა' : 'Save'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: HIGHER EDUCATION */}
      {activeTab === 'education' && (
        <div className="pt-5 space-y-4">
          <div
            className={`p-4 rounded-[4px] border ${
              darkMode ? 'border-[#32383e] bg-[#212529]' : 'border-gray-200 bg-gray-50/60'
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="font-semibold text-[14px]">
                {isKa ? 'კავკასიის უნივერსიტეტი (CU)' : 'Caucasus University (CU)'}
              </div>
              <span className="text-[12px] text-[#2185d0] font-medium tabular-nums">
                2024 – {isKa ? 'დღემდე' : 'Present'}
              </span>
            </div>
            <div className="text-[13px] mt-1 text-[#6c757d]">
              {isKa ? profile.schoolKa : profile.schoolEn} ·{' '}
              {isKa ? profile.programKa : profile.programEn}
            </div>
          </div>

          <div
            className={`p-4 rounded-[4px] border ${
              darkMode ? 'border-[#32383e] bg-[#212529]' : 'border-gray-200 bg-gray-50/60'
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="font-semibold text-[14px]">
                {isKa
                  ? 'წმ. მარიამის უმაღლესი საშუალო სკოლა, კერალა, ინდოეთი'
                  : "St. Mary's Higher Secondary School, Thrissur, Kerala, India"}
              </div>
              <span className="text-[12px] text-[#6c757d] font-medium tabular-nums">
                2021 – 2023
              </span>
            </div>
            <div className="text-[13px] mt-1 text-[#6c757d]">
              {isKa
                ? 'ბიოლოგია, ფიზიკა, ქიმია (Pre-Medical Stream) — NEET კვალიფიცირებული'
                : 'Higher Secondary (Biology, Physics, Chemistry — Pre-Medical) · NEET Qualified'}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WORK EXPERIENCE */}
      {activeTab === 'work' && (
        <div className="pt-5 space-y-4">
          <div
            className={`p-4 rounded-[4px] border ${
              darkMode ? 'border-[#32383e] bg-[#212529]' : 'border-gray-200 bg-gray-50/60'
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="font-semibold text-[14px]">
                {isKa
                  ? 'კლინიკური სტაჟიორი / დამკვირვებელი — თბილისის ცენტრალური საავადმყოფო'
                  : 'Clinical Student Observer — Tbilisi Central Hospital'}
              </div>
              <span className="text-[12px] text-[#2185d0] font-medium tabular-nums">
                2025 – {isKa ? 'დღემდე' : 'Present'}
              </span>
            </div>
            <div className="text-[13px] mt-1 text-[#6c757d]">
              {isKa
                ? 'პაციენტის ანამნეზის შეკრება, სასიცოცხლო ნიშნების მონიტორინგი და კლინიკური უნარების პრაქტიკა.'
                : 'Assisted attending physicians in patient history intake, vital signs monitoring, and clinical rotation documentation.'}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2185d0] hover:bg-[#1678c2] text-white text-[12px] font-medium rounded-[4px] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isKa ? 'დამატება' : 'Add Experience'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: LANGUAGE SKILLS */}
      {activeTab === 'languages' && (
        <div className="pt-5 space-y-3">
          <div
            className={`flex items-center justify-between p-3 rounded-[4px] border text-[13px] ${
              darkMode ? 'border-[#32383e]' : 'border-gray-200'
            }`}
          >
            <span className="font-medium">{isKa ? 'ინგლისური' : 'English'}</span>
            <span className="text-[#6c757d]">C1 / Fluent (Instruction Language)</span>
          </div>
          <div
            className={`flex items-center justify-between p-3 rounded-[4px] border text-[13px] ${
              darkMode ? 'border-[#32383e]' : 'border-gray-200'
            }`}
          >
            <span className="font-medium">{isKa ? 'მალაიალამური / ჰინდი' : 'Malayalam / Hindi'}</span>
            <span className="text-[#6c757d]">Native / Bilingual Proficiency</span>
          </div>
          <div
            className={`flex items-center justify-between p-3 rounded-[4px] border text-[13px] ${
              darkMode ? 'border-[#32383e]' : 'border-gray-200'
            }`}
          >
            <span className="font-medium">{isKa ? 'ქართული' : 'Georgian'}</span>
            <span className="text-[#6c757d]">A2 / Clinical Patient Communication</span>
          </div>
        </div>
      )}

      {/* TAB 5: GENERATE A CV */}
      {activeTab === 'cv' && (
        <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-[13px] text-[#6c757d]">
            {isKa
              ? 'დააგენერირეთ სტუდენტის ოფიციალური CV PDF ფორმატში.'
              : 'Generate your official Caucasus University student curriculum vitae (PDF).'}
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2185d0] hover:bg-[#1678c2] text-white text-[13px] font-medium rounded-[4px] cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{isKa ? 'PDF ჩამოტვირთვა' : 'Download CV (PDF)'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
