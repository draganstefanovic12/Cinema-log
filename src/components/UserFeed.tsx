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
      content2?: string;
      content3: string;
    }
  ];
}
export const UserFeed = ({ feed }: UserFeedProps) => {
  return (
    <Container sx={{ backgroundColor: "#181e26", height: "52.5em" }}>
      <Container className="user-feed-container">
        {feed.slice(0, 18).map((event) => (
          <div
            key={event.created}
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
                {event.content2}
                {event.id && (
                  <Link
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                    to={`/${event.type}/${event.id}`}
                  >
                    {" "}
                    {event.name}
                  </Link>
                )}{" "}
                {event.content3 &&
                  (event.content3 !== "to the watchlist" ? (
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                      }}
                      to={`/user/${event.content3}`}
                    >
                      {event.content3}
                    </Link>
                  ) : (
                    event.content3
                  ))}
              </span>
              {!event.id && (
                <span style={{ color: "#667d93" }}> {event.content}</span>
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
