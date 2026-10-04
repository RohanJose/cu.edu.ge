import React, { useState } from 'react';
import { Menu, Search, ArrowRight, X } from 'lucide-react';
import { CULogo } from './CuBrandIcons';
import { Language } from '../data/cuData';

interface CuPublicSiteViewProps {
  initialMode?: 'cu_home' | 'programs_auth';
  language: Language;
  onToggleLanguage: () => void;
  onEnterStudentPortal: () => void;
  onEnterStudentLogin: () => void;
}

export function CuPublicSiteView({
  initialMode = 'cu_home',
  language,
  onToggleLanguage,
  onEnterStudentPortal,
  onEnterStudentLogin,
}: CuPublicSiteViewProps) {
  const [subMode, setSubMode] = useState<'cu_home' | 'programs_auth'>(initialMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isKa = language === 'ka';

  // Exact replica of programs.cu.edu.ge (Video 1: 00:12 - 00:20)
  if (subMode === 'programs_auth') {
    return (
      <div className="min-h-screen bg-white flex flex-col select-none">
        {/* Top Blue Header Bar */}
        <header className="h-[46px] bg-[#4a89dc] flex items-center justify-between px-4 relative shadow-xs">
          <button
            type="button"
            onClick={() => setSubMode('cu_home')}
            className="text-white p-1 hover:bg-white/10 rounded cursor-pointer"
            title="Back to cu.edu.ge"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Centered hanging white CU logo box */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-white px-4 py-2 shadow-md rounded-b-[4px] z-10 border border-gray-100">
            <CULogo size={62} showText={true} />
          </div>

          <div className="text-white text-xs font-medium">
            <button
              type="button"
              onClick={onToggleLanguage}
              className="hover:underline cursor-pointer"
            >
              {isKa ? 'ENG' : 'GEO'}
            </button>
          </div>
        </header>

        {/* Authorization Banner Box matching Video 1 (00:12 - 00:20) */}
        <div className="w-full max-w-[680px] mx-auto mt-10 px-4">
          <div
            className="relative w-full h-[215px] rounded-[3px] overflow-hidden flex flex-col items-center justify-center shadow-md border border-gray-200"
            style={{
              background:
                'linear-gradient(135deg, rgba(60,35,20,0.72) 0%, rgba(30,55,90,0.68) 100%)',
            }}
          >
            {/* Decorative study table / mug & notebook visual texture */}
            <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_25%_45%,#ffffff_0%,transparent_45%),linear-gradient(120deg,#8d5524_0%,#1e3a8a_100%)]" />

            <div className="relative z-10 flex flex-col items-center w-full px-6">
              <h2 className="text-[16px] font-bold text-[#111111] bg-white/85 px-4 py-0.5 rounded-xs mb-4 shadow-2xs">
                {isKa ? 'ავტორიზაცია' : 'Authorization'}
              </h2>

              <button
                type="button"
                onClick={onEnterStudentPortal}
                className="w-full max-w-[290px] h-[36px] bg-[#f5a623] hover:bg-[#e59412] text-[#111111] font-medium text-[14px] rounded-[4px] shadow-sm mb-3 transition-colors cursor-pointer"
              >
                {isKa ? 'სტუდენტი' : 'Student'}
              </button>

              <button
                type="button"
                onClick={onEnterStudentLogin}
                className="w-full max-w-[290px] h-[36px] bg-[#f5a623] hover:bg-[#e59412] text-[#111111] font-medium text-[14px] rounded-[4px] shadow-sm transition-colors cursor-pointer"
              >
                {isKa ? 'ლექტორი' : 'Lecturer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exact replica of cu.edu.ge (Video 1: 00:07 - 00:11)
  return (
    <div className="min-h-screen bg-white text-[#222222] relative overflow-x-hidden">
      {/* Slide-out Dark Left Menu Drawer (Video 1: 00:10 - 00:11) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-[250px] bg-[#1e242b] text-white h-full flex flex-col shadow-2xl z-20">
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
              <span className="text-[#f39200] font-bold text-[15px]">
                {isKa ? 'მენიუ' : 'Menu'}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex flex-col py-2 text-[13px] text-gray-200">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-left px-5 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isKa ? 'მთავარი' : 'Home'}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-left px-5 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isKa ? 'ჩვენ შესახებ' : 'About Us'}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-left px-5 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isKa ? 'CU კამპუსი' : 'CU Campus'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setSubMode('programs_auth');
                }}
                className="text-left px-5 py-2.5 bg-[#f39200] text-white font-semibold transition-colors cursor-pointer"
              >
                MY CU
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-left px-5 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isKa ? 'კონტაქტი' : 'Contact'}
              </button>
              <div className="my-2 border-t border-white/10" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-left px-5 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isKa ? 'სკოლები/პროგრამები' : 'Schools/Programs'}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-left px-5 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isKa ? 'საერთაშორისო ურთიერთობები/კვლევა' : 'International Relations/Research'}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-left px-5 py-2.5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isKa ? 'საგრანტო პროექტები/ბიბლიოთეკა' : 'Grant projects/Library'}
              </button>
            </nav>
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}

      {/* Top Header of cu.edu.ge */}
      <header className="h-[52px] bg-white border-b border-gray-200 px-4 flex items-center justify-between relative z-20">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="p-1.5 text-gray-600 hover:text-gray-900 cursor-pointer"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Centered Hanging Logo Card */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-white px-3.5 py-2 shadow-md rounded-b-[4px] border border-gray-100">
          <CULogo size={54} showText={true} />
        </div>

        <div className="flex items-center gap-3 text-[11px] font-medium text-gray-600">
          <button
            type="button"
            onClick={() => setSubMode('programs_auth')}
            className="px-2 py-1 bg-[#f39200] text-white rounded-xs font-semibold hover:bg-[#e08600] cursor-pointer"
          >
            MY CU
          </button>
          <button
            type="button"
            onClick={onToggleLanguage}
            className="hover:text-black uppercase cursor-pointer"
          >
            {isKa ? 'ENG' : 'GEO'}
          </button>
          <Search className="w-3.5 h-3.5 text-gray-500" />
        </div>
      </header>

      {/* Hero Campus Section with 4 Colored Boxes */}
      <section className="relative w-full h-[270px] sm:h-[340px] bg-[#b86b52] overflow-hidden">
        <img
          src="/src/assets/images/cu_campus_hero_1791106433220.jpg"
          alt="Caucasus University Campus"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center">
          <h1 className="text-white text-[22px] sm:text-[28px] font-bold drop-shadow-md tracking-wide mt-4">
            {isKa ? 'CU კამპუსი' : 'CU Campus'}
          </h1>
        </div>

        {/* 4 Colored Action Boxes at Bottom of Hero (Video 1: 00:07 - 00:09) */}
        <div className="absolute bottom-3 left-2 right-2 max-w-4xl mx-auto grid grid-cols-4 gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setSubMode('programs_auth')}
            className="bg-[#3d8b40]/95 hover:bg-[#357a38] text-white py-2.5 px-1.5 rounded-[3px] text-[10px] sm:text-[13px] font-medium text-center shadow-sm cursor-pointer truncate"
          >
            {isKa ? 'აბიტურიენტებისთვის' : 'For applicants'}
          </button>
          <button
            type="button"
            onClick={onEnterStudentPortal}
            className="bg-[#e69924]/95 hover:bg-[#d18819] text-white py-2.5 px-1.5 rounded-[3px] text-[10px] sm:text-[13px] font-medium text-center shadow-sm cursor-pointer truncate"
          >
            {isKa ? 'სტუდენტებისთვის' : 'For students'}
          </button>
          <button
            type="button"
            onClick={() => setSubMode('programs_auth')}
            className="bg-[#d95338]/95 hover:bg-[#c3452b] text-white py-2.5 px-1.5 rounded-[3px] text-[10px] sm:text-[13px] font-medium text-center shadow-sm cursor-pointer truncate"
          >
            {isKa ? 'ტრენინგ ცენტრი' : 'Training Center'}
          </button>
          <button
            type="button"
            onClick={() => setSubMode('programs_auth')}
            className="bg-[#b52b27]/95 hover:bg-[#9f221f] text-white py-2.5 px-1.5 rounded-[3px] text-[10px] sm:text-[13px] font-medium text-center shadow-sm cursor-pointer truncate"
          >
            {isKa ? 'მიღება' : 'Reception'}
          </button>
        </div>
      </section>

      {/* News Section (სიახლეები / News) */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-center text-[18px] font-semibold text-[#333333] mb-5">
          {isKa ? 'სიახლეები' : 'News'}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* News Card 1: 02 Oct Rennes Business School */}
          <div className="group cursor-pointer" onClick={onEnterStudentPortal}>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-gray-100 mb-2.5">
              <img
                src="/src/assets/images/cu_news_rennes_1791106448259.jpg"
                alt="CSB and Rennes Business School students"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-start gap-2.5">
              <div className="text-[11px] text-gray-400 leading-tight pr-2 border-r border-gray-200 shrink-0">
                <div className="font-bold text-gray-600">02</div>
                <div>{isKa ? 'ოქტ' : 'Oct'}</div>
              </div>
              <p className="text-[11px] sm:text-[12px] text-gray-700 leading-snug line-clamp-4">
                {isKa
                  ? 'CSB-ისა და რენის ბიზნესის სკოლის ერთობლივი 3 წლიანი ბიზნესის ადმინისტრირების საბაკალავრო პროგრამის სტუდენტები საფრანგეთში, ქალაქ რენში იმყოფებიან'
                  : 'Students of the joint 3-year Bachelor of Business Administration program of CSB and Rennes Business School are in Rennes, France'}
              </p>
            </div>
          </div>

          {/* News Card 2: 30 Sep Solana Hackathon */}
          <div className="group cursor-pointer" onClick={onEnterStudentPortal}>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-gray-100 mb-2.5">
              <img
                src="/src/assets/images/cu_news_hackathon_1791106461122.jpg"
                alt="Solana Hackathon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-start gap-2.5">
              <div className="text-[11px] text-gray-400 leading-tight pr-2 border-r border-gray-200 shrink-0">
                <div className="font-bold text-gray-600">30</div>
                <div>{isKa ? 'სექ' : 'Sep'}</div>
              </div>
              <p className="text-[11px] sm:text-[12px] text-gray-700 leading-snug">
                {isKa ? 'სოლანას ჰაკათონი' : 'Solana Hackathon'}
              </p>
            </div>
          </div>

          {/* News Card 3: 30 Sep Community activity */}
          <div className="hidden sm:block group cursor-pointer" onClick={onEnterStudentPortal}>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#134377] flex items-center justify-center p-4 mb-2.5 text-white text-center">
              <div>
                <div className="text-xs uppercase tracking-wider opacity-75 mb-1">Jean Monnet</div>
                <div className="text-sm font-bold">European Media Literacy Needs</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="text-[11px] text-gray-400 leading-tight pr-2 border-r border-gray-200 shrink-0">
                <div className="font-bold text-gray-600">30</div>
                <div>{isKa ? 'სექ' : 'Sep'}</div>
              </div>
              <p className="text-[11px] sm:text-[12px] text-gray-700 leading-snug">
                {isKa
                  ? 'გასვლითი აქტივობა თემაზე "მედიაწიგნიერება მშვიდობისთვის"'
                  : 'Community activity on the topic "Media Literacy for Peace"'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom 3 Columns: Announcements | Information Column | Subscribe */}
      <section className="max-w-5xl mx-auto px-4 py-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Announcements column */}
        <div>
          <h3 className="text-[15px] font-semibold text-center text-gray-800 mb-4">
            {isKa ? 'ანონსების სვეტი' : 'Announcements column'}
          </h3>
          <div className="space-y-3.5 text-[11px] text-gray-600">
            <div className="flex items-start gap-3">
              <div className="text-gray-400 pr-2 border-r border-gray-200 shrink-0 text-center w-9">
                <div className="font-bold text-gray-700">02</div>
                <div>{isKa ? 'ოქტ' : 'Oct'}</div>
              </div>
              <p>
                {isKa
                  ? 'ცნობიერების ამაღლების ტრენინგების სერია'
                  : 'A series of trainings to raise awareness'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-gray-400 pr-2 border-r border-gray-200 shrink-0 text-center w-9">
                <div className="font-bold text-gray-700">03</div>
                <div>{isKa ? 'ოქტ' : 'Oct'}</div>
              </div>
              <p>
                {isKa
                  ? 'როგორ გავიგოთ მომხმარებლის ქცევა და გავზარდოთ ონლაინ გაყიდვები'
                  : 'How to understand customer behavior and increase online sales'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-gray-400 pr-2 border-r border-gray-200 shrink-0 text-center w-9">
                <div className="font-bold text-gray-700">07</div>
                <div>{isKa ? 'ოქტ' : 'Oct'}</div>
              </div>
              <p>
                {isKa
                  ? 'საერთაშორისო კონფერენცია "კიბერუსაფრთხოება და ხელოვნური ინტელექტი (AI) განათლებაში"'
                  : 'International Conference "Cybersecurity and Artificial Intelligence (AI) in Education"'}
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Information column */}
        <div>
          <h3 className="text-[15px] font-semibold text-center text-gray-800 mb-4">
            {isKa ? 'საინფორმაციო სვეტი' : 'Information column'}
          </h3>
          <div className="space-y-3.5 text-[11px] text-gray-600">
            <div className="flex items-start gap-3">
              <div className="text-gray-400 pr-2 border-r border-gray-200 shrink-0 text-center w-9">
                <div className="font-bold text-gray-700">01</div>
                <div>{isKa ? 'ოქტ' : 'Oct'}</div>
              </div>
              <p>
                {isKa
                  ? 'დარეგისტრირდით საერთაშორისო გაცვლით პროგრამაზე, 2026 წლის გაზაფხულის სემესტრი'
                  : 'Register for the International Exchange Program, Spring Semester 2026'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-gray-400 pr-2 border-r border-gray-200 shrink-0 text-center w-9">
                <div className="font-bold text-gray-700">01</div>
                <div>{isKa ? 'ოქტ' : 'Oct'}</div>
              </div>
              <p>
                {isKa
                  ? 'ორმხრივი გაცვლითი პროგრამები 2026 წლის გაზაფხულის სემესტრისთვის'
                  : 'Bilateral exchange programs for the spring semester 2026'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-gray-400 pr-2 border-r border-gray-200 shrink-0 text-center w-9">
                <div className="font-bold text-gray-700">25</div>
                <div>{isKa ? 'სექ' : 'Sep'}</div>
              </div>
              <p>
                {isKa
                  ? '„კავკასიის სამართლის ჟურნალი“ აცხადებს სტატიების კონკურსს ჟურნალის პირველი ნომრისთვის'
                  : '"Caucasus Law Journal" announces an article competition for the first issue of the journal'}
              </p>
            </div>
          </div>
        </div>

        {/* Column 3: Subscribe to news */}
        <div className="bg-[#f8f9fa] border border-gray-200 p-5 rounded-[3px] flex flex-col items-center justify-center text-center">
          <h3 className="text-[15px] font-semibold text-gray-800 mb-3">
            {isKa ? 'სიახლეების გამოწერა' : 'Subscribe to news'}
          </h3>
          <div className="w-full flex items-center bg-white border border-gray-200 rounded-[2px] overflow-hidden">
            <input
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder={isKa ? 'ელ.ფოსტა' : 'Email'}
              className="flex-1 px-3 py-2 text-[12px] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setSubscribed(true)}
              className="bg-[#f39200] hover:bg-[#df8500] text-white px-3 py-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {subscribed && (
            <p className="text-[11px] text-green-600 mt-2">
              {isKa ? 'გამოწერა წარმატებით დასრულდა!' : 'Subscribed successfully!'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
