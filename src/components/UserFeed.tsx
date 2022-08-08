import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ProfileFeedProps } from "../types/types";

export const UserFeed = ({ feed }: ProfileFeedProps) => {
  return (
    <div className="user-feed-container">
      <Typography variant="h5" className="user-feed">
        User Feed
      </Typography>
      <Card className="user-feed-div">
        <CardContent className="user-feed-grid">
          {feed.slice(0, 18).map((event) => (
            <div className="user-feed-mapped-grid" key={event.created}>
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
    </div>
  );
};
