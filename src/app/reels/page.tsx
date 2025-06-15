
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockHealthReels, HealthReel } from '@/lib/mock-data';
import { PlaySquare, Heart, Bookmark, Share2, Eye, Volume2, VolumeX } from 'lucide-react'; // Added volume icons
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
    toast({ title: liked ? "Unliked" : "Liked!", description: reel.title });
  };
  
  const handleSave = () => {
    if (!user) {
      toast({ title: "Login Required", description: "Please log in to save reels.", variant: "destructive" });
      router.push('/login?redirect=/reels');
      return;
    }
    setSaved(!saved);
    toast({ title: saved ? "Removed from saved" : "Saved to collection!", description: reel.title });
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
  
  // Construct the embed URL with autoplay and mute state
  const videoId = reel.videoUrl.includes('embed/') ? reel.videoUrl.split('embed/')[1].split('?')[0] : null;
  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&widgetid=1`
    : reel.videoUrl; // Fallback if parsing fails, though data should be clean

  useEffect(() => {
    if (isVisible && iframeRef.current) {
      // The embedUrl already has autoplay and mute based on isMuted state.
      // Forcing play/pause/mute via postMessage can be complex with YouTube API
      // and often requires the iframe to be fully loaded and API ready.
      // The current approach relies on URL parameters for initial state.
    }
  }, [isVisible, isMuted, embedUrl]);

  return (
    <Card className="w-full max-w-sm mx-auto snap-center shrink-0 h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] flex flex-col overflow-hidden shadow-xl rounded-xl bg-black relative aspect-[9/16]">
      {/* Video Player Area */}
      <div className="relative flex-grow flex items-center justify-center bg-black">
        {isVisible ? (
          <iframe
            ref={iframeRef}
            key={reel.id} // Force re-render if reel changes
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

      {/* Overlay UI Elements */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
        {/* Top Section: Title & Uploader (optional, can be part of bottom overlay) */}
        <CardHeader className="z-10 w-full bg-gradient-to-b from-black/50 to-transparent pointer-events-auto p-0">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={reel.uploaderAvatar} alt={reel.uploader} data-ai-hint="user avatar" />
              <AvatarFallback>{reel.uploader.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="font-headline text-base text-white truncate">{reel.title}</CardTitle>
          </div>
          <Badge variant="secondary" className="mt-1 text-xs self-start bg-black/30 text-white border-none">{reel.topic}</Badge>
        </CardHeader>

        {/* Bottom Section: Info and Actions */}
        <div className="flex items-end justify-between w-full">
          {/* Left side: Uploader, Description, Views */}
          <div className="z-10 text-white text-sm p-2 rounded space-y-1 pointer-events-auto max-w-[calc(100%-5rem)]">
            <p className="font-semibold text-base">{reel.uploader}</p>
            {reel.description && <p className="text-xs mt-0.5 line-clamp-2">{reel.description}</p>}
            <div className="flex items-center text-xs">
              <Eye className="w-4 h-4 mr-1.5"/>{reel.likes.toLocaleString()} views
            </div>
          </div>

          {/* Right side: Action Buttons (Like, Save, Share, Mute) */}
          <CardFooter className="z-10 flex flex-col items-center space-y-3 pointer-events-auto p-0">
            <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto" onClick={handleLike}>
              <Heart className={`h-7 w-7 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'hover:fill-red-500/30'}`} />
              <span className="sr-only">{reel.likes + (liked ? 1 : 0)} likes</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto" onClick={handleSave}>
              <Bookmark className={`h-7 w-7 transition-colors ${saved ? 'fill-yellow-500 text-yellow-500' : 'hover:fill-yellow-500/30'}`} />
              <span className="sr-only">Save</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto" onClick={handleShare}>
              <Share2 className="h-7 w-7 hover:text-blue-400 transition-colors" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto" onClick={onToggleMute}>
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
  const [isMuted, setIsMuted] = useState(true); // Global mute state for all reels

  const filteredReels = useMemo(() => {
    const reels = activeTopic === 'All' ? mockHealthReels : mockHealthReels.filter(reel => reel.topic === activeTopic);
    if (reels.length > 0 && !visibleReelId) {
        // Set initial visible reel only if not already set
        // This can be problematic if filteredReels updates frequently
        // and visibleReelId is reset.
    }
    return reels;
  }, [activeTopic, visibleReelId]);

  useEffect(() => {
    // Set initial visible reel when component mounts or filteredReels changes
    if (filteredReels.length > 0) {
        setVisibleReelId(filteredReels[0].id);
    } else {
        setVisibleReelId(null);
    }
    // Clear refs on filter change to ensure correct observation
    reelRefs.current.clear();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic]); // Rerun only when activeTopic changes to reset initial visible reel

  useEffect(() => {
    const currentObserver = observer.current;
    if (currentObserver) {
        currentObserver.disconnect();
    }
    
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.65) { // Adjusted threshold
            setVisibleReelId(entry.target.id);
          }
        });
      },
      { 
        root: null, 
        threshold: 0.65, // Element needs to be 65% visible
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
        <header className="p-4 border-b bg-background z-20"> {/* Increased z-index */}
          <CardTitle className="font-headline text-3xl flex items-center mb-3">
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
                className="shrink-0 rounded-full px-4"
              >
                {topic}
              </Button>
            ))}
          </div>
        </header>

        {filteredReels.length > 0 ? (
          <div className="flex-grow overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar md:p-0 relative"> {/* Added relative for z-index context */}
            {filteredReels.map((reel) => (
               <div 
                key={reel.id} 
                id={reel.id}
                ref={el => reelRefs.current.set(reel.id, el)}
                className="h-full flex items-center justify-center py-2 md:py-4" // Ensure full height for snap
              >
                <ReelCard 
                  reel={reel} 
                  isVisible={visibleReelId === reel.id} 
                  isMuted={isMuted}
                  onToggleMute={handleToggleMute}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
            <PlaySquare className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-medium">No reels available</p>
            <p className="text-muted-foreground">Try selecting a different category or check back later.</p>
          </div>
        )}
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
