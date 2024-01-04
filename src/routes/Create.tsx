import { Input, Label } from "../components/Form";
import { Central } from "../components/Layout";

export function Create() {
    return (
        <Central>
            <div>
                <h1>Create a recipe</h1>
                <Label>Recipe name</Label>
                <Input required/>
                <Label>Recipe description</Label>
                <Input required size={50} multiple/>
            </div>
        </Central>
    );
}