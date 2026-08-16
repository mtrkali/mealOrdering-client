export interface Meal {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    cuisine: string;
    dietary: string[];
    createdAt: string;

    category?: {
        name: string;
    };

    provider?: {
        businessName: string;
    };
}