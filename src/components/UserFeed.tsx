import { Container, Typography } from "@mui/material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

interface UserFeedProps {
  feed: [{ content: string; created: string }];
}
export const UserFeed = ({ feed }: UserFeedProps) => {
  return (
    <Container sx={{ backgroundColor: "#141c30", height: "60vh" }}>
      <Container
        sx={{
          display: "flex",
          width: "50%",
          justifyContent: "flex-end",
          paddingTop: "2em",
        }}
      >
        {feed.map((event) => (
          <Typography sx={{ color: "white" }}>
            {event.content}{" "}
            <span style={{ color: "grey" }}>
              {formatDistanceToNow(new Date(event.created))}
              /n ago.
            </span>
          </Typography>
        ))}
      </Container>
    </Container>
  );
};
