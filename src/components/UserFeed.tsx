import { Container, Typography } from "@mui/material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

interface UserFeedProps {
  feed: [
    {
      content: string;
      created: string;
      user: string;
      id?: number;
      name?: string;
      type?: string;
    }
  ];
}
export const UserFeed = ({ feed }: UserFeedProps) => {
  return (
    <Container sx={{ backgroundColor: "#141c30", height: "60vh" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          paddingTop: "2em",
          alignItems: "center",
        }}
      >
        {feed.map((event) => (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography key={event.created} className="feed-cont">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={`/user/${event.user}`}
              >
                {event.user}
              </Link>{" "}
              <span style={{ color: "#667d93" }}>
                {event.id && `has added`}{" "}
                {event.id && (
                  <Link
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                    to={`/${event.type}/${event.id}`}
                  >
                    {event.name}
                  </Link>
                )}{" "}
                {event.id && `to the watchlist`}.
              </span>
              {!event.id && (
                <span style={{ color: "#667d93" }}>{event.content}</span>
              )}
            </Typography>
            <Typography>
              <span style={{ color: "#667d93", marginLeft: "1em" }}>
                {formatDistanceToNow(new Date(event.created))} ago.
              </span>
            </Typography>
          </div>
        ))}
      </Container>
    </Container>
  );
};
