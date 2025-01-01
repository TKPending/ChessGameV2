type Props = {
  kingColor: "white" | "black";
  animateDirection: "left" | "right";
};

const KingPiece = ({ kingColor, animateDirection }: Props) => {
  return (
    <div className={`animate-from-${animateDirection}`}>
      <img src={`${kingColor}-king.png`} alt={`${kingColor} king piece`} />
    </div>
  );
};

export default KingPiece;
