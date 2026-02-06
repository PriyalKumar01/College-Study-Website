
import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Loader2, PenTool, AlertCircle, Quote, Star, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { useStudentStories } from '@/lib/sheetUtils';
import { StudentCard } from './StudentCard';

// Using the form URL found in codebase or previous context
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf3BLvOyTH5oIkldD7tsCzmOhTp1zI-9CNDWGjMTgbnXu55FA/viewform";

const StudentSuccessStories = () => {
    // Now returns stats too!
    const { stories, loading, stats } = useStudentStories();

    // Carousel with Autoplay 
    // stopOnInteraction: false -> Auto resume? 'autoplay' plugin needs 'stopOnInteraction: false' to continue after click.
    // User asked: "jab hover ya click ho card par tab thodi der ruke fir se auto slide hota rahe"
    // 'stopOnMouseEnter: true' -> Pauses on hover, resumes on leave.
    // 'stopOnInteraction: false' -> If true (default), it stops forever after interaction. So we set FALSE.
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false,
        dragFree: true
    }, [
        Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
    ]);

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    const hasStories = stories.length > 0;

    // State for dots
    const [selectedIndex, setSelectedIndex] = useState(0);
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        });
    }, [emblaApi]);

    // Local Rate Us State (Visual only)
    const [userRating, setUserRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);

    const handleRate = (starIndex: number) => {
        if (hasRated) return;
        setUserRating(starIndex + 1);
        setHasRated(true);
        // In a real app, send to backend here.
    };

    return (
        <section className="py-24 bg-white dark:bg-[#0a0f1c] transition-colors duration-300 relative z-30">
            {/* Header */}
            <div className="container mx-auto px-4 relative z-40">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        College Study <span className="text-blue-600 dark:text-blue-500">Academic Achievers</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Hear from students who achieved their academic goals with our platform.
                    </p>
                </div>
            </div>

            {/* MAIN CONTAINER BOX (Requested "Like Everything section") */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
                {/* This wrapper mimics the "Everything" section style EXACTLY */}
                <div className="bg-white dark:bg-card rounded-3xl shadow-xl border border-gray-100 dark:border-border p-8 md:p-12 relative overflow-hidden">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative min-h-[550px]">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                                <p className="text-muted-foreground">Loading success stories...</p>
                            </div>
                        ) : hasStories ? (
                            <>
                                {/* Navigation Buttons - Repositioned for clarity */}
                                <button
                                    className="absolute -left-4 md:-left-6 top-[50%] -translate-y-1/2 z-30 p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-110 hover:bg-blue-600 hover:text-white transition-all duration-300 hidden md:flex items-center justify-center group"
                                    onClick={scrollPrev}
                                    aria-label="Previous Slide"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-white" />
                                </button>
                                <button
                                    className="absolute -right-4 md:-right-6 top-[50%] -translate-y-1/2 z-30 p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-110 hover:bg-blue-600 hover:text-white transition-all duration-300 hidden md:flex items-center justify-center group"
                                    onClick={scrollNext}
                                    aria-label="Next Slide"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-white" />
                                </button>

                                <div className="overflow-hidden py-4 px-2" ref={emblaRef}>
                                    <div className="flex touch-pan-y gap-6 ml-0">
                                        {stories.map((student, index) => (
                                            <div
                                                className="flex-[0_0_auto] min-w-0 relative w-[90%] md:w-[70%] lg:w-[48%]"
                                                key={`${student.name}-${index}`}
                                            >
                                                <div className="h-full px-2">
                                                    <StudentCard student={student} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pagination Dots */}
                                <div className="flex justify-center mt-6 gap-2">
                                    {stories.slice(0, 5).map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "w-2 h-2 rounded-full transition-all duration-300",
                                                idx === (selectedIndex % 5) ? "bg-blue-600 w-6" : "bg-gray-300 dark:bg-gray-700"
                                            )}
                                        />
                                    ))}
                                    {stories.length > 5 && (
                                        <span className="text-xs text-gray-400 self-center tracking-widest pl-1">•••</span>
                                    )}
                                </div>

                            </>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Bottom Actions & Stats - Wrapped in Box */}
            <div className="mt-12 container mx-auto px-4 relative z-30">
                <div className="max-w-[1200px] mx-auto bg-white dark:bg-card rounded-3xl shadow-xl border border-gray-100 dark:border-border p-8 md:p-10 relative overflow-hidden flex flex-col gap-8">

                    {/* Gradient Decor */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-pink-500"></div>

                    {/* Row 1: Imp Notes + Button */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                        {/* Imp Notes */}
                        <div className="flex items-start gap-4 max-w-2xl bg-orange-50 dark:bg-orange-900/10 p-5 rounded-2xl border border-orange-100 dark:border-orange-900/30 w-full lg:w-auto flex-1">
                            <div className="mt-1 flex-shrink-0">
                                <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                                    Imp. Notes:
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Fill <span className="font-bold text-blue-600 dark:text-blue-400">Academic Achievers form</span> and <span className="font-bold text-green-600 dark:text-green-400">Get a chance to be featured</span> in 'College Study Academic Achievers'.
                                </p>
                            </div>
                        </div>

                        {/* CTA Button with Click Animation */}
                        <div className="relative flex-shrink-0 group">
                            {/* Clicking Finger Animation */}
                            <div className="absolute -left-12 top-1/2 -translate-y-1/2 animate-bounce hidden md:block">
                                <span className="text-3xl">👉</span>
                            </div>

                            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-6 h-auto text-base relative overflow-hidden group-hover:scale-105">
                                    <PenTool className="w-5 h-5 mr-2" />
                                    Join Hall of Fame
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

                    {/* Row 2: Ratings in one line */}
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">

                        {/* Global Rating */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                <span className="text-4xl font-black text-gray-900 dark:text-white">
                                    {stats?.averageRating || "4.9"}
                                </span>
                                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                            </div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Rating</p>
                        </div>

                        <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

                        {/* Active Learners */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                <span className="text-4xl font-black text-gray-900 dark:text-white">1.89K+</span>
                                <Users className="w-8 h-8 text-blue-500" />
                            </div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Learners</p>
                        </div>

                        <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

                        {/* Interactive Rate Us */}
                        <div className="flex flex-col items-center">
                            <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Rate your experience</p>
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleRate(i)}
                                        className={cn(
                                            "transition-all duration-200 hover:scale-125 focus:outline-none",
                                            (hasRated ? i < userRating : false) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 hover:text-yellow-400"
                                        )}
                                        disabled={hasRated}
                                    >
                                        <Star className={cn("w-6 h-6", (hasRated && i < userRating) && "fill-current")} />
                                    </button>
                                ))}
                            </div>
                            {hasRated && <span className="text-xs text-green-500 mt-1 font-bold animate-fade-in">Thanks for rating!</span>}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default StudentSuccessStories;
