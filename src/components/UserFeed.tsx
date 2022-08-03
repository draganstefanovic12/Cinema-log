import { Card, CardContent, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface Feed {
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

export const UserFeed = ({ feed }: Feed) => {
  return (
    <Container className="user-feed-container">
      <Typography variant="h5" className="user-feed">
        User Feed
      </Typography>
      <Card className="user-feed-div">
        <CardContent style={{ backgroundColor: "#161b22", width: "100%" }}>
          {feed.slice(0, 18).map((event) => (
            <div style={{ display: "flex" }} key={event.created}>
              <Typography key={event.created} className="feed-cont">
                <Link to={`/user/${event.user}`}>{event.user}</Link>{" "}
                <span style={{ color: "#667d93" }}>
                  {event.content2}
                  {event.id && (
                    <Link to={`/${event.type}/${event.id}`}> {event.name}</Link>
                  )}{" "}
                  {event.content3 &&
                    (event.content3 !== "to the watchlist" ? (
                      <Link to={`/user/${event.content3}`}>
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
                <span
                  style={{
                    color: "#667d93",
                    marginLeft: "1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatDistanceToNow(new Date(event.created))} ago.
                </span>
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};
