import React, { useState } from 'react';
import {
  CURRENT_SEMESTER_COURSES,
  Language,
  TRANSCRIPT_GRADES,
} from '../data/cuData';
import { CheckCircle2, FileText, Bell, DollarSign, ClipboardList } from 'lucide-react';

interface SecondaryViewProps {
  section:
    | 'current_semester'
    | 'registration'
    | 'signs'
    | 'finance'
    | 'announcements'
    | 'surveys';
  language: Language;
  darkMode: boolean;
}

export function PortalSecondaryViews({ section, language, darkMode }: SecondaryViewProps) {
  const isKa = language === 'ka';
  const [selectedSurveyDone, setSelectedSurveyDone] = useState<Record<string, boolean>>({});
  const [noticeRequested, setNoticeRequested] = useState(false);

  const cardClass = `w-full rounded-[4px] border p-4 sm:p-6 transition-colors ${
    darkMode
      ? 'bg-[#1b1e21] border-[#32383e] text-[#e9ecef]'
      : 'bg-white border-[#e0e1e2] text-[#212529] shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
  }`;

  const tableBorder = darkMode ? 'border-[#32383e]' : 'border-[#dee2e6]';

  // 1. CURRENT SEMESTER
  if (section === 'current_semester') {
    const totalEcts = CURRENT_SEMESTER_COURSES.reduce((acc, c) => acc + c.ects, 0);
    return (
      <div className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-200 dark:border-[#32383e]">
          <div>
            <h2 className="text-[17px] font-bold">
              {isKa ? 'მიმდინარე სემესტრი (2026-2027 შემოდგომა)' : 'Current Semester (2026-2027 Fall)'}
            </h2>
            <p className="text-[12.5px] text-[#6c757d] mt-0.5">
              {isKa
                ? 'რეგისტრირებული საგნები, დასწრება და შუალედური შეფასებები'
                : 'Registered courses, room assignments, attendance, and intermediate evaluations'}
            </p>
          </div>
          <div className="text-[13px] font-semibold text-[#2185d0] tabular-nums">
            {totalEcts} ECTS
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className={`w-full text-left border-collapse border ${tableBorder} text-[12.5px]`}>
            <thead>
              <tr
                className={
                  darkMode ? 'bg-[#212529] text-[#ced4da]' : 'bg-[#f8f9fa] text-[#495057]'
                }
              >
                <th className={`p-2.5 border ${tableBorder}`}>{isKa ? 'კოდი' : 'Code'}</th>
                <th className={`p-2.5 border ${tableBorder}`}>{isKa ? 'საგანი' : 'Course'}</th>
                <th className={`p-2.5 border ${tableBorder}`}>{isKa ? 'ლექტორი' : 'Lecturer'}</th>
                <th className={`p-2.5 border ${tableBorder}`}>{isKa ? 'ცხრილი / აუდ.' : 'Schedule / Room'}</th>
                <th className={`p-2.5 border ${tableBorder} text-right`}>ECTS</th>
                <th className={`p-2.5 border ${tableBorder} text-right`}>
                  {isKa ? 'დასწრება' : 'Attendance'}
                </th>
              </tr>
            </thead>
            <tbody>
              {CURRENT_SEMESTER_COURSES.map((course) => (
                <tr
                  key={course.code}
                  className={darkMode ? 'hover:bg-[#25292e]' : 'hover:bg-gray-50'}
                >
                  <td className={`p-2.5 border ${tableBorder} font-mono text-[12px] tabular-nums`}>
                    {course.code}
                  </td>
                  <td className={`p-2.5 border ${tableBorder} font-medium text-[#2185d0]`}>
                    {isKa ? course.nameKa : course.nameEn}
                  </td>
                  <td className={`p-2.5 border ${tableBorder}`}>
                    {isKa ? course.lecturerKa : course.lecturerEn}
                  </td>
                  <td className={`p-2.5 border ${tableBorder} tabular-nums`}>
                    {course.scheduleSummary}
                  </td>
                  <td className={`p-2.5 border ${tableBorder} text-right tabular-nums`}>
                    {course.ects}
                  </td>
                  <td className={`p-2.5 border ${tableBorder} text-right tabular-nums font-medium text-[#28a745]`}>
                    {course.attendancePercent}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 2. REGISTRATION
  if (section === 'registration') {
    return (
      <div className={cardClass}>
        <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-[#32383e]">
          <ClipboardList className="w-5 h-5 text-[#2185d0]" />
          <h2 className="text-[17px] font-bold">
            {isKa ? 'აკადემიური რეგისტრაცია' : 'Academic & Course Registration'}
          </h2>
        </div>

        <div className="mt-4 p-4 rounded-[4px] border border-[#28a745]/30 bg-[#28a745]/5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#28a745] shrink-0" />
            <div className="text-[13px]">
              <div className="font-semibold">
                {isKa
                  ? '2026-2027 შემოდგომის სემესტრის რეგისტრაცია აქტიურია'
                  : '2026-2027 Fall Semester Registration Confirmed'}
              </div>
              <div className="text-[#6c757d] text-[12px]">
                {isKa
                  ? 'არჩეულია 7 სასწავლო კურსი (32 ECTS კრედიტი)'
                  : '7 Mandatory/Elective Medical Courses Enrolled (32 ECTS Credits)'}
              </div>
            </div>
          </div>
          <span className="text-[12px] font-medium text-[#28a745] tabular-nums">
            Status: Active
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {CURRENT_SEMESTER_COURSES.map((c) => (
            <div
              key={c.code}
              className={`p-3 rounded-[4px] border ${tableBorder} flex items-center justify-between text-[13px]`}
            >
              <div>
                <span className="font-semibold">{isKa ? c.nameKa : c.nameEn}</span>
                <span className="text-[#6c757d] ml-2 text-[12px]">
                  ({c.code} · {c.room})
                </span>
              </div>
              <span className="text-[#28a745] font-medium text-[12px] tabular-nums">
                {c.ects} ECTS · {isKa ? 'დადასტურებული' : 'Registered'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. SIGNS (GRADES / TRANSCRIPT)
  if (section === 'signs') {
    const totalCredits = TRANSCRIPT_GRADES.reduce((acc, g) => acc + g.ects, 0);
    return (
      <div className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-200 dark:border-[#32383e]">
          <div>
            <h2 className="text-[17px] font-bold">
              {isKa ? 'ნიშნების ფურცელი (Signs / Grades)' : 'Signs (Academic Transcript & Grades)'}
            </h2>
            <p className="text-[12.5px] text-[#6c757d] mt-0.5">
              Sajin Kurattiparambil Saji · V4829164 · School of Medicine
            </p>
          </div>
          <div className="flex items-center gap-4 text-[13px] tabular-nums">
            <span>
              <strong>GPA:</strong> 3.87
            </span>
            <span>·</span>
            <span>
              <strong>ECTS:</strong> {totalCredits}
            </span>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className={`w-full text-left border-collapse border ${tableBorder} text-[12.5px]`}>
            <thead>
              <tr
                className={
                  darkMode ? 'bg-[#212529] text-[#ced4da]' : 'bg-[#f8f9fa] text-[#495057]'
                }
              >
                <th className={`p-2.5 border ${tableBorder}`}>{isKa ? 'სემესტრი' : 'Semester'}</th>
                <th className={`p-2.5 border ${tableBorder}`}>{isKa ? 'საგანი' : 'Course'}</th>
                <th className={`p-2.5 border ${tableBorder} text-right`}>ECTS</th>
                <th className={`p-2.5 border ${tableBorder} text-right`}>{isKa ? 'ქულა' : 'Score'}</th>
                <th className={`p-2.5 border ${tableBorder} text-center`}>{isKa ? 'შეფასება' : 'Grade'}</th>
              </tr>
            </thead>
            <tbody>
              {TRANSCRIPT_GRADES.map((item) => (
                <tr
                  key={item.code}
                  className={darkMode ? 'hover:bg-[#25292e]' : 'hover:bg-gray-50'}
                >
                  <td className={`p-2.5 border ${tableBorder} text-[#6c757d]`}>
                    {isKa ? item.semesterKa : item.semesterEn}
                  </td>
                  <td className={`p-2.5 border ${tableBorder} font-medium`}>
                    {isKa ? item.courseKa : item.courseEn}
                  </td>
                  <td className={`p-2.5 border ${tableBorder} text-right tabular-nums`}>
                    {item.ects}
                  </td>
                  <td className={`p-2.5 border ${tableBorder} text-right tabular-nums font-semibold`}>
                    {item.score}
                  </td>
                  <td className={`p-2.5 border ${tableBorder} text-center font-bold text-[#28a745]`}>
                    {item.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 4. FINANCE
  if (section === 'finance') {
    return (
      <div className={cardClass}>
        <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-[#32383e]">
          <DollarSign className="w-5 h-5 text-[#2185d0]" />
          <h2 className="text-[17px] font-bold">
            {isKa ? 'ფინანსური ბარათი' : 'Student Financial Card'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 tabular-nums">
          <div className={`p-4 rounded-[4px] border ${tableBorder}`}>
            <div className="text-[11.5px] text-[#6c757d] uppercase">
              {isKa ? 'წლიური სწავლის საფასური' : 'Annual Tuition Fee'}
            </div>
            <div className="text-[18px] font-bold mt-1">$5,500.00 USD</div>
          </div>
          <div className={`p-4 rounded-[4px] border ${tableBorder}`}>
            <div className="text-[11.5px] text-[#6c757d] uppercase">
              {isKa ? 'გადახდილი თანხა' : 'Total Paid (2024-2026)'}
            </div>
            <div className="text-[18px] font-bold text-[#28a745] mt-1">$11,000.00 USD</div>
          </div>
          <div className={`p-4 rounded-[4px] border ${tableBorder}`}>
            <div className="text-[11.5px] text-[#6c757d] uppercase">
              {isKa ? 'მიმდინარე დავალიანება' : 'Current Balance Due'}
            </div>
            <div className="text-[18px] font-bold text-[#2185d0] mt-1">$0.00 USD</div>
          </div>
        </div>
      </div>
    );
  }

  // 5. ANNOUNCEMENTS AND NOTICES
  if (section === 'announcements') {
    return (
      <div className={cardClass}>
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-gray-200 dark:border-[#32383e]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#2185d0]" />
            <h2 className="text-[17px] font-bold">
              {isKa ? 'განცხადებები და ცნობები' : 'Announcements and notices'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setNoticeRequested(true)}
            className="px-3.5 py-1.5 bg-[#2185d0] hover:bg-[#1678c2] text-white text-[12px] font-medium rounded-[4px] cursor-pointer"
          >
            {isKa ? '+ ცნობის მოთხოვნა' : '+ Request Student Status Certificate'}
          </button>
        </div>

        {noticeRequested && (
          <div className="mt-4 p-3 rounded-[4px] border border-[#28a745]/40 bg-[#28a745]/10 text-[12.5px] text-[#28a745]">
            {isKa
              ? 'მოთხოვნა სტუდენტის სტატუსის ცნობაზე (ინგლისურ ენაზე) წარმატებით გაიგზავნა.'
              : 'Request for English-language Student Active Status Certificate submitted (#REQ-2026-8841).'}
          </div>
        )}

        <div className="mt-4 space-y-3 text-[13px]">
          <div className={`p-3.5 rounded-[4px] border ${tableBorder}`}>
            <div className="flex items-center justify-between text-[11.5px] text-[#6c757d] mb-1 tabular-nums">
              <span>School of Medicine Dean&apos;s Office</span>
              <span>28/09/2026</span>
            </div>
            <div className="font-semibold">
              {isKa
                ? '2026-2027 სასწავლო წლის შემოდგომის სემესტრის კლინიკური როტაციების ცხრილი'
                : 'Fall 2026 Clinical Practice & Simulation Lab Schedule (Rooms A9, C9, D16, D17, D35)'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. SURVEYS AND FORMS
  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-[#32383e]">
        <FileText className="w-5 h-5 text-[#2185d0]" />
        <h2 className="text-[17px] font-bold">
          {isKa ? 'კითხვარები და ანკეტები' : 'Surveys and forms'}
        </h2>
      </div>
      <div className="mt-4 space-y-2.5 text-[13px]">
        {CURRENT_SEMESTER_COURSES.slice(0, 4).map((course) => {
          const isDone = !!selectedSurveyDone[course.code];
          return (
            <div
              key={course.code}
              className={`p-3 rounded-[4px] border ${tableBorder} flex items-center justify-between gap-2`}
            >
              <div>
                <div className="font-medium">{isKa ? course.nameKa : course.nameEn}</div>
                <div className="text-[12px] text-[#6c757d]">
                  {isKa ? course.lecturerKa : course.lecturerEn}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSelectedSurveyDone({ ...selectedSurveyDone, [course.code]: true })
                }
                className={`px-3 py-1 rounded-[4px] text-[12px] font-medium cursor-pointer ${
                  isDone
                    ? 'bg-gray-200 text-gray-600 dark:bg-[#2c3136] dark:text-gray-300'
                    : 'bg-[#2185d0] text-white hover:bg-[#1678c2]'
                }`}
              >
                {isDone
                  ? isKa
                    ? 'შევსებულია'
                    : 'Completed'
                  : isKa
                    ? 'შევსება'
                    : 'Evaluate'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
