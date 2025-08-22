'use client';

import { useState, useEffect } from 'react';

export default function PromotionalBanner() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        days: 5,
        minutes: 59,
        seconds: 35
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                let { hours, days, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            } else {
                                days = 0;
                            }
                        }
                    }
                }

                return { hours, days, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="container pl-[117px] pr-[117px] px-4 py-12">
            <div className="bg-gray-900 overflow-hidden" style={{ aspectRatio: '1170/500' }}>
                <div className="flex items-cente justify-start relative flex-col lg:flex-row h-full">

                    {/* Left Section - Text and CTA */}
                    <div className="flex-1 p-8 lg:p-12 text-white relative z-10 flex flex-col justify-center">
                        <div className="mb-4">
                            <span className="text-green-400 text-xs sm:text-sm font-medium">Categories</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                            Enhance Your<br />
                            Music Experience
                        </h2>

                        {/* Countdown Timer */}
                        <div className="flex gap-2 sm:gap-4 mb-8">
                            <div className="bg-white text-gray-900 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
                                <span className="text-sm sm:text-base lg:text-lg font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                                <span className="text-xs">Hours</span>
                            </div>
                            <div className="bg-white text-gray-900 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
                                <span className="text-sm sm:text-base lg:text-lg font-bold">{timeLeft.days.toString().padStart(2, '0')}</span>
                                <span className="text-xs">Days</span>
                            </div>
                            <div className="bg-white text-gray-900 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
                                <span className="text-sm sm:text-base lg:text-lg font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                                <span className="text-xs">Minutes</span>
                            </div>
                            <div className="bg-white text-gray-900 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
                                <span className="text-sm sm:text-base lg:text-lg font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                                <span className="text-xs">Seconds</span>
                            </div>
                        </div>

                        {/* Call to Action Button */}
                        <button className="bg-green-500 w-fit hover:bg-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-colors">
                            Buy Now!
                        </button>
                    </div>

                    {/* Right Section - Product Image */}
                    <div className="absolute right-0 top-0 w-full h-full">
                        <img
                            src="/ui/homepage/jbl.svg"
                            alt="JBL Speaker"
                            className="w-full h-full object-contain object-right"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}