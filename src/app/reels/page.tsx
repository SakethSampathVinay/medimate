
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockHealthReels, HealthReel } from '@/lib/mock-data';
import { PlaySquare, Heart, Bookmark, Share2, Eye, Volume2, VolumeX } from 'lucide-react'; 
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const ReelCard: React.FC<{ reel: HealthReel; isVisible: boolean; isMuted: boolean; onToggleMute: () => void;}> = ({ reel, isVisible, isMuted, onToggleMute }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLike = () => {
    setLiked(!liked);
    toast({ title: liked ? "Unliked" : "Liked!", description: reel.title, className: liked ? "" : "bg-pink-500 text-white dark:bg-pink-600" });
  };
  
  const handleSave = () => {
    if (!user) {
      toast({ title: "Login Required", description: "Please log in to save reels.", variant: "destructive" });
      router.push('/login?redirect=/reels');
      return;
    }
    setSaved(!saved);
    toast({ title: saved ? "Removed from saved" : "Saved to collection!", description: reel.title, className: saved ? "" : "bg-yellow-500 text-white dark:bg-yellow-600" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: reel.title,
        text: `Check out this health reel: ${reel.title}`,
        url: window.location.href, 
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href); 
      toast({ title: "Link Copied!", description: "Reel link copied to clipboard." });
    }
  };
  
  const videoId = useMemo(() => {
    try {
        const url = new URL(reel.videoUrl);
        if (url.pathname.startsWith('/embed/')) {
            return url.pathname.split('/embed/')[1].split('?')[0];
        }
    } catch (e) { console.error("Error parsing videoId for reel: ", reel.title, e); }
    return 'error'; // Fallback video ID
  }, [reel.videoUrl, reel.title]);
  
  const embedUrl = useMemo(() => 
    `${reel.videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&widgetid=1`,
    [reel.videoUrl, isMuted, videoId]
  );

  useEffect(() => {
    // The iframe's src attribute is updated when isMuted or embedUrl changes,
    // which handles playing/muting via URL parameters.
  }, [isVisible, isMuted, embedUrl]);

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden shadow-xl rounded-xl bg-black relative aspect-[9/16]">
      <div className="relative flex-grow flex items-center justify-center bg-black">
        {isVisible ? (
          <iframe
            ref={iframeRef}
            key={reel.id + (isMuted ? '-muted' : '-unmuted')} // Force re-render if mute state changes for the src
            className="w-full h-full absolute top-0 left-0"
            src={embedUrl}
            title={reel.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-presentation"
          ></iframe>
        ) : (
          <Image 
            src={reel.thumbnailUrl} 
            alt={reel.title + " thumbnail"}
            fill
            className="object-cover"
            data-ai-hint={reel.dataAiHint || "health video thumbnail"}
            priority={false}
          />
        )}
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
        <CardHeader className="z-10 w-full bg-gradient-to-b from-black/50 to-transparent pointer-events-auto p-0">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={reel.uploaderAvatar} alt={reel.uploader} data-ai-hint="user avatar" />
              <AvatarFallback>{reel.uploader.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="font-headline text-base text-white truncate">{reel.title}</CardTitle>
          </div>
          <Badge variant="secondary" className="mt-1 text-xs self-start bg-black/40 text-white border-none backdrop-blur-sm">{reel.topic}</Badge>
        </CardHeader>

        <div className="flex items-end justify-between w-full">
          <div className="z-10 text-white text-sm p-2 rounded space-y-1 pointer-events-auto max-w-[calc(100%-5rem)] bg-black/20 backdrop-blur-sm">
            <p className="font-semibold text-base">{reel.uploader}</p>
            {reel.description && <p className="text-xs mt-0.5 line-clamp-2">{reel.description}</p>}
            <div className="flex items-center text-xs">
              <Eye className="w-4 h-4 mr-1.5"/>{reel.likes.toLocaleString()} views
            </div>
          </div>

          <CardFooter className="z-10 flex flex-col items-center space-y-3 pointer-events-auto p-0">
            <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto pointer-events-auto" onClick={handleLike}>
              <Heart className={`h-7 w-7 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'hover:fill-red-500/30'}`} />
              <span className="sr-only">{reel.likes + (liked ? 1 : 0)} likes</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto pointer-events-auto" onClick={handleSave}>
              <Bookmark className={`h-7 w-7 transition-colors ${saved ? 'fill-yellow-400 text-yellow-400' : 'hover:fill-yellow-400/30'}`} />
              <span className="sr-only">Save</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto pointer-events-auto" onClick={handleShare}>
              <Share2 className="h-7 w-7 hover:text-blue-400 transition-colors" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto pointer-events-auto" onClick={onToggleMute}>
              {isMuted ? <VolumeX className="h-7 w-7" /> : <Volume2 className="h-7 w-7" />}
              <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default function HealthReelsPage() {
  const allTopics = useMemo(() => ['All', ...new Set(mockHealthReels.map(reel => reel.topic))], []);
  const [activeTopic, setActiveTopic] = useState<string>(allTopics[0] || 'All');
  
  const [visibleReelId, setVisibleReelId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const reelRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [isMuted, setIsMuted] = useState(false); 

  const filteredReels = useMemo(() => {
    return activeTopic === 'All' ? mockHealthReels : mockHealthReels.filter(reel => reel.topic === activeTopic);
  }, [activeTopic]);

  useEffect(() => {
    if (filteredReels.length > 0) {
        setVisibleReelId(filteredReels[0].id);
    } else {
        setVisibleReelId(null);
    }
    reelRefs.current.clear();
  }, [filteredReels]); 

  useEffect(() => {
    const currentObserver = observer.current;
    if (currentObserver) {
        currentObserver.disconnect();
    }
    
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.65) { 
            setVisibleReelId(entry.target.id);
          }
        });
      },
      { 
        root: null, 
        threshold: 0.65, 
      }
    );
    
    const newObserver = observer.current;
    filteredReels.forEach(reel => {
        const reelEl = reelRefs.current.get(reel.id);
        if (reelEl) {
            newObserver?.observe(reelEl);
        }
    });

    return () => {
      newObserver?.disconnect();
    };
  }, [filteredReels]); 

  const handleToggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 border-b bg-background dark:bg-card z-20">
          <CardTitle className="font-headline text-3xl flex items-center mb-3 text-foreground">
            <PlaySquare className="mr-3 h-8 w-8 text-primary" />
            Health Reels
          </CardTitle>
          <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
            {allTopics.map(topic => (
              <Button
                key={topic}
                variant={activeTopic === topic ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTopic(topic)}
                className={`shrink-0 rounded-full px-4 ${activeTopic === topic ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/10'}`}
              >
                {topic}
              </Button>
            ))}
          </div>
        </header>

        <div className="flex-grow overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar relative bg-neutral-900 dark:bg-black">
          {filteredReels.length > 0 ? (
            filteredReels.map((reel) => (
               <div 
                key={reel.id} 
                id={reel.id}
                ref={el => reelRefs.current.set(reel.id, el)}
                className="h-full snap-center shrink-0 flex items-center justify-center p-0 md:p-0"
              >
                <div className="w-full max-w-sm h-full">
                  <ReelCard 
                    reel={reel} 
                    isVisible={visibleReelId === reel.id} 
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
              <PlaySquare className="mx-auto h-16 w-16 mb-4" />
              <p className="text-xl font-medium">No reels available</p>
              <p>Try selecting a different category or check back later.</p>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </AppLayout>
  );
}
