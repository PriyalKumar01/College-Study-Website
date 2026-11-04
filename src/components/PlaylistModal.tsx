import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Star, ListVideo, AlertCircle } from 'lucide-react';

export interface Playlist {
  title: string;
  url: string;
  recommended?: boolean;
}

export interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subjectName?: string;
  playlists?: Playlist[] | Record<string, any>;
  subjectPlaylists?: Record<string, { detailed?: Playlist[]; oneshot?: Playlist[]; workshop?: Playlist[] }>;
  type?: 'detailed' | 'oneshot' | 'workshop';
  playlistType?: 'detailed' | 'oneshot' | 'workshop';
}

// Generate consistent gradient based on string
const getGradient = (str: string, index: number) => {
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-purple-600',
    'from-amber-500 to-orange-600',
    'from-lime-500 to-green-600',
    'from-fuchsia-500 to-pink-600',
  ];
  return gradients[index % gradients.length];
};

export const PlaylistModal = ({
  isOpen,
  onClose,
  title,
  subjectName,
  playlists,
  subjectPlaylists,
  type,
  playlistType
}: PlaylistModalProps) => {
  const modalTitle = title || subjectName || 'Playlists';
  const modalType: 'detailed' | 'oneshot' | 'workshop' = type || playlistType || 'detailed';

  // Normalize playlists safely to always be an array of Playlist items
  const normalizedPlaylists: Playlist[] = useMemo(() => {
    // 1. Direct array passed via `playlists`
    if (Array.isArray(playlists)) {
      return playlists;
    }

    // 2. Object passed via `subjectPlaylists` or `playlists`
    const sourceObj = subjectPlaylists || (playlists && typeof playlists === 'object' ? playlists : null);
    if (sourceObj) {
      // Case A: { detailed: [...], oneshot: [...] }
      if (Array.isArray(sourceObj[modalType])) {
        return sourceObj[modalType];
      }

      // Case B: { [subjectName]: { detailed: [...], oneshot: [...] } }
      const subjectData = sourceObj[modalTitle] || Object.values(sourceObj)[0];
      if (subjectData && typeof subjectData === 'object') {
        if (Array.isArray((subjectData as any)[modalType])) {
          return (subjectData as any)[modalType];
        }
      }
    }

    return [];
  }, [playlists, subjectPlaylists, modalTitle, modalType]);

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const getThumbnailUrl = (url: string) => {
    const videoId = getYouTubeId(url);
    if (!videoId) return null;
    
    // For single videos, try to get thumbnail
    if (!url.includes('playlist')) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null; // For playlists, we'll use gradient
  };

  const typeLabel: Record<'detailed' | 'oneshot' | 'workshop', string> = {
    detailed: 'Detailed Playlists',
    oneshot: 'One Shot Videos',
    workshop: 'Workshop Videos'
  };

  const isPlaylist = (url: string) => url.includes('playlist');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            {modalTitle} - {typeLabel[modalType]}
          </DialogTitle>
          <DialogDescription>
            Click on any video or playlist to watch on YouTube
          </DialogDescription>
        </DialogHeader>
        
        {normalizedPlaylists.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-border rounded-xl bg-muted/20">
            <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-foreground">No curated {typeLabel[modalType].toLowerCase()} available yet.</p>
            <p className="text-xs text-muted-foreground mt-1">We are actively sourcing top video lectures for this subject.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {normalizedPlaylists.map((playlist, index) => {
              const thumbnailUrl = getThumbnailUrl(playlist.url);
              const useGradient = isPlaylist(playlist.url) || modalType === 'detailed';
              
              return (
                <Card 
                  key={index}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => window.open(playlist.url, '_blank')}
                >
                  <div className="relative">
                    {useGradient || !thumbnailUrl ? (
                      // Gradient thumbnail for playlists
                      <div className={`w-full h-32 rounded-lg mb-3 bg-gradient-to-br ${getGradient(playlist.title, index)} flex flex-col items-center justify-center text-white p-3`}>
                        <ListVideo className="h-10 w-10 mb-2 opacity-90" />
                        <p className="text-xs font-medium text-center leading-tight opacity-90 line-clamp-2">
                          {playlist.title}
                        </p>
                      </div>
                    ) : (
                      // YouTube thumbnail for single videos
                      <img
                        src={thumbnailUrl}
                        alt={playlist.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = `w-full h-32 rounded-lg mb-3 bg-gradient-to-br ${getGradient(playlist.title, index)} flex flex-col items-center justify-center text-white p-3`;
                            fallback.innerHTML = `<svg class="h-10 w-10 mb-2 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
                            parent.insertBefore(fallback, parent.firstChild);
                          }
                        }}
                      />
                    )}
                    {playlist.recommended && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                        <Star className="h-3 w-3" />
                        Best
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Play className="h-12 w-12 text-white" fill="white" />
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-sm leading-tight mb-2">
                    {playlist.title}
                  </h3>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    variant="outline"
                  >
                    <Play className="h-3 w-3 mr-2" />
                    Watch on YouTube
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
// Reviewed: academic catalog & interface consistency check (v2.0.44)
