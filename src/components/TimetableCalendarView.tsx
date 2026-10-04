import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, X, MapPin, User, BookOpen } from 'lucide-react';
import {
  Language,
  ScheduleEvent,
  WEEK_DAYS_28_SEP_TO_4_OCT,
  WEEKLY_SCHEDULE_EVENTS,
} from '../data/cuData';

interface TimetableCalendarViewProps {
  language: Language;
  darkMode: boolean;
}

const HOURS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

const HOUR_HEIGHT = 44; // 44px per hour -> 15 hours = 660px total height, compact & crisp like Video 1

export function TimetableCalendarView({ language, darkMode }: TimetableCalendarViewProps) {
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('week');
  const [weekOffset, setWeekOffset] = useState(0); // 0 = 28.9.2026 - 4.10.2026
  const [selectedDayIdx, setSelectedDayIdx] = useState(6); // 6 = Sun 04/10/2026 (Today in Video 2)
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  const isKa = language === 'ka';

  // Compute week date range label
  const getWeekRangeLabel = () => {
    if (weekOffset === 0) return '28.9.2026 – 4.10.2026';
    if (weekOffset === -1) return '21.9.2026 – 27.9.2026';
    if (weekOffset === 1) return '5.10.2026 – 11.10.2026';
    const baseStart = new Date(2026, 8, 28 + weekOffset * 7);
    const baseEnd = new Date(2026, 9, 4 + weekOffset * 7);
    return `${baseStart.getDate()}.${baseStart.getMonth() + 1}.${baseStart.getFullYear()} – ${baseEnd.getDate()}.${baseEnd.getMonth() + 1}.${baseEnd.getFullYear()}`;
  };

  const getDayDateForOffset = (dayIndex: number, baseDateStr: string) => {
    if (weekOffset === 0) return baseDateStr;
    const base = new Date(2026, 8, 28 + dayIndex + weekOffset * 7);
    const dd = String(base.getDate()).padStart(2, '0');
    const mm = String(base.getMonth() + 1).padStart(2, '0');
    const yyyy = base.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const handlePrev = () => {
    if (viewType === 'day') {
      setSelectedDayIdx((prev) => (prev > 0 ? prev - 1 : 6));
    } else {
      setWeekOffset((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (viewType === 'day') {
      setSelectedDayIdx((prev) => (prev < 6 ? prev + 1 : 0));
    } else {
      setWeekOffset((prev) => prev + 1);
    }
  };

  const handleToday = () => {
    setWeekOffset(0);
    setSelectedDayIdx(6);
  };

  const currentDayObj = WEEK_DAYS_28_SEP_TO_4_OCT[selectedDayIdx];
  const dayEvents = WEEKLY_SCHEDULE_EVENTS.filter((ev) => ev.dayIndex === selectedDayIdx);

  return (
    <div
      className={`w-full rounded-[4px] border p-2.5 sm:p-4 transition-colors ${
        darkMode
          ? 'bg-[#1b1e21] border-[#32383e] text-[#e9ecef]'
          : 'bg-white border-[#e0e1e2] text-[#212529]'
      }`}
    >
      {/* FullCalendar Header Toolbar matching Video 1 (00:02) & Video 2 (00:08) */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {/* Left: Prev / Next + Today */}
        <div className="flex items-center gap-1.5">
          <div className="inline-flex rounded-[3px] overflow-hidden border border-[#1a252f]">
            <button
              type="button"
              onClick={handlePrev}
              className="bg-[#2c3e50] hover:bg-[#1e2b37] text-white px-2.5 py-1.5 flex items-center justify-center border-r border-[#1a252f] cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#2c3e50] hover:bg-[#1e2b37] text-white px-2.5 py-1.5 flex items-center justify-center cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleToday}
            className="bg-[#5a6268] hover:bg-[#4e555b] text-white text-[12px] sm:text-[13px] font-normal px-2.5 py-1 rounded-[3px] cursor-pointer"
          >
            {isKa ? 'დღეს' : viewType === 'day' && darkMode ? 'today' : 'Today'}
          </button>
        </div>

        {/* Center: Date Range Title */}
        <h2
          className={`text-[15px] sm:text-[18px] font-normal tracking-tight tabular-nums ${
            darkMode ? 'text-[#f8f9fa]' : 'text-[#212529]'
          }`}
        >
          {viewType === 'day'
            ? selectedDayIdx === 6
              ? '10/4/2026'
              : currentDayObj.dateStr
            : viewType === 'month'
              ? isKa
                ? 'ოქტომბერი 2026'
                : 'October 2026'
              : getWeekRangeLabel()}
        </h2>

        {/* Right: Month | Sunday (Week) | Day Buttons */}
        <div className="inline-flex rounded-[3px] overflow-hidden border border-[#1a252f]">
          <button
            type="button"
            onClick={() => setViewType('month')}
            className={`px-2.5 py-1 text-[12px] sm:text-[13px] text-white border-r border-[#1a252f] cursor-pointer transition-colors ${
              viewType === 'month' ? 'bg-[#1a252f] font-medium' : 'bg-[#2c3e50] hover:bg-[#1e2b37]'
            }`}
          >
            {isKa ? 'თვე' : viewType === 'day' && darkMode ? 'month' : 'Month'}
          </button>
          <button
            type="button"
            onClick={() => setViewType('week')}
            className={`px-2.5 py-1 text-[12px] sm:text-[13px] text-white border-r border-[#1a252f] cursor-pointer transition-colors ${
              viewType === 'week' ? 'bg-[#1a252f] font-medium' : 'bg-[#2c3e50] hover:bg-[#1e2b37]'
            }`}
          >
            {isKa ? 'კვირა' : viewType === 'day' && darkMode ? 'week' : 'Sunday'}
          </button>
          <button
            type="button"
            onClick={() => setViewType('day')}
            className={`px-2.5 py-1 text-[12px] sm:text-[13px] text-white cursor-pointer transition-colors ${
              viewType === 'day' ? 'bg-[#1a252f] font-medium' : 'bg-[#2c3e50] hover:bg-[#1e2b37]'
            }`}
          >
            {isKa ? 'დღე' : viewType === 'day' && darkMode ? 'day' : 'Day'}
          </button>
        </div>
      </div>

      {/* VIEW 1: WEEKLY TIMETABLE GRID (Exact Carbon Copy of Video 1: 00:02 - 00:29) */}
      {viewType === 'week' && (
        <div className="w-full overflow-x-auto">
          <div
            className={`w-full min-w-[340px] border ${
              darkMode ? 'border-[#383f45]' : 'border-[#dddddd]'
            }`}
          >
            {/* Table Header Row: Day | Mon 28/09/2026 ... Sun 04/10/2026 */}
            <div
              className={`grid grid-cols-[42px_repeat(7,minmax(0,1fr))] sm:grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b ${
                darkMode ? 'border-[#383f45] bg-[#212529]' : 'border-[#dddddd] bg-white'
              }`}
            >
              <div
                className={`py-2 px-1 text-center text-[10px] sm:text-[12px] font-bold flex items-center justify-center border-r ${
                  darkMode
                    ? 'border-[#383f45] text-[#e9ecef]'
                    : 'border-[#dddddd] text-[#212529]'
                }`}
              >
                {isKa ? 'დღე' : 'Day'}
              </div>

              {WEEK_DAYS_28_SEP_TO_4_OCT.map((day) => {
                const displayDate = getDayDateForOffset(day.dayIndex, day.dateStr);
                const isSunToday = day.isToday && weekOffset === 0;
                return (
                  <button
                    key={day.dayIndex}
                    type="button"
                    onClick={() => {
                      setSelectedDayIdx(day.dayIndex);
                      setViewType('day');
                    }}
                    className={`py-1.5 px-0.5 text-center border-r last:border-r-0 leading-tight cursor-pointer transition-colors ${
                      darkMode ? 'border-[#383f45]' : 'border-[#dddddd]'
                    } ${
                      isSunToday
                        ? darkMode
                          ? 'bg-[#2c2a1c]'
                          : 'bg-[#fffadf]'
                        : darkMode
                          ? 'hover:bg-[#2a2e33]'
                          : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-[10px] sm:text-[12px] font-semibold text-[#0066cc] hover:underline">
                      {isKa ? day.shortKa : day.shortEn}
                    </div>
                    <div className="text-[8.5px] sm:text-[11px] font-semibold text-[#0066cc] hover:underline tabular-nums tracking-tighter">
                      {displayDate}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Time Grid Body (08:00 to 22:00) */}
            <div className="relative grid grid-cols-[42px_repeat(7,minmax(0,1fr))] sm:grid-cols-[56px_repeat(7,minmax(0,1fr))]">
              {/* Left Time Axis Column */}
              <div
                className={`border-r select-none ${
                  darkMode ? 'border-[#383f45] bg-[#1b1e21]' : 'border-[#dddddd] bg-white'
                }`}
              >
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    style={{ height: `${HOUR_HEIGHT}px` }}
                    className={`border-b last:border-b-0 flex flex-col justify-start items-end pr-1.5 pt-0.5 text-[9.5px] sm:text-[11px] tabular-nums ${
                      darkMode
                        ? 'border-[#383f45] text-[#adb5bd]'
                        : 'border-[#dddddd] text-[#333333]'
                    }`}
                  >
                    <span>{hour}</span>
                  </div>
                ))}
              </div>

              {/* 7 Day Columns with Hour/Half-Hour Grid Lines & Blue Course Blocks */}
              {WEEK_DAYS_28_SEP_TO_4_OCT.map((day) => {
                const isSunToday = day.isToday && weekOffset === 0;
                const colEvents = WEEKLY_SCHEDULE_EVENTS.filter(
                  (ev) => ev.dayIndex === day.dayIndex
                );

                return (
                  <div
                    key={day.dayIndex}
                    className={`relative border-r last:border-r-0 ${
                      darkMode ? 'border-[#383f45]' : 'border-[#dddddd]'
                    } ${
                      isSunToday
                        ? darkMode
                          ? 'bg-[#2c2a1c]/70'
                          : 'bg-[#fffadf]'
                        : darkMode
                          ? 'bg-[#1b1e21]'
                          : 'bg-white'
                    }`}
                    style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
                  >
                    {/* Background Hour & Half-hour slots */}
                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        style={{ height: `${HOUR_HEIGHT}px` }}
                        className={`border-b last:border-b-0 flex flex-col ${
                          darkMode ? 'border-[#383f45]' : 'border-[#dddddd]'
                        }`}
                      >
                        {/* Half-hour dotted line */}
                        <div
                          className={`h-1/2 border-b border-dotted ${
                            darkMode ? 'border-[#2d3339]' : 'border-[#ececec]'
                          }`}
                        />
                        <div className="h-1/2" />
                      </div>
                    ))}

                    {/* Blue Schedule Event Blocks */}
                    {colEvents.map((ev) => {
                      const topPx = (ev.startHour - 8) * HOUR_HEIGHT;
                      const heightPx = ev.durationHours * HOUR_HEIGHT - 1;

                      return (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => setSelectedEvent(ev)}
                          style={{
                            top: `${topPx}px`,
                            height: `${heightPx}px`,
                          }}
                          className="absolute left-[1px] right-[1px] z-10 bg-[#0062e3] hover:bg-[#0054c4] border border-[#004eb5] text-white rounded-[2px] p-0.5 sm:p-1.5 text-left overflow-hidden flex flex-col justify-start shadow-2xs transition-colors cursor-pointer"
                        >
                          <div className="text-[7.5px] sm:text-[11px] font-bold leading-[1.12] break-words">
                            {isKa ? ev.titleKa : ev.titleEn}
                          </div>
                          <div className="mt-0.5 flex items-center gap-0.5 text-[6.5px] sm:text-[10px] leading-tight opacity-95 tabular-nums flex-wrap">
                            <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 inline" />
                            <span>
                              {ev.startTime}-{ev.endTime},
                            </span>
                          </div>
                          <div className="text-[7px] sm:text-[10px] font-semibold underline leading-tight mt-0.5">
                            {ev.room}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: DAY TIMETABLE VIEW (Exact Carbon Copy of Video 2: 00:08 - 00:09) */}
      {viewType === 'day' && (
        <div
          className={`w-full border ${
            darkMode ? 'border-[#495057] bg-[#1b1e21]' : 'border-[#dddddd] bg-white'
          }`}
        >
          {/* Single Day Header */}
          <div
            className={`py-2 px-3 text-center border-b ${
              darkMode ? 'border-[#495057]' : 'border-[#dddddd]'
            }`}
          >
            <span className="text-[#2185d0] underline font-semibold text-[14px] tabular-nums">
              {isKa ? currentDayObj.shortKa : currentDayObj.shortEn} {currentDayObj.dateStr}
            </span>
          </div>

          {/* All-day row */}
          <div
            className={`grid grid-cols-[64px_1fr] border-b ${
              darkMode ? 'border-[#495057]' : 'border-[#dddddd]'
            }`}
          >
            <div
              className={`py-3 px-2 text-center text-[13px] border-r ${
                darkMode
                  ? 'border-[#495057] text-[#e9ecef]'
                  : 'border-[#dddddd] text-[#333333]'
              }`}
            >
              {isKa ? 'მთელი დღე' : 'all-day'}
            </div>
            <div
              className={
                currentDayObj.isToday
                  ? darkMode
                    ? 'bg-[#2a281d]/60'
                    : 'bg-[#fffadf]'
                  : ''
              }
            />
          </div>

          {/* Hourly Rows */}
          <div className="relative grid grid-cols-[64px_1fr]">
            <div
              className={`border-r ${
                darkMode ? 'border-[#495057]' : 'border-[#dddddd]'
              }`}
            >
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  style={{ height: '56px' }}
                  className={`border-b last:border-b-0 px-2 pt-1 text-right text-[13px] tabular-nums ${
                    darkMode
                      ? 'border-[#495057] text-[#e9ecef]'
                      : 'border-[#dddddd] text-[#333333]'
                  }`}
                >
                  {hour}
                </div>
              ))}
            </div>

            <div
              className={`relative ${
                currentDayObj.isToday
                  ? darkMode
                    ? 'bg-[#2a281d]/50'
                    : 'bg-[#fffadf]'
                  : ''
              }`}
              style={{ height: `${HOURS.length * 56}px` }}
            >
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  style={{ height: '56px' }}
                  className={`border-b last:border-b-0 flex flex-col ${
                    darkMode ? 'border-[#495057]' : 'border-[#dddddd]'
                  }`}
                >
                  <div
                    className={`h-1/2 border-b border-dotted ${
                      darkMode ? 'border-[#343a40]' : 'border-[#e9ecef]'
                    }`}
                  />
                  <div className="h-1/2" />
                </div>
              ))}

              {dayEvents.map((ev) => {
                const topPx = (ev.startHour - 8) * 56;
                const heightPx = ev.durationHours * 56 - 2;
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setSelectedEvent(ev)}
                    style={{ top: `${topPx}px`, height: `${heightPx}px` }}
                    className="absolute left-1 right-2 z-10 bg-[#0062e3] hover:bg-[#0054c4] text-white rounded-[3px] p-2 text-left shadow-sm cursor-pointer"
                  >
                    <div className="font-bold text-[13px]">
                      {isKa ? ev.titleKa : ev.titleEn}
                    </div>
                    <div className="text-[12px] flex items-center gap-1 mt-0.5 tabular-nums">
                      <Clock className="w-3 h-3" />
                      <span>
                        {ev.startTime}-{ev.endTime},
                      </span>
                      <span className="underline font-semibold ml-1">{ev.room}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MONTH VIEW */}
      {viewType === 'month' && (
        <div
          className={`w-full border ${
            darkMode ? 'border-[#383f45]' : 'border-[#dddddd]'
          }`}
        >
          <div
            className={`grid grid-cols-7 border-b text-center text-[12px] font-semibold ${
              darkMode
                ? 'border-[#383f45] bg-[#212529] text-[#0066cc]'
                : 'border-[#dddddd] bg-gray-50 text-[#0066cc]'
            }`}
          >
            {WEEK_DAYS_28_SEP_TO_4_OCT.map((d) => (
              <div
                key={d.dayIndex}
                className={`py-2 border-r last:border-r-0 ${
                  darkMode ? 'border-[#383f45]' : 'border-[#dddddd]'
                }`}
              >
                {isKa ? d.shortKa : d.shortEn}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {Array.from({ length: 28 }, (_, idx) => {
              const dayIndex = idx % 7;
              const dateNum = ((27 + idx) % 30) + 1;
              const dayCourseList = WEEKLY_SCHEDULE_EVENTS.filter(
                (ev) => ev.dayIndex === dayIndex
              );
              const isTodayCell = idx === 6;

              return (
                <div
                  key={idx}
                  className={`min-h-[92px] p-1.5 border-r border-b last:border-r-0 ${
                    darkMode ? 'border-[#383f45]' : 'border-[#dddddd]'
                  } ${
                    isTodayCell
                      ? darkMode
                        ? 'bg-[#2c2a1c]'
                        : 'bg-[#fffadf]'
                      : ''
                  }`}
                >
                  <div className="text-right text-[11px] text-[#0066cc] font-medium tabular-nums mb-1">
                    {dateNum}
                  </div>
                  <div className="space-y-1">
                    {dayCourseList.map((ev) => (
                      <button
                        key={`${idx}-${ev.id}`}
                        type="button"
                        onClick={() => setSelectedEvent(ev)}
                        className="w-full text-left bg-[#0062e3] hover:bg-[#0054c4] text-white text-[9.5px] px-1 py-0.5 rounded-[2px] truncate cursor-pointer"
                      >
                        <span className="font-semibold">{ev.startTime}</span>{' '}
                        {isKa ? ev.titleKa : ev.titleEn} ({ev.room})
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Course Lecture Detail Modal when clicking any blue schedule block */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className={`w-full max-w-md rounded-[6px] border shadow-xl overflow-hidden ${
              darkMode
                ? 'bg-[#212529] border-[#383f45] text-[#f8f9fa]'
                : 'bg-white border-gray-200 text-[#212529]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0062e3] text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold text-[15px]">
                {isKa ? selectedEvent.titleKa : selectedEvent.titleEn}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-[13px]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#0062e3] shrink-0" />
                <span className="tabular-nums font-medium">
                  {selectedEvent.dateStr} · {selectedEvent.startTime}–{selectedEvent.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0062e3] shrink-0" />
                <span>
                  {isKa ? 'აუდიტორია:' : 'Auditorium / Room:'}{' '}
                  <strong className="underline">{selectedEvent.room}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#0062e3] shrink-0" />
                <span>
                  {isKa ? 'ლექტორი:' : 'Lecturer:'}{' '}
                  <strong>
                    {isKa ? selectedEvent.lecturerKa : selectedEvent.lecturerEn}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#0062e3] shrink-0" />
                <span>
                  {isKa ? selectedEvent.typeKa : selectedEvent.typeEn} · {selectedEvent.ects} ECTS
                </span>
              </div>
            </div>
            <div
              className={`px-4 py-2.5 border-t flex justify-end ${
                darkMode ? 'border-[#383f45] bg-[#1b1e21]' : 'border-gray-100 bg-gray-50'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-1.5 bg-[#0062e3] hover:bg-[#0052bf] text-white text-[12px] font-medium rounded-[4px] cursor-pointer"
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
