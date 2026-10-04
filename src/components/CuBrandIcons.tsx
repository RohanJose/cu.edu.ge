import React from 'react';

export function CULogo({
  size = 44,
  showText = true,
  className = '',
}: {
  size?: number;
  showText?: boolean;
  className?: string;
}) {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        width={size}
        height={size * 0.78}
        viewBox="0 0 120 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Navy Blue Crest Background */}
        <rect x="2" y="2" width="116" height="90" rx="6" fill="#0F4479" />
        {/* Stylized White CU Wave / Scroll Crest */}
        <path
          d="M22 65C15 52 19 32 38 22C58 11 88 12 104 20C91 19 67 22 50 33C33 44 29 58 43 65C56 71 79 65 96 51L103 61C82 78 52 83 31 73C26 70 23 68 22 65Z"
          fill="#FFFFFF"
        />
        <path
          d="M46 53C41 45 45 34 58 28C71 22 90 23 102 29C89 29 73 32 63 39C53 46 54 55 66 57C76 59 88 53 98 44L102 50C89 62 69 66 54 59C50 57 47 55 46 53Z"
          fill="#FFFFFF"
          fillOpacity="0.92"
        />
      </svg>
      {showText && (
        <div className="mt-1 text-center leading-[1.05]">
          <div className="text-[7px] font-bold tracking-[0.06em] text-[#0F4479] uppercase">
            CAUCASUS UNIVERSITY
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Top Bar Icon 1: Colorful Bookshelf / Library Icon (blue, red, orange leaning books)
 */
export function LibraryBooksIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Book 1: Blue */}
      <rect x="2" y="4" width="4" height="16" rx="0.8" fill="#2185D0" />
      <rect x="2" y="7" width="4" height="1.5" fill="#90CAF9" />
      {/* Book 2: Red */}
      <rect x="7" y="5" width="4" height="15" rx="0.8" fill="#DB2828" />
      <rect x="7" y="8" width="4" height="1.5" fill="#FFCDD2" />
      {/* Book 3: Leaning Orange/Gold */}
      <g transform="rotate(-14 15 12)">
        <rect x="13" y="4" width="4.2" height="16" rx="0.8" fill="#F2711C" />
        <rect x="13" y="7" width="4.2" height="1.5" fill="#FFE0B2" />
      </g>
    </svg>
  );
}

/**
 * Top Bar Icon 2: Classic Gmail Red/White 'M' Envelope Icon
 */
export function GmailMIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="4" width="21" height="16" rx="2" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
      <path d="M2 6L12 13L22 6" stroke="#EA4335" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 5.5V18.5" stroke="#EA4335" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M21.5 5.5V18.5" stroke="#EA4335" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Top Bar Icon 3: Moodle 'm' with Graduation Cap Icon
 */
export function MoodleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mortarboard Cap on top left */}
      <path d="M3 7L11 3.5L19 7L11 10.5L3 7Z" fill="#333333" />
      <path d="M5.5 8.5V11.5C5.5 11.5 8 13 11 13C14 13 16.5 11.5 16.5 11.5V8.5" fill="#4A4A4A" />
      <path d="M4 7.5V12.5" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round" />
      {/* Orange 'm' */}
      <path
        d="M6 20V12.5C6 11.2 7 10.2 8.3 10.2C9.6 10.2 10.6 11.2 10.6 12.5V20M10.6 12.8C10.6 11.3 11.8 10.2 13.2 10.2C14.6 10.2 15.7 11.3 15.7 12.8V20"
        stroke="#F98012"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Top Bar Icon 4: Open Book Guide Icon
 */
export function OpenBookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 5.5C2 4.67 2.67 4 3.5 4H9.5C10.88 4 12 5.12 12 6.5V19.5C12 18.67 11.33 18 10.5 18H3.5C2.67 18 2 17.33 2 16.5V5.5Z"
        fill="#90A4AE"
      />
      <path
        d="M22 5.5C22 4.67 21.33 4 20.5 4H14.5C13.12 4 12 5.12 12 6.5V19.5C12 18.67 12.67 18 13.5 18H20.5C21.33 18 22 17.33 22 16.5V5.5Z"
        fill="#B0BEC5"
      />
      <path d="M4.5 7.5H9.5M4.5 10.5H9.5M4.5 13.5H8" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14.5 7.5H19.5M14.5 10.5H19.5M14.5 13.5H18" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Google 'G' 4-Color Logo for Login Screen
 */
export function GoogleGIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
