'use client';

import { useState } from 'react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
];

export default function PromotionalBanner() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <div className="relative">
            {/* Main banner */}
            <div className="bg-black text-white px-2 sm:px-4 py-2 sm:py-3">
                <div className="max-w-[1330px] w-full px-2 sm:px-4 lg:px-8 mx-auto flex items-center justify-between">
                    {/* Promotional text */}
                    <div className="flex-1 text-center">
                        <span className="text-xs sm:text-sm leading-tight">
                            <span className="hidden sm:inline">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
                            <span className="sm:hidden">Summer Sale - OFF 50%!</span>
                            {' '}
                            <a href="#" className="underline hover:text-gray-300 transition-colors">
                                ShopNow
                            </a>
                        </span>
                    </div>

                    {/* Language dropdown */}
                    <div className="relative ml-2 sm:ml-4 lg:mr-[115px]">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-1 text-xs sm:text-sm hover:text-gray-300 transition-colors whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">{selectedLanguage.name}</span>
                            <span className="sm:hidden">EN</span>
                            <svg
                                className={`w-2 h-2 sm:w-3 sm:h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-1 bg-white text-black rounded-md shadow-lg border border-gray-200 min-w-20 sm:min-w-24 lg:min-w-32 z-50">
                                {languages.map((language) => (
                                    <button
                                        key={language.code}
                                        onClick={() => {
                                            setSelectedLanguage(language);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`block w-full text-left px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 transition-colors ${selectedLanguage.code === language.code ? 'bg-gray-100' : ''
                                            }`}
                                    >
                                        {language.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
