import Picker, { EmojiClickData } from 'emoji-picker-react';
import { ReactNode, useState } from 'react';
import { Popover } from "react-tiny-popover";
import { Button } from './Button';

type Props = {
    children: ReactNode,
    onChange: (icon: string) => void,
};

export function IconSelector({ children, onChange }: Props) {
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
        <Button onClick={() => setPickerVisibility(!isPickerVisible)}>{children}</Button>
    </Popover>
}