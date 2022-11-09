interface MediaCardProps {
  src: string;
  width?: string;
  height?: string;
}

const MediaCard = ({ src, width, height }: MediaCardProps) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/${src}`}
      style={{ width: width ? width : "", height: height ? height : "" }}
      alt="poster"
      className="media-card"
    />
  );
};

export default MediaCard;
