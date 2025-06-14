'use client';

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockMedicines, Medicine } from '@/lib/mock-data';
import { Pill, Search, Info, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const ITEMS_PER_PAGE = 9;

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockMedicines.map(med => med.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);
  
  const filteredMedicines = useMemo(() => {
    return mockMedicines.filter(medicine =>
      (medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.useCase.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || medicine.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  const paginatedMedicines = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMedicines.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMedicines, currentPage]);

  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search term or category changes
  }, [searchTerm, selectedCategory]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center">
              <Pill className="mr-3 h-8 w-8 text-primary" />
              Medicine Information
            </CardTitle>
            <CardDescription>Search and learn about various medicines. Find details on usage, dosage, side effects, and more.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or use case (e.g., Paracetamol, pain relief)"
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
              <Card key={medicine.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                 <div className="relative w-full h-48">
                    <Image 
                      src={medicine.imageUrl} 
                      alt={medicine.name} 
                      layout="fill" 
                      objectFit="cover" 
                      className="rounded-t-lg"
                      data-ai-hint={medicine.dataAiHint || "medicine image"}
                    />
                  </div>
                <CardHeader className="pt-4">
                  <CardTitle className="font-headline text-xl">{medicine.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">{medicine.category}</Badge>
                  <CardDescription className="mt-1 text-sm h-12 overflow-hidden text-ellipsis">
                    {medicine.useCase}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button variant="outline" className="w-full" onClick={() => setSelectedMedicine(medicine)}>
                    <Info className="mr-2 h-4 w-4" /> View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Pill className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No medicines found</p>
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
            <span className="text-sm">
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
          <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl flex items-center">
                <Pill className="mr-2 h-6 w-6 text-primary" /> {selectedMedicine.name}
              </DialogTitle>
              <DialogDescription>{selectedMedicine.useCase}</DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto pr-2 space-y-4 py-4">
              <div className="relative w-full h-64">
                <Image 
                  src={selectedMedicine.imageUrl} 
                  alt={selectedMedicine.name} 
                  layout="fill" 
                  objectFit="contain" 
                  className="rounded-lg"
                  data-ai-hint={selectedMedicine.dataAiHint || "medicine image"}
                />
              </div>
              <Badge variant="default" className="text-sm">{selectedMedicine.category}</Badge>
              <p className="text-sm">{selectedMedicine.description}</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dosage">
                  <AccordionTrigger className="text-base font-semibold">Dosage</AccordionTrigger>
                  <AccordionContent className="text-sm">{selectedMedicine.dosage}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="side-effects">
                  <AccordionTrigger className="text-base font-semibold">Side Effects</AccordionTrigger>
                  <AccordionContent className="text-sm">{selectedMedicine.sideEffects}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="precautions">
                  <AccordionTrigger className="text-base font-semibold">Precautions</AccordionTrigger>
                  <AccordionContent className="text-sm">{selectedMedicine.precautions}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setSelectedMedicine(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
}
