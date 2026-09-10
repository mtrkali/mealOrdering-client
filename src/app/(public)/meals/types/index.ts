export interface MealSearchFormProps {
    value: {
        minPrice: string;
        maxPrice: string;
        cuisine: string;
        setMinPrice: React.Dispatch<React.SetStateAction<string>>;
        setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
        setCuisine: React.Dispatch<React.SetStateAction<string>>;
        setDietary: React.Dispatch<React.SetStateAction<string[]>>;
        fetchMeals: () => void;
        loading: boolean;
        dietary: string[];
        paramslength: number;
    };
}