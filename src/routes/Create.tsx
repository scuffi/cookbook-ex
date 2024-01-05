import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { Central } from '../components/Layout';
import { Input, Label } from '../components/Form';
import { Button } from '../components/Button';
import { Popover } from 'react-tiny-popover';

export function Create() {
    const [isPickerVisible, setPickerVisibility] = useState(false);

    const onEmojiClick = (event: any, emojiObject: any) => {
        console.log(emojiObject);
        setPickerVisibility(false);
    };

    return (
        <Central>
            <div>
                <h1>Create a recipe</h1>
                <Label>Recipe name</Label>
                <div>
                    <Input required/>
                    <Popover
                        isOpen={isPickerVisible}
                        padding={10}
                        positions={['right', 'bottom', 'left', 'top']}
                        onClickOutside={() => setPickerVisibility(false)}
                        content={<Picker onEmojiClick={onEmojiClick} />}
                        >
                        <Button onClick={() => setPickerVisibility(!isPickerVisible)}>🍕</Button>
                    </Popover>
                </div>
                <Label>Recipe description</Label>
                <Input required size={50} multiple/>
            </div>
        </Central>
    );
}