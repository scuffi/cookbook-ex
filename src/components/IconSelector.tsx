import Picker, { EmojiClickData } from "emoji-picker-react";
import { ReactNode, useState } from "react";
import { Popover } from "react-tiny-popover";
import { Button } from "./Button";

type Props = {
  children: ReactNode;
  onChange: (icon: string) => void;
};

export function IconSelector({ children, onChange }: Props) {
  const [isPickerVisible, setPickerVisibility] = useState(false);

  /**
   * Function to handle the confirmation of an emoji selection. This function will be called when the emoji
   * is clicked in the picker.
   * @param {EmojiClickData} emoji - The clicked emoji.
   * @param {MouseEvent} event - The click event.
   */
  const onEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    setPickerVisibility(false);
    onChange(emoji.emoji);
  };

  return (
    <Popover
      isOpen={isPickerVisible}
      padding={10}
      positions={["right", "bottom", "left", "top"]}
      onClickOutside={() => setPickerVisibility(false)}
      content={<Picker data-testid="icon-picker" onEmojiClick={onEmojiClick} />}
    >
      <Button
        type="button"
        onClick={() => setPickerVisibility(!isPickerVisible)}
      >
        {children}
      </Button>
    </Popover>
  );
}
