import { create } from 'zustand';

// เพิ่ม interface สำหรับรูปภาพ
interface ImageItem {
    id: number;
    imageUrl: string;
    widthRatio: number;
    heightRatio: number;
    categoryId: string;
}

// เพิ่ม interface สำหรับ category
interface Category {
    id: string;
    name: string;
    selected: boolean;
}

interface ImagesStore {
    images: ImageItem[];
    categories: Category[];
    selectedCategoryId: string;
    setSelectedCategory: (categoryId: string) => void;
}

export const useImagesStore = create<ImagesStore>((set) => ({
    images: [
        // ----- ภาคเหนือ (categoryId: '2') -----
        {
            id: 1,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4xShm-C0DKwUar5Nl5uLndqfEnWw_d0n03w&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '2', // ดอยอินทนนท์ - เชียงใหม่
        },
        {
            id: 2,
            imageUrl: 'https://cdn-cms.pgimgs.com/areainsider/2018/12/Mazarine-Ratchayothin_015.original.jpg',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '2', // ดอยสุเทพ - เชียงใหม่
        },
        {
            id: 9,
            imageUrl: 'https://f.ptcdn.info/742/023/000/1411458098-1-o.jpg',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '2', // วัดศรีโคมคำ - พะเยา
        },
        {
            id: 10,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdz7jDH8JrHmGd87-0O6pDSTjbwfnK82svgw&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '2', // วัดร่องขุ่น - เชียงราย
        },
        {
            id: 17,
            imageUrl: 'https://img.wongnai.com/p/624x0/2025/08/27/62f98d4cfac047e597476780367f8e12.jpg',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '2', // อุทยานแห่งชาติดอยอินทนนท์
        },

        // ----- กรุงเทพฯ (categoryId: '3') -----
        {
            id: 3,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZsqUqrmZoJ8DYnmofVkaRV2WLHb-7fwQ7-Q&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '3', // วัดพระศรีรัตนศาสดาราม (วัดพระแก้ว) - กรุงเทพฯ
        },
        {
            id: 4,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUjxGu_DLnxHEHTXIO0wVVkPyKfSSc2WYTpA&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '3', // วัดอรุณราชวรารามราชวรมหาวิหาร (วัดแจ้ง) - กรุงเทพฯ
        },
        {
            id: 11,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI4ThdZzILOARx9Cd_2dFHGie9nZOPSlBPuQ&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '3', // เอเชียทีค เดอะริเวอร์ฟร้อนท์ - กรุงเทพฯ
        },
        {
            id: 12,
            imageUrl: 'https://img.wongnai.com/p/400x0/2025/02/15/efe75dc86bc342778fcfa1f47435eeaf.jpg',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '3', // วัดพระเชตุพนวิมลมังคลารามราชวรมหาวิหาร (วัดโพธิ์) - กรุงเทพฯ
        },

        // ----- ภาคใต้ (categoryId: '4') -----
        {
            id: 5,
            imageUrl: 'https://img.wongnai.com/p/400x0/2025/02/15/0b2339637fa74591b3c0a7223f4bec30.jpg',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '4', // เกาะพีพี - กระบี่
        },
        {
            id: 6,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAO6PXCN3Uc9XPkypVGdjBmPT8Zw4ewkHQyQ&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '4', // เกาะห้อง - กระบี่
        },
        {
            id: 13,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVp8IQTfe0vz8LHUk938cXiM-bl_XBfS2ZEw&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '4', // หาดป่าตอง - ภูเก็ต
        },
        {
            id: 14,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo8MfLYe_bLaeczharAq0n8mgdCrtoaC4JhA&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '4', // เกาะตะรุเตา - สตูล
        },

        // ----- ภาคอีสาน (categoryId: '5') -----
        {
            id: 7,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuvvAhhlAxK827_BlXFlY-cuBOGAQIqQkV8Q&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '5', // อุทยานประวัติศาสตร์พนมรุ้ง - บุรีรัมย์
        },
        {
            id: 8,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEW8DpqqJx7rTfMS85DoFjnl_UkdxSr64urA&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '5', // อุทยานแห่งชาติภูเรือ - เลย
        },
        {
            id: 15,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLLwrvtq-TWnWeCFfkyxTxDsogQmQjnsIaXmKCpF1VqnBDhfEJg-NscSQ4J45y-6QECHs&usqp=CAU',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '5', // อุทยานแห่งชาติเขาใหญ่
        },
        {
            id: 16,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43mM9twNHvOHIIQtXOkZ7FbVHgF57UYsGcQ&s',
            widthRatio: 1,
            heightRatio: 1.4,
            categoryId: '5', // น้ำตกตาดโตน - ชัยภูมิ
        },
    ],
    categories: [
        { id: '1', name: 'ทั้งหมด', selected: true },
        { id: '2', name: 'ภาคเหนือ', selected: false },
        { id: '3', name: 'กรุงเทพฯ', selected: false },
        { id: '4', name: 'ภาคใต้', selected: false },
        { id: '5', name: 'อีสาน', selected: false },
    ],
    selectedCategoryId: '1',
    setSelectedCategory: (categoryId: string) => set(state => ({
        selectedCategoryId: categoryId,
        categories: state.categories.map(category => ({
            ...category,
            selected: category.id === categoryId
        }))
    })),
}));

interface TouchStore {
    isOverRideStackAnimations: boolean;
    isShow: boolean;
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

