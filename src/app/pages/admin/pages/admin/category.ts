// src/app/category.ts

export interface Category {
    cid: number | null; // Category ID
    title: string;      // Category Title
    description: string; // Category Description
    active?: boolean;    // **FIX**: Added 'active' property (optional for flexibility)
}
