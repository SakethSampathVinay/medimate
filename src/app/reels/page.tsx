
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

const ReelCard: React.FC<{ reel: HealthReel; isVisible: boolean }> = ({ reel, isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(error => console.log("Autoplay prevented:", error));
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isVisible]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto snap-center shrink-0 h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] flex flex-col overflow-hidden shadow-xl rounded-xl bg-black relative">
      <CardHeader className="absolute top-0 left-0 z-10 p-4 w-full bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src={reel.uploaderAvatar} alt={reel.uploader} data-ai-hint="user avatar" />
            <AvatarFallback>{reel.uploader.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-lg text-white truncate">{reel.title}</CardTitle>
        </div>
         <Badge variant="secondary" className="mt-2 text-xs">{reel.category}</Badge>
      </CardHeader>
      
      <div className="relative flex-grow flex items-center justify-center cursor-pointer" onClick={togglePlay}>
        {/* Using image as video placeholder due to .mp4 file errors */}
        <Image src={reel.thumbnailUrl} alt={reel.title} layout="fill" objectFit="cover" data-ai-hint={reel.dataAiHint || "health video"} />
         {/* 
         <video
          ref={videoRef}
          src={reel.videoUrl}
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={reel.thumbnailUrl}
        />
        */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <PlaySquare className="h-16 w-16 text-white/80" />
          </div>
        )}
      </div>

      <CardFooter className="absolute bottom-0 right-0 z-10 p-4 flex flex-col items-end space-y-3 bg-gradient-to-t from-black/50 to-transparent w-full">
        <div className="flex flex-col items-center space-y-3">
           <Button variant="ghost" size="icon" className="text-white hover:text-red-500 p-0" onClick={() => setLiked(!liked)}>
            <Heart className={`h-7 w-7 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-xs sr-only">{reel.likes + (liked ? 1 : 0)}</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-yellow-500 p-0" onClick={() => setSaved(!saved)}>
            <Bookmark className={`h-7 w-7 ${saved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            <span className="sr-only">Save</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-blue-500 p-0">
            <Share2 className="h-7 w-7" />
             <span className="sr-only">Share</span>
          </Button>
        </div>
      </CardFooter>
       <div className="absolute bottom-4 left-4 z-10 text-white text-sm">
          <p className="font-semibold">{reel.uploader}</p>
          <p className="text-xs flex items-center"><Eye className="w-5 h-5 mr-1"/>{reel.likes} views</p>
        </div>
    </Card>
  );
};

export default function HealthReelsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | HealthReel['category']>('All');
  const reelCategories: ('All' | HealthReel['category'])[] = ['All', 'Fitness', 'Nutrition', 'Mental Wellness', 'Yoga'];
  
  const [visibleReelId, setVisibleReelId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredReels = useMemo(() => {
    if (activeCategory === 'All') return mockHealthReels;
    return mockHealthReels.filter(reel => reel.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleReelId(entry.target.id);
          }
        });
      },
      { threshold: 0.7 } // 70% of the item must be visible
    );

    const currentRefs = reelRefs.current;
    currentRefs.forEach(reel => {
      if (reel) observer.current?.observe(reel);
    });

    return () => {
      currentRefs.forEach(reel => {
        if (reel) observer.current?.unobserve(reel);
      });
    };
  }, [filteredReels]);


  return (
    <AppLayout>
      <div className="flex flex-col h-full"> {/* Changed: h-[calc(100vh-4rem)] to h-full */}
        {/* Removed sticky and top-0 from this header */}
        <header className="p-4 border-b bg-background z-10"> {/* z-10 is likely fine, z-20 was also okay */}
          <CardTitle className="font-headline text-3xl flex items-center mb-2">
            <PlaySquare className="mr-3 h-8 w-8 text-primary" />
            Health Reels
          </CardTitle>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {reelCategories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </header>

        {filteredReels.length > 0 ? (
          <div className="flex-grow overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar p-4 md:p-0">
             {/* hide-scrollbar is a custom utility, ensure it's defined in globals.css or tailwind config if needed */}
            {filteredReels.map((reel, index) => (
               <div 
                key={reel.id} 
                id={reel.id}
                ref={el => reelRefs.current[index] = el}
                className="h-full flex items-center justify-center py-4"
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
