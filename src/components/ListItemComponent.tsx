import { ListItem, Divider } from "@mui/material";

type ListItemComponentProps = {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  name: string;
  children: string;
};

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
