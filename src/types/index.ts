export type OrderItem = {
    id: string;
    quantity: number;
    price: number;
    meal: {
        id: string;
        title: string;
        image: string;
        cuisine: string;
    }
}

export type Order = {
    id: string;
    status: string;
    totalPrice: number;
    address: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        phone: string;
        email: string;
        image: string;
    };
    items: OrderItem[]
}