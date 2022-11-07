import { useRef, useState } from "react";

export const usePopper = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return { anchorRef, open, setOpen };
};
