import favBg from "/favorites-empty-bg.png";

interface MediaCardProps {
  src: string | undefined;
  style?: {
    [key: string]: string;
  };
}

const MediaCard = ({ src, style }: MediaCardProps) => {
  return (
    <img
      loading="lazy"
      src={src ? `https://image.tmdb.org/t/p/${src}` : favBg}
      style={style}
      alt="poster"
      className="media-card"
    />
  );
};

export default MediaCard;
