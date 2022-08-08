import { ListItem, Divider } from "@mui/material";
import { ListItemComponentProps } from "../types/types";

export const ListItemComponent = ({
  setState,
  state,
  name,
  children,
}: ListItemComponentProps) => {
  return (
    <>
      <ListItem
        onClick={() => setState(name)}
        sx={{
          justifyContent: "center",
          backgroundColor: state === name ? "#181e26" : "#161b22",
          color: state === name ? "#fff" : "#CCCCCC",
        }}
        button
      >
        {children}
      </ListItem>
      <Divider orientation="vertical" />
    </>
  );
};
