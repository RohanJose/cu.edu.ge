import React, { useState } from 'react';
import { CULogo, GoogleGIcon } from './CuBrandIcons';
import { Language } from '../data/cuData';

interface StudentLoginViewProps {
  language: Language;
  onToggleLanguage: () => void;
  onLoginSuccess: () => void;
  onOpenPublicSite: () => void;
}

export function StudentLoginView({
  language,
  onToggleLanguage,
  onLoginSuccess,
  onOpenPublicSite,
}: StudentLoginViewProps) {
  const [identifier, setIdentifier] = useState('s_saji@cu.edu.ge');
  const [password, setPassword] = useState('••••••••••');
  const [showAutofillChip, setShowAutofillChip] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const isKa = language === 'ka';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen w-full bg-[#121417] text-[#e9ecef] flex flex-col items-center justify-center p-4 select-none">
      {/* Main Dark Card Container matching Video 2 (00:00 - 00:06) */}
      <div className="w-full max-w-[420px] min-h-[540px] bg-[#1b1e21] border border-[#2c3136] rounded-[12px] shadow-[0_0_28px_rgba(0,0,0,0.85)] px-6 py-6 flex flex-col justify-between relative">
        {/* Top Row: CU Logo on Left, Language Switcher (EN / KA) on Right */}
        <div className="flex items-start justify-between">
          <button
            type="button"
            onClick={onOpenPublicSite}
            title="Caucasus University (cu.edu.ge)"
            className="bg-white p-1.5 rounded-[3px] shadow-xs hover:opacity-95 transition-opacity"
          >
            <CULogo size={48} showText={true} />
          </button>

          <button
            type="button"
            onClick={onToggleLanguage}
            className="text-[#4a90e2] hover:text-[#6ba8f0] font-semibold text-[16px] tracking-wide px-1 py-0.5 transition-colors cursor-pointer"
          >
            {isKa ? 'EN' : 'KA'}
          </button>
        </div>

        {/* Center Login Form */}
        <form onSubmit={handleSubmit} className="my-auto py-8 flex flex-col gap-5">
          {/* Personal Number or CU Email Field */}
          <div className="relative">
            <input
              type="text"
              value={identifier}
              onFocus={() => setShowAutofillChip(true)}
              onBlur={() => setTimeout(() => setShowAutofillChip(false), 180)}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={
                isKa ? 'პირადი ნომერი ან CU ელ.ფოსტა' : 'Personal Number or CU Email'
              }
              className="w-full h-[46px] bg-[#1b1e21] text-[#e9ecef] placeholder-[#adb5bd] text-[14px] px-5 rounded-full border border-[#495057] focus:border-[#2e7d32] focus:outline-none transition-colors"
            />
            {showAutofillChip && (
              <button
                type="button"
                onClick={() => {
                  setIdentifier('s_saji@cu.edu.ge');
                  setPassword('••••••••••');
                  setShowAutofillChip(false);
                }}
                className="absolute left-3 right-3 -bottom-11 z-20 h-[40px] bg-[#1e2328] border border-[#3a4149] rounded-full px-4 flex items-center justify-center text-[14px] text-[#e9ecef] shadow-lg hover:bg-[#252b31]"
              >
                s_saji@cu.edu.ge
              </button>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isKa ? 'პაროლი' : 'Password'}
              className="w-full h-[46px] bg-[#1b1e21] text-[#e9ecef] placeholder-[#adb5bd] text-[14px] px-5 rounded-full border border-[#495057] focus:border-[#2e7d32] focus:outline-none transition-colors"
            />
          </div>

          {/* Primary Blue Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-[46px] bg-[#004a99] hover:bg-[#0059b8] active:bg-[#003d80] text-white font-semibold text-[15px] tracking-wide rounded-full shadow-md transition-colors cursor-pointer"
            >
              {isKa ? 'ავტორიზაცია' : 'LOGIN'}
            </button>
          </div>

          {/* Forgot Password Link aligned right */}
          <div className="flex justify-end -mt-1">
            <button
              type="button"
              onClick={() => {
                setResetEmailSent(false);
                setForgotModalOpen(true);
              }}
              className="text-[#4a90e2] hover:text-[#6ba8f0] text-[13px] underline cursor-pointer"
            >
              {isKa ? 'პაროლის აღდგენა' : 'Forgot password?'}
            </button>
          </div>

          {/* Divider Text */}
          <div className="text-center text-[#ced4da] text-[13px] my-1">
            {isKa ? 'ან გაიარეთ ავტორიზაცია' : '-- or --'}
          </div>

          {/* Outlined Google Login Button */}
          <button
            type="button"
            onClick={onLoginSuccess}
            className="w-full h-[46px] bg-[#1b1e21] hover:bg-[#23272b] border border-[#343a40] rounded-full px-5 flex items-center relative transition-colors cursor-pointer"
          >
            <span className="flex items-center justify-center">
              <GoogleGIcon className="w-5 h-5" />
            </span>
            <span className="mx-auto text-[#4a90e2] underline font-medium text-[14px] pr-5">
              Google
            </span>
          </button>
        </form>

        {/* Subtle bottom helper for switching to CU Campus public website */}
        <div className="text-center pt-2 border-t border-[#25292e]/60 flex items-center justify-between text-[11px] text-[#6c757d]">
          <span>student.cu.edu.ge</span>
          <button
            type="button"
            onClick={onOpenPublicSite}
            className="text-[#4a90e2] hover:underline cursor-pointer"
          >
            {isKa ? 'cu.edu.ge მთავარი გვერდი' : 'Visit cu.edu.ge / MY CU'}
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1b1e21] border border-[#343a40] rounded-xl p-5 text-[#e9ecef] shadow-2xl">
            <h3 className="text-[16px] font-semibold mb-2">
              {isKa ? 'პაროლის აღდგენა' : 'Password Recovery'}
            </h3>
            {resetEmailSent ? (
              <p className="text-[13px] text-[#adb5bd] mb-4">
                {isKa
                  ? 'პაროლის აღდგენის ბმული გამოიგზავნა მისამართზე: '
                  : 'Password recovery instructions have been sent to: '}
                <span className="text-white font-medium">{identifier || 's_saji@cu.edu.ge'}</span>
              </p>
            ) : (
              <>
                <p className="text-[13px] text-[#adb5bd] mb-3">
                  {isKa
                    ? 'შეიყვანეთ თქვენი პირადი ნომერი ან CU ელ.ფოსტა:'
                    : 'Enter your Personal Number or CU Email to receive a reset link:'}
                </p>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-[40px] bg-[#121417] text-white text-[13px] px-4 rounded-full border border-[#495057] mb-4 focus:outline-none focus:border-[#4a90e2]"
                />
              </>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-1.5 rounded-full text-[13px] bg-[#2c3136] hover:bg-[#383e45] text-white cursor-pointer"
              >
                {isKa ? 'დახურვა' : 'Close'}
              </button>
              {!resetEmailSent && (
                <button
                  type="button"
                  onClick={() => setResetEmailSent(true)}
                  className="px-4 py-1.5 rounded-full text-[13px] bg-[#004a99] hover:bg-[#0059b8] text-white font-medium cursor-pointer"
                >
                  {isKa ? 'გაგზავნა' : 'Send Link'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
