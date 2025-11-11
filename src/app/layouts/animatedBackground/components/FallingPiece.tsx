const FallingPiece = ({ id }: { id: number }) => {
  const PIECES = ["♚", "♛", "♜", "♝", "♞", "♟️"];

  const getRandomPiece = () =>
    PIECES[Math.floor(Math.random() * PIECES.length)];
  const getRandomLeft = () => Math.random() * 100; // in vw
  const getRandomDuration = () => 5 + Math.random() * 5; // seconds
  const getRandomSize = () => 16 + Math.random() * 24; // px

  const style: React.CSSProperties = {
    position: "absolute",
    top: "-5%",
    left: `${getRandomLeft()}vw`,
    fontSize: `${getRandomSize()}px`,
    animation: `fall ${getRandomDuration()}s linear infinite`,
    opacity: 0.4,
    color: id % 2 == 0 ? "white" : "green",
    pointerEvents: "none",
    userSelect: "none",
  };

  return <div style={style}>{getRandomPiece()}</div>;
};

export default FallingPiece;
