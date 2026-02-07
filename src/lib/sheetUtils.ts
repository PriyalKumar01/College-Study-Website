import { useState, useEffect } from 'react';

export interface StudentStory {
    timestamp: string;
    email: string;
    name: string;
    branchBatch: string;
    sgpa: string; // New
    cgpa: string;
    photoUrl: string;
    feedback: string;
    rating: string; // New
    linkedinUrl?: string;
    consent?: string;
}



// Extended fallback data
const FALLBACK_STORIES: StudentStory[] = [
    {
        timestamp: new Date().toISOString(),
        email: "demo@example.com",
        name: "Ajeet Kumar",
        branchBatch: "CSE '29, HBTU",
        sgpa: "9.2",
        cgpa: "9.0",
        photoUrl: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60",
        feedback: "The structured notes and previous year questions (PYQs) were a game changer for me. I could focus on what really mattered for the exams.",
        rating: "5",
        linkedinUrl: "https://www.linkedin.com/",
        consent: "Yes"
    },
    {
        timestamp: new Date().toISOString(),
        email: "demo@example.com",
        name: "Riya Sharma",
        branchBatch: "ECE '28, HBTU",
        sgpa: "9.6",
        cgpa: "9.5",
        photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60",
        feedback: "College Study made complex topics simple. The 3D models helped me visualize concepts that I was struggling with in class.",
        rating: "5",
        linkedinUrl: "https://www.linkedin.com/",
        consent: "Yes"
    },
    {
        timestamp: new Date().toISOString(),
        email: "demo2@example.com",
        name: "Vikram Singh",
        branchBatch: "ME '27, HBTU",
        sgpa: "8.8",
        cgpa: "8.9",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60",
        feedback: "I was worried about my CGPA, but the CGPA calculator and the study roadmap helped me plan my semesters effectively.",
        rating: "5",
        linkedinUrl: "https://www.linkedin.com/",
        consent: "Yes"
    },
    {
        timestamp: new Date().toISOString(),
        email: "demo3@example.com",
        name: "Ananya Gupta",
        branchBatch: "CHE '28, HBTU",
        sgpa: "9.4",
        cgpa: "9.1",
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
        feedback: "The community features allowed me to connect with seniors who guided me through the internship process. Truly invaluable!",
        rating: "5",
        linkedinUrl: "https://www.linkedin.com/",
        consent: "Yes"
    },
    {
        timestamp: new Date().toISOString(),
        email: "demo4@example.com",
        name: "Aryan Patel",
        branchBatch: "IT '29, HBTU",
        sgpa: "9.0",
        cgpa: "8.5",
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60",
        feedback: "Fastest access to notes before exams. It saved me so much time searching for resources.",
        rating: "4",
        linkedinUrl: "https://www.linkedin.com/",
        consent: "Yes"
    }
];

// Helper to convert Google Drive links to viewable Images
// Helper to convert Google Drive links to viewable Images
// Helper to convert Google Drive links to viewable Images
const getGoogleDriveImage = (url: string) => {
    if (!url) return '';

    // Robust regex to find ID in any common Drive URL format
    const idMatch = url.match(/(?:\/d\/|id=)([\w-]+)/);
    const id = idMatch ? idMatch[1] : null;

    if (id) {
        // Return standard crop format for best visuals
        return `https://lh3.googleusercontent.com/d/${id}=w500-h500-c-k-rw-no`;
    }

    // If no ID found (e.g. just a filename "photo.jpg"), return original.
    // The UI (StudentCard) will try to load it, fail, and show Avatar.
    return url;
};

// Helper to calculate batch
const calculateBatch = (yearText: string) => {
    const text = yearText.toLowerCase();
    if (text.includes('1') || text.includes('first')) return "'29";
    if (text.includes('2') || text.includes('second')) return "'28";
    if (text.includes('3') || text.includes('third')) return "'27";
    if (text.includes('4') || text.includes('fourth')) return "'26";
    return "";
};

