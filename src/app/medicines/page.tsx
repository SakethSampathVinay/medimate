
'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockMedicines, Medicine } from '@/lib/mock-data';
import { Pill, Search, Info, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';


const ITEMS_PER_PAGE = 9;

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { addToCart } = useCart();
  const { toast } = useToast();

  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockMedicines.map(med => med.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);
  
  const filteredMedicines = useMemo(() => {
    return mockMedicines.filter(medicine =>
      (medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.useCase.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedCategory === "All" || medicine.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  const paginatedMedicines = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMedicines.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMedicines, currentPage]);

  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchTerm, selectedCategory]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddToCart = (medicine: Medicine) => {
    addToCart(medicine, 1); 
    toast({
      title: `${medicine.name} added to cart!`,
      description: `Price: ₹${medicine.price.toFixed(2)}`,
      className: "bg-green-500 text-white dark:bg-green-600 dark:text-white",
    });
  };


  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center text-foreground">
              <Pill className="mr-3 h-8 w-8 text-primary" />
              Medicine Information
            </CardTitle>
            <CardDescription>Search and learn about various medicines. Add them to your cart for a quick checkout.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, use case, or tag (e.g., Paracetamol, pain relief, fever)"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {paginatedMedicines.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedMedicines.map(medicine => (
              <Card key={medicine.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-card">
                 <div className="relative w-full h-48 bg-muted dark:bg-muted/50">
                    <Image 
                      src={medicine.imageUrl} 
                      alt={medicine.name} 
                      fill
                      className="rounded-t-lg object-contain"
                      data-ai-hint={medicine.dataAiHint || "medicine image"}
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x200.png?text=Image+Not+Found'; }}
                    />
                  </div>
                <CardHeader className="pt-4 pb-2">
                  <CardTitle className="font-headline text-xl text-card-foreground">{medicine.name}</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {medicine.tags.slice(0,2).map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                  </div>
                   <p className="text-primary font-semibold mt-1">₹{medicine.price.toFixed(2)}</p>
                  <CardDescription className="mt-1 text-sm h-10 overflow-hidden text-ellipsis">
                    {medicine.useCase}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-2 flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="w-full sm:w-1/2 hover:bg-accent/10" onClick={() => setSelectedMedicine(medicine)}>
                    <Info className="mr-2 h-4 w-4 text-primary" /> View Details
                  </Button>
                  <Button className="w-full sm:w-1/2 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => handleAddToCart(medicine)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="dark:bg-card">
            <CardContent className="text-center py-12">
              <Pill className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-card-foreground">No medicines found</p>
              <p className="text-muted-foreground">Try adjusting your search or filter.</p>
            </CardContent>
          </Card>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {selectedMedicine && (
        <Dialog open={!!selectedMedicine} onOpenChange={() => setSelectedMedicine(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col dark:bg-card">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl flex items-center text-card-foreground">
                <Pill className="mr-2 h-6 w-6 text-primary" /> {selectedMedicine.name}
              </DialogTitle>
               <div className="flex flex-wrap gap-1 pt-1">
                  {selectedMedicine.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                </div>
              <DialogDescription className="pt-1">{selectedMedicine.useCase}</DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto pr-2 space-y-4 py-4">
              <div className="relative w-full h-64 bg-muted dark:bg-muted/50 rounded-lg">
                <Image 
                  src={selectedMedicine.imageUrl} 
                  alt={selectedMedicine.name} 
                  fill
                  className="rounded-lg object-contain"
                  data-ai-hint={selectedMedicine.dataAiHint || "medicine image"}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300.png?text=Image+Not+Found'; }}
                />
              </div>
               <p className="text-primary font-semibold text-lg">Price: ₹{selectedMedicine.price.toFixed(2)}</p>
              <Badge variant="default" className="text-sm">{selectedMedicine.category}</Badge>
              <p className="text-sm text-card-foreground">{selectedMedicine.description}</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dosage">
                  <AccordionTrigger className="text-base font-semibold text-card-foreground hover:text-primary">Dosage</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{selectedMedicine.dosage}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="side-effects">
                  <AccordionTrigger className="text-base font-semibold text-card-foreground hover:text-primary">Side Effects</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{selectedMedicine.sideEffects}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="precautions">
                  <AccordionTrigger className="text-base font-semibold text-card-foreground hover:text-primary">Precautions</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{selectedMedicine.precautions}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setSelectedMedicine(null)} className="w-full sm:w-auto hover:bg-accent/10">Close</Button>
              <Button onClick={() => { handleAddToCart(selectedMedicine); setSelectedMedicine(null);}} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                 <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
}
