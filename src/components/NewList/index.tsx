import {
  Button,
  ClickAwayListener,
  Container,
  Input,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DebouncedSearch from "../DebouncedSearch";
import { useState } from "react";
import { addNewList } from "../../features/api/backendApi";
import { Media, MediaStringUndefined } from "@/pages/MediaPage/types";

type NewListProps = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewList = ({ setAdd }: NewListProps) => {
  const [desc, setDesc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [content, setContent] = useState<MediaStringUndefined[]>([]);

  const listToAdd = {
    name: name,
    content: JSON.stringify(content),
    description: desc,
  };

  const handleFilter = (date: string) => {
    setContent(content.filter((list: MediaStringUndefined) => list.createdAt !== date));
  };

  const handleUpdateContent = (content: Media) => {
    setContent((currCont) => [...currCont, content]);
  };

  const handleAddNewList = () => {
    content.length > 0 && setAdd(false);
    addNewList(listToAdd);
  };

  return (
    <ClickAwayListener onClickAway={() => setAdd(false)}>
      <Container className="new-list-cont">
        <Typography>List name</Typography>
        <Input
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />
        <Typography>Description</Typography>
        <TextareaAutosize minRows={3} onChange={(e) => setDesc(e.target.value)} />
        <Typography>List content</Typography>
        <DebouncedSearch handleClick={handleUpdateContent} />
        {content.map((media: MediaStringUndefined) => (
          <Container sx={{ display: "flex", gap: "1em" }}>
            <Typography>{media.title}</Typography>
            <DeleteIcon onClick={() => handleFilter(media.createdAt!)} className="svg" />
          </Container>
        ))}
        <Button onClick={handleAddNewList}>Submit</Button>
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      </Container>
    </ClickAwayListener>
  );
};

export default NewList;
