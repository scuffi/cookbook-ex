import React, { useState } from 'react';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { Central } from '../components/Layout';
import { Input, Label } from '../components/Form';
import { Button, SuccessButton } from '../components/Button';
import { Popover } from 'react-tiny-popover';
import { IngredientForm } from '../components/IngredientForm';

export function Create() {
    const [isPickerVisible, setPickerVisibility] = useState(false);
    const [emoji, setEmoji] = useState('🍕');
    const [ingredients, setIngredients] = useState<string[]>([]);

    const onEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
        console.log(emoji.emoji);
        setPickerVisibility(false);
        setEmoji(emoji.emoji);
    };

    return (
        <Central>
            <div>
                <h1 style={{fontSize: "3rem"}}>Create a recipe</h1>
                <Label>Recipe name</Label>
                <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                    <Input required/>
                    <Popover
                        isOpen={isPickerVisible}
                        padding={10}
                        positions={['right', 'bottom', 'left', 'top']}
                        onClickOutside={() => setPickerVisibility(false)}
                        content={<Picker onEmojiClick={onEmojiClick} />}
                        >
                        <Button onClick={() => setPickerVisibility(!isPickerVisible)}>{emoji}</Button>
                    </Popover>
                </div>
                <Label>Recipe description</Label>
                <Input required size={50} multiple/>
                <Label>Ingredients</Label>
                <IngredientForm ingredients={ingredients} onChange={setIngredients}/>
                <SuccessButton>Create recipe</SuccessButton>
            </div>
        </Central>
    );
}