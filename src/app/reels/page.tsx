
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockHealthReels, HealthReel } from '@/lib/mock-data';
import { PlaySquare, Heart, Bookmark, Share2, Eye } from 'lucide-react';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const ReelCard: React.FC<{ reel: HealthReel; isVisible: boolean }> = ({ reel, isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Keep for future video implementation
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Simulate autoplay: if isVisible, set isPlaying true, else false.
    // Actual video .play() / .pause() would go here.
    setIsPlaying(isVisible);
  }, [isVisible]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // if (videoRef.current) {
    //   if (isPlaying) videoRef.current.pause();
    //   else videoRef.current.play();
    // }
  };

  const handleLike = () => {
    // if (!user) {
    //   toast({ title: "Login Required", description: "Please log in to like reels.", variant: "destructive" });
    //   router.push('/login?redirect=/reels');
    //   return;
    // }
    setLiked(!liked);
    // Add Supabase interaction here later
  };
  
  const handleSave = () => {
    if (!user) {
      toast({ title: "Login Required", description: "Please log in to save reels.", variant: "destructive" });
      router.push('/login?redirect=/reels');
      return;
    }
    setSaved(!saved);
    // Add Supabase interaction here later
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: reel.title,
        text: `Check out this health reel: ${reel.title}`,
        url: window.location.href, // or specific reel URL if available
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href); // Fallback to copy link
      toast({ title: "Link Copied!", description: "Reel link copied to clipboard." });
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto snap-center shrink-0 h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] flex flex-col overflow-hidden shadow-xl rounded-xl bg-black relative aspect-[9/16]">
      <CardHeader className="absolute top-0 left-0 z-10 p-4 w-full bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src={reel.uploaderAvatar} alt={reel.uploader} data-ai-hint="user avatar" />
            <AvatarFallback>{reel.uploader.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-base text-white truncate">{reel.title}</CardTitle>
        </div>
         <Badge variant="secondary" className="mt-2 text-xs self-start">{reel.category}</Badge>
      </CardHeader>
      
      <div className="relative flex-grow flex items-center justify-center cursor-pointer" onClick={togglePlay}>
        <Image 
            src={reel.thumbnailUrl} 
            alt={reel.title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={reel.dataAiHint || "health video"}
            priority={isVisible} // Prioritize loading visible reel image
        />
        {/* 
         <video
          ref={videoRef}
          src={reel.videoUrl} // This would be the actual video source
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={reel.thumbnailUrl} // Thumbnail before video loads or if autoplay is blocked
        />
        */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <PlaySquare className="h-20 w-20 text-white/80 opacity-75 hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>

      <CardFooter className="absolute bottom-0 right-0 z-10 p-4 flex flex-col items-end space-y-4 bg-gradient-to-t from-black/50 to-transparent w-full">
        <div className="flex flex-col items-center space-y-4">
           <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto" onClick={handleLike}>
            <Heart className={`h-7 w-7 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'hover:fill-red-500/50'}`} />
            <span className="sr-only">{reel.likes + (liked ? 1 : 0)} likes</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto" onClick={handleSave}>
            <Bookmark className={`h-7 w-7 transition-colors ${saved ? 'fill-yellow-500 text-yellow-500' : 'hover:fill-yellow-500/50'}`} />
            <span className="sr-only">Save</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-white p-0 h-auto" onClick={handleShare}>
            <Share2 className="h-7 w-7 hover:text-blue-400 transition-colors" />
             <span className="sr-only">Share</span>
          </Button>
        </div>
      </CardFooter>
       <div className="absolute bottom-4 left-4 z-10 text-white text-sm p-2 rounded bg-black/30 backdrop-blur-sm">
          <p className="font-semibold text-base">{reel.uploader}</p>
          <div className="flex items-center text-xs mt-0.5">
            <Eye className="w-4 h-4 mr-1.5"/>{reel.likes.toLocaleString()} views
          </div>
          <p className="text-xs mt-1 line-clamp-2">{reel.title}</p>
        </div>
    </Card>
  );
};

export default function HealthReelsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | HealthReel['category']>('All');
  const reelCategories: ('All' | HealthReel['category'])[] = ['All', 'Fitness', 'Nutrition', 'Mental Wellness', 'Yoga'];
  
  const [visibleReelId, setVisibleReelId] = useState<string | null>(mockHealthReels.length > 0 ? mockHealthReels[0].id : null);
  const observer = useRef<IntersectionObserver | null>(null);
  const reelRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());


  const filteredReels = useMemo(() => {
    if (activeCategory === 'All') return mockHealthReels;
    return mockHealthReels.filter(reel => reel.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    reelRefs.current.clear(); // Clear refs when filteredReels changes
    if (filteredReels.length > 0) {
        setVisibleReelId(filteredReels[0].id);
    } else {
        setVisibleReelId(null);
    }
  }, [filteredReels]);


  useEffect(() => {
    const currentObserver = observer.current;
    // Disconnect previous observer if it exists
    if (currentObserver) {
        currentObserver.disconnect();
    }
    
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            setVisibleReelId(entry.target.id);
          }
        });
      },
      { 
        root: null, // observing intersections with the viewport
        threshold: 0.7, // 70% of the item must be visible
      }
    );
    
    const newObserver = observer.current;
    reelRefs.current.forEach(reelEl => {
      if (reelEl) newObserver?.observe(reelEl);
    });

    return () => {
      newObserver?.disconnect();
    };
  }, [filteredReels]); // Re-run when filteredReels change to observe new elements


  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 border-b bg-background z-10">
          <CardTitle className="font-headline text-3xl flex items-center mb-3">
            <PlaySquare className="mr-3 h-8 w-8 text-primary" />
            Health Reels
          </CardTitle>
          <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
            {reelCategories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="shrink-0 rounded-full px-4"
              >
                {category}
              </Button>
            ))}
          </div>
        </header>

        {filteredReels.length > 0 ? (
          <div className="flex-grow overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar md:p-0">
            {filteredReels.map((reel) => (
               <div 
                key={reel.id} 
                id={reel.id}
                ref={el => reelRefs.current.set(reel.id, el)}
                className="h-full flex items-center justify-center py-2 md:py-4" // py for some spacing if cards don't perfectly fill
              >
                <ReelCard reel={reel} isVisible={visibleReelId === reel.id} />
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

