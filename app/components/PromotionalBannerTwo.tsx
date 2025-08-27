'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
        <section className="container px-4 lg:pl-[117px] lg:pr-[117px] py-8 sm:py-12">
            <div className="bg-gray-900 overflow-hidden rounded-lg" style={{ aspectRatio: '1170/500' }}>
                <div className="flex items-center justify-start relative flex-col lg:flex-row h-full">

                    {/* Left Section - Text and CTA */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-12 text-white relative z-10 flex flex-col justify-center">
                        <div className="mb-3 sm:mb-4">
                            <span className="text-green-400 text-xs sm:text-sm font-medium">Categories</span>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
                            Enhance Your<br />
                            Music Experience
                        </h2>

                        {/* Countdown Timer */}
                        <div className="flex gap-1 sm:gap-2 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                            <div className="bg-white text-gray-900 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
                                <span className="text-xs sm:text-sm lg:text-lg font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                                <span className="text-xs">Hours</span>
                            </div>
                            <div className="bg-white text-gray-900 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
                                <span className="text-xs sm:text-sm lg:text-lg font-bold">{timeLeft.days.toString().padStart(2, '0')}</span>
                                <span className="text-xs">Days</span>
                            </div>
                            <div className="bg-white text-gray-900 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
                                <span className="text-xs sm:text-sm lg:text-lg font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                                <span className="text-xs">Minutes</span>
                            </div>
                            <div className="bg-white text-gray-900 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
                                <span className="text-xs sm:text-sm lg:text-lg font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                                <span className="text-xs">Seconds</span>
                            </div>
                        </div>

                        {/* Call to Action Button */}
                        <button className="bg-green-500 w-fit hover:bg-green-600 text-white px-3 sm:px-4 lg:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-colors">
                            Buy Now!
                        </button>
                    </div>

                    {/* Right Section - Product Image */}
                    <div className="absolute right-0 top-0 w-full h-full">
                        <Image
                            src="/ui/homepage/jbl.svg"
                            alt="JBL Speaker"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain object-right"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}