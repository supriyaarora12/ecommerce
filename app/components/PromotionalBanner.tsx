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
            <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
                <div className="max-w-[1330px] w-full px-8 mx-auto flex items-center justify-between">

                    {/* Promotional text */}
                    <div className="flex-1 text-center">
                        <span className="text-sm">
                            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
                            <a href="#" className="underline hover:text-gray-300 transition-colors">
                                ShopNow
                            </a>
                        </span>
                    </div>

                    {/* Language dropdown */}
                    <div className="relative  m-[-38px] ml-4">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-1 text-sm hover:text-gray-300 transition-colors"
                        >
                            <span>{selectedLanguage.name}</span>
                            <svg
                                className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                            <div className="absolute right-0 top-full mt-1 bg-white text-black rounded-md shadow-lg border border-gray-200 min-w-32 z-50">
                                {languages.map((language) => (
                                    <button
                                        key={language.code}
                                        onClick={() => {
                                            setSelectedLanguage(language);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${selectedLanguage.code === language.code ? 'bg-gray-100' : ''
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
