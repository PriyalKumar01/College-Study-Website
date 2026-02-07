
import React from 'react';
import { Quote, Linkedin, Award, Star } from 'lucide-react';
import { StudentStory } from '@/lib/sheetUtils';
import { cn } from "@/lib/utils";

export const StudentCard = ({ student }: { student: StudentStory }) => {
    const displayPhoto = student.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random&size=200`;
    const formattedBranch = `(${student.branchBatch}${student.branchBatch.toLowerCase().includes('hbtu') ? '' : ', HBTU'})`;

    // Metrc Logic: Show SGPA if > CGPA, else CGPA (or if SGPA missing)
    let metricValue = student.cgpa;
    let metricLabel = "CGPA";

    const s = parseFloat(student.sgpa || '0');
    const c = parseFloat(student.cgpa || '0');

    if (s > c) {
        metricValue = student.sgpa;
        metricLabel = "SGPA";
    }

    // Rating Logic
    const ratingVal = parseInt(student.rating) || 5;
    const stars = Array(5).fill(0).map((_, i) => i < ratingVal);

    // IMAGE FALLBACK LOGIC
    // 1. Try initial photoUrl (Standard lh3...crop)
    // 2. If error, try Direct Drive Link (uc?export=view)
    // 3. If error, fallback to UI Avatars
    const [imgSrc, setImgSrc] = React.useState(displayPhoto);

    // Reset image when student changes (e.g. carousel slide)
    React.useEffect(() => {
        setImgSrc(displayPhoto);
    }, [displayPhoto]);

    const handleImageError = () => {
        // If currently using the primary lh3 link, try the backup
        if (imgSrc && imgSrc.includes('lh3.googleusercontent.com')) {
            // Extract ID
            let id = '';
            const match = imgSrc.match(/\/d\/([^=]+)/);
            if (match) id = match[1];

            if (id) {
                // Switch to Direct Link
                setImgSrc(`https://drive.google.com/uc?export=view&id=${id}`);
                return;
            }
        }

        // If already on backup or can't parse ID, switch to Avatar
        setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random&size=200`);
    };

    return (
        <div className="group relative w-full h-full min-h-[350px] md:min-h-[420px] mx-auto transition-all duration-500 hover:-translate-y-2 p-4 cursor-default">

            {/* INVERTED THEME */}
            <div className="relative h-full bg-[#1a1f2e] dark:bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center pt-8 md:pt-12 pb-6 md:pb-8 px-5 md:px-6 border border-gray-800 dark:border-gray-200">

                {/* Background Decor */}
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent dark:from-blue-50/50 opacity-50"></div>

                {/* BRANDING */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white dark:text-gray-900 whitespace-nowrap">
                        College Study
                    </span>
                </div>

                {/* LINKEDIN ICON: Top Right */}
                {student.linkedinUrl && (
                    <a
                        href={student.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-6 right-6 p-2 bg-white/10 dark:bg-gray-100/50 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-full transition-all duration-300 z-30 group/linkedin"
                        title="View LinkedIn Profile"
                    >
                        <Linkedin className="w-5 h-5 text-blue-400 dark:text-blue-600 group-hover/linkedin:text-white" />
                    </a>
                )}

                {/* Profile Image with Ring */}
                <div className="relative mb-6 mt-2">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative w-36 h-36 p-1 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500">
                        {student.linkedinUrl ? (
                            <a href={student.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imgSrc}
                                    alt={student.name}
                                    onError={handleImageError}
                                    className="w-full h-full rounded-full object-cover border-4 border-[#1a1f2e] dark:border-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
                                />
                            </a>
                        ) : (
                            <img
                                src={imgSrc}
                                alt={student.name}
                                onError={handleImageError}
                                className="w-full h-full rounded-full object-cover border-4 border-[#1a1f2e] dark:border-white shadow-lg"
                            />
                        )}

                        {/* METRIC BADGE (CGPA/SGPA) */}
                        <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 bg-white dark:bg-[#1a1f2e] px-4 py-1.5 rounded-full shadow-lg border border-blue-100 dark:border-blue-900 flex items-center gap-1.5 whitespace-nowrap z-20">
                            <span className="text-blue-600 dark:text-blue-400 font-black text-sm md:text-base tracking-tight">
                                {metricValue}
                            </span>
                            <span className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{metricLabel}</span>
                        </div>
                    </div>
                </div>

                {/* Name & Info */}
                <div className="mb-6 mt-4 w-full text-center">
                    <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-1">
                        {student.linkedinUrl ? (
                            <a
                                href={student.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 dark:hover:text-blue-600 transition-colors"
                            >
                                {student.name}
                            </a>
                        ) : (
                            student.name
                        )}
                    </h3>
                    <p className="text-sm font-medium text-gray-400 dark:text-gray-600 mt-0.5">
                        {formattedBranch}
                    </p>

                    {/* Star Rating */}
                    <div className="flex items-center justify-center gap-1 mt-3">
                        {stars.map((filled, i) => (
                            <Star
                                key={i}
                                className={cn("w-4 h-4", filled ? "text-yellow-400 fill-yellow-400" : "text-gray-600 dark:text-gray-300")}
                            />
                        ))}
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="relative w-full mt-auto bg-gray-800/50 dark:bg-gray-50 rounded-2xl p-6 border border-gray-700 dark:border-gray-200 flex flex-col justify-center">
                    <Quote className="absolute -top-3 left-6 w-6 h-6 text-blue-400/30 fill-blue-400/10 bg-[#1a1f2e] dark:bg-white p-0.5 rounded-full ring-4 ring-[#1a1f2e] dark:ring-white" />
                    <p className="text-center text-sm text-gray-300 dark:text-gray-600 italic leading-relaxed">
                        "{student.feedback}"
                    </p>
                </div>

            </div>
        </div>
    );
};
