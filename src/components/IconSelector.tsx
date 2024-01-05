import Picker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import { Popover } from "react-tiny-popover";
import { Button } from './Button';

type Props = {
    icon: string,
    onChange: (icon: string) => void,
};

export function IconSelector({ icon, onChange }: Props) {
    const [isPickerVisible, setPickerVisibility] = useState(false);

    const onEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
        setPickerVisibility(false);
        onChange(emoji.emoji);
    };

    return <Popover
    isOpen={isPickerVisible}
    padding={10}
    positions={['right', 'bottom', 'left', 'top']}
    onClickOutside={() => setPickerVisibility(false)}
    content={<Picker onEmojiClick={onEmojiClick} />}
    >
        <Button onClick={() => setPickerVisibility(!isPickerVisible)}>{icon}</Button>
    </Popover>
}