export const useStudentStories = () => {
    const [stories, setStories] = useState<StudentStory[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ averageRating: "4.9", totalReviews: 0 });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const SHEET_ID = '124vaMaCKRn7G-BEz2mT2vTSIoyk0Zow-j-8uqIIhJi8';
                // User specified GID 214412608
                const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=214412608&t=${Date.now()}`;

                const response = await fetch(SHEET_URL);
                if (!response.ok) throw new Error("Network response was not ok");

                const text = await response.text();
                const rows = parseCSV(text);

                const parsedStories: StudentStory[] = rows
                    .slice(1) // Remove header
                    .map((row): StudentStory | null => {
                        if (row.length < 5) return null;

                        const name = row[2]?.replace(/^"|"$/g, '').trim();

                        // Branch & Year Logic
                        const branch = row[5]?.replace(/^"|"$/g, '').trim() || 'Student';
                        const yearRaw = row[4]?.replace(/^"|"$/g, '').trim() || '';
                        const batchSuffix = calculateBatch(yearRaw);

                        const branchBatch = batchSuffix ? `${branch} ${batchSuffix}` : `${branch}`;

                        // FETCH SGPA (Col 7) and CGPA (Col 8) SEPARATELY
                        const sgpa = row[7]?.replace(/^"|"$/g, '').trim();
                        const cgpa = row[8]?.replace(/^"|"$/g, '').trim();

                        const rawPhoto = row[11]?.replace(/^"|"$/g, '').trim();
                        const firstPhoto = rawPhoto.split(',')[0].trim();
                        let photoUrl = getGoogleDriveImage(firstPhoto);



                        // Feedback = Index 13
                        const feedback = row[13]?.replace(/^"|"$/g, '').trim();

                        // Rating = Index 14
                        const rating = row[14]?.replace(/^"|"$/g, '').trim() || "5";

                        const linkedinUrl = row[9]?.replace(/^"|"$/g, '').trim();
                        const consent = row[15]?.replace(/^"|"$/g, '').trim();

                        return {
                            timestamp: row[0],
                            email: row[1],
                            name: name,
                            branchBatch: branchBatch,
                            sgpa: sgpa, // Export both
                            cgpa: cgpa,
                            photoUrl: photoUrl,
                            feedback: feedback,
                            rating: rating,
                            linkedinUrl: linkedinUrl,
                            consent: consent
                        };
                    })
                    .filter((story): story is StudentStory => {
                        if (!story) return false;
                        const hasName = !!story.name;
                        if (!hasName) return false;
                        const consentVal = story.consent?.toLowerCase() || '';
                        return !consentVal.includes('no');
                    });

                // Deduplicate: Keep only the LATEST submission for each student (by properties)
                // We use a Map to overwrite previous entries with newer ones (assuming rows are chronological)
                const uniqueStoriesMap = new Map<string, StudentStory>();

                parsedStories.forEach(story => {
                    if (!story) return;
                    // Use email as key if available, else name
                    const key = story.email && story.email.includes('@') ? story.email.toLowerCase() : story.name.toLowerCase();
                    uniqueStoriesMap.set(key, story);
                });

                const uniqueStories = Array.from(uniqueStoriesMap.values());

                if (uniqueStories.length === 0) {
                    setStories(FALLBACK_STORIES);
                    setStats({ averageRating: "4.9", totalReviews: FALLBACK_STORIES.length });
                } else {
                    setStories(uniqueStories);
                    // Calculate Average Rating
                    const totalRating = uniqueStories.reduce((acc, story) => acc + (parseFloat(story.rating) || 5), 0);
                    const avg = (totalRating / uniqueStories.length).toFixed(1);
                    setStats({ averageRating: avg, totalReviews: uniqueStories.length });
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching student stories:", err);
                setError("Failed to load stories, using fallback.");
                setStories(FALLBACK_STORIES);
                setStats({ averageRating: "4.9", totalReviews: FALLBACK_STORIES.length });
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    return { stories, loading, error, stats };
};

function parseCSV(text: string): string[][] {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentVal = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') { currentVal += '"'; i++; }
            else { inQuotes = !inQuotes; }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentVal); currentVal = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (currentVal || currentRow.length > 0) { currentRow.push(currentVal); rows.push(currentRow); }
            currentRow = []; currentVal = '';
            if (char === '\r' && nextChar === '\n') i++;
        } else { currentVal += char; }
    }
    if (currentVal || currentRow.length > 0) { currentRow.push(currentVal); rows.push(currentRow); }
    return rows;
}
