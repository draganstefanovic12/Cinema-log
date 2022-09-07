import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Feed, Media } from "../../types/types";

export type ProfileFeedProps = {
  feed: Feed[];
  name: string;
  favorites?: Media[] | undefined;
};

export const UserFeed = ({ feed, name }: ProfileFeedProps) => {
  return (
    <div className="user-feed-container">
      <Typography variant="h5" className="user-feed">
        {name}
      </Typography>
      <Card className="user-feed-div">
        <CardContent className="user-feed-grid">
          {feed.slice(0, 16).map((event, i) => (
            <div className="user-feed-mapped-grid" key={i}>
              <Typography key={event.created} className="feed-cont">
                <a href={`/Cinema-log/#/user/${event.user}`}>{event.user}</a>{" "}
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
              <Typography className="minutes-ago">
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
      {name === "Friend Activity" && (
        <Typography>
          Browse <a href="/Cinema-log/#/search/allusers/multi">all users</a> and
          find someone who shares the same interests as you.
        </Typography>
      )}
    </div>
  );
};
