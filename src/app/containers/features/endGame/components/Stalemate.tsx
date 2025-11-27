const Stalemate = () => {
  return (
    <div className="flex flex-col items-center text-center gap-8 mb-4">
      <p className="text-4xl tracking-tight text-[rgba(255,215,128,0.75)] font-bold drop-shadow-[0_0_10px_rgba(255,215,128,0.45)]">
        Stalemate!
      </p>
      <p className="text-lg text-[rgba(255,215,128,0.65)] max-w-[300px] leading-snug">
        No legal moves remain, but the king is not in check.
      </p>

      <div className=" flex gap-4">
        <img
          src={`white-king.png`}
          className="h-28 w-28 animate-[float_3s_infinite] drop-shadow-[0_0_25px_rgba(255,215,128,0.55)] 
               animate-softPulse"
          alt="king piece"
        />
        <img
          src={"black-king.png"}
          className="h-28 w-28 animate-[float_3s_infinite] drop-shadow-[0_0_25px_rgba(255,215,128,0.55)] 
               animate-softPulse"
          alt="king piece"
        />
      </div>
    </div>
  );
};

export default Stalemate;
