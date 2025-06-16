import { create } from 'zustand';

export const useImagesStore = create(() => ({
    images: [
        {
            id: 1,
            imageUrl: 'https://www.lemon8-app.com/seo/image?item_id=7283652971815109122&index=1&sign=555c7bc03d8536815fd1ac6d41142d13',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWDSDWf77PV7V6kBX31E6r5RWSVHRm5NPGg&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yX6bw_zV18yHCcvru1VFSZQRLw0ErcAZMw&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAO6PXCN3Uc9XPkypVGdjBmPT8Zw4ewkHQyQ&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNlopdud98Tn25o0gC0GrH2gVE0rmwUhRog&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNlopdud98Tn25o0gC0GrH2gVE0rmwUhRog&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNlopdud98Tn25o0gC0GrH2gVE0rmwUhRog&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNlopdud98Tn25o0gC0GrH2gVE0rmwUhRog&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNlopdud98Tn25o0gC0GrH2gVE0rmwUhRog&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNlopdud98Tn25o0gC0GrH2gVE0rmwUhRog&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNlopdud98Tn25o0gC0GrH2gVE0rmwUhRog&s',
            widthRatio: 1,
            heightRatio: 1.4,
        },
        {
            id: 2,
            imageUrl: 'https://www.lemon8-app.com/seo/image?item_id=7283652971815109122&index=1&sign=555c7bc03d8536815fd1ac6d41142d13',
            widthRatio: 1,
            heightRatio: 1.4,
        },
    ],
}));

interface TouchStore {
    isOverRideStackAnimations: boolean;
    isShow: boolean; // Add this line
    x: number;
    y: number;
    setX: (x: number) => void;
    setY: (y: number) => void;
    setHeader: (isShow: boolean) => void;
    setsOverRideStackAnimations: (isShow: boolean) => void;
}

export const useTouchStore = create<TouchStore>((set) => ({
    isOverRideStackAnimations: false,
    isShow: true,
    x: 0,
    y: 0,
    setX: (x: number) => set((state) => ({ ...state, x })),
    setY: (y: number) => set((state) => ({ ...state, y })),
    setHeader: (isShow: boolean) => set((state) => ({ ...state, isShow })),
    setsOverRideStackAnimations: (isOverRideStackAnimations: boolean) => set((state) => ({ ...state, isOverRideStackAnimations })),
}));

