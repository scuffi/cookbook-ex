import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Form";

const DeleteButton = styled.button`
    font-size: 1rem;
    border: none;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
`;

type Props = {
    ingredients: string[],
    onChange: (ingredients: string[]) => void,
};

export function IngredientForm({ ingredients, onChange }: Props) {
    const addIngredient = () => {
        const newIngredients = [...ingredients];
        newIngredients.push("");
        onChange(newIngredients);
    }

    return <div style={{paddingBottom: "1rem"}}>{
        ingredients.map((ingredient, index) => (
            <div key={index} style={{paddingBottom: "1rem"}}>
                <Input type="text" value={ingredient} onChange={event => {
                    const newIngredients = [...ingredients];
                    newIngredients[index] = event.target.value;
                    onChange(newIngredients);
                }} />
                <DeleteButton onClick={() => {
                    const newIngredients = [...ingredients];
                    newIngredients.splice(index, 1);
                    onChange(newIngredients);
                }}>🗑️</DeleteButton>
            </div>
        ))}
        <Button onClick={addIngredient}>➕</Button>
    </div>;
}