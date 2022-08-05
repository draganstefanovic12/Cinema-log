import {
  Button,
  Container,
  Input,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { AddFavoriteMedia } from "./AddFavoriteMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import axios from "axios";

interface NewListProps {
  user: string | undefined;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setLists: React.Dispatch<React.SetStateAction<any>>;
}

interface Media {
  title: string;
  createdAt: string;
}

export const NewList = ({ user, setAdd, setLists }: NewListProps) => {
  const [desc, setDesc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<any>([]);
  const [error, setError] = useState<string>("");

  const addList = async () => {
    if (content.length > 0 && name.length > 3) {
      await axios.post(`http://localhost:5000/lists/new/${user}`, {
        name: name,
        content: JSON.stringify(content),
        description: desc,
        username: user,
      });
    } else {
      setError(
        "List can't be empty and name must be longer than 5 characters."
      );
    }
  };

  const addListToProfile = async () => {
    if (content.length > 0 && name.length > 3) {
      await axios.post(`http://localhost:5000/user/newlist/${user}`, {
        name: name,
        content: JSON.stringify(content),
        description: desc,
      });
    }
  };
  const handleFilter = (date: string) => {
    setContent(content.filter((list: Media) => list.createdAt !== date));
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "25em",
        gap: "1em",
        backgroundColor: "#14181c",
        padding: "1%",
        borderRadius: "1%",
        position: "absolute",
        left: "0",
        right: "0",
        zIndex: "0",
        border: "1em solid #161b22",
      }}
    >
      <Typography>List name</Typography>
      <Input
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />
      <Typography>Description</Typography>
      <TextareaAutosize
        style={{ backgroundColor: "#14181c", color: "#cccccc" }}
        minRows={3}
        onChange={(e) => setDesc(e.target.value)}
      />
      <Typography>List content</Typography>
      <AddFavoriteMedia setContent={setContent} />
      {content.map((media: Media) => (
        <Container sx={{ display: "flex", gap: "1em" }}>
          <Typography>{media.title}</Typography>

          <DeleteIcon onClick={() => handleFilter(media.createdAt)} />
        </Container>
      ))}
      <Button
        sx={{ width: "10em", margin: "0 auto" }}
        onClick={() => {
          content.length > 0 && setAdd(false);
          addList();
          addListToProfile();
          setLists((currLists: any) => [
            { name: name, content: content, description: desc },
            ...currLists,
          ]);
        }}
      >
        Submit
      </Button>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
    </Container>
  );
};
