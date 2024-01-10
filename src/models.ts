export type Ingredient = {
    name: string;
}

export type Recipe = {
    id?: number | null;
    name: string;
    icon: string;
    description: string;
    ingredients: Ingredient[];
}