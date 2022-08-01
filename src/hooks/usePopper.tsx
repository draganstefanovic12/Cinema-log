import { useRef, useState } from "react";

export const usePopper = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };
  return { anchorRef, open, setOpen, handleClose, handleToggle };
};
