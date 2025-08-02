import Button from "@/app/components/Button";
import { useDispatch } from "react-redux";
import { setPageToLanding } from "@/app/redux/slices/pageTransition/pageTransitionSlice";

const RulesPage = () => {
  const dispatch = useDispatch();

  const handleLandingPage = () => {
    dispatch(setPageToLanding());
  };

  return (
    // Main container for the rules page with responsive styling
    <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 flex justify-center items-start text-gray-200">
      <div className="w-full max-w-4xl space-y-8 leading-relaxed">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center tracking-tight">
          The Official Rules of Chess
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 text-center">
          This guide will walk you through the fundamental rules of chess.
        </p>

        {/* Section: The Goal of the Game */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-400">
            The Goal of the Game
          </h2>
          <p>
            The main goal in chess is to{" "}
            <strong className="text-white">checkmate</strong> your opponent's
            king. A king is in "check" when it is under attack by an opponent's
            piece. Checkmate occurs when the king is in check, and there is no
            legal move to escape the attack.
          </p>
        </section>

        {/* Section: The Chessboard */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-400">The Chessboard</h2>
          <p>
            The board is a grid of 64 squares, arranged in an 8x8 grid. The
            squares alternate in color, typically black and white (or dark and
            light). The board is set up so that the bottom-right corner square
            for each player is always a light square.
          </p>
        </section>

        {/* Section: The Chess Pieces */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-400">The Chess Pieces</h2>
          <p>
            Each player starts with 16 pieces: one King, one Queen, two Rooks,
            two Bishops, two Knights, and eight Pawns.
          </p>

          <h3 className="text-xl font-semibold text-teal-400">
            How the Pieces Move
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
            <li>
              <strong>Pawn:</strong> The pawn moves forward one square at a
              time, but its first move can be two squares. It captures
              diagonally forward. Pawns are the only pieces that cannot move
              backward.
            </li>
            <li>
              <strong>Rook:</strong> The rook moves in a straight line
              horizontally or vertically for any number of squares.
            </li>
            <li>
              <strong>Knight:</strong> The knight moves in an "L" shape: two
              squares in one direction (horizontally or vertically) and then one
              square perpendicularly. The knight is the only piece that can jump
              over other pieces.
            </li>
            <li>
              <strong>Bishop:</strong> The bishop moves diagonally in any
              direction for any number of squares. Each player has two bishops:
              one that moves on light squares and one that moves on dark
              squares.
            </li>
            <li>
              <strong>Queen:</strong> The queen is the most powerful piece. It
              can move any number of squares in any direction (horizontally,
              vertically, or diagonally).
            </li>
            <li>
              <strong>King:</strong> The king can move one square in any
              direction. The king can never move into a square that would put it
              in check.
            </li>
          </ul>
        </section>

        {/* Section: Special Moves */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-400">Special Moves</h2>
          <ul className="list-disc list-inside space-y-4 pl-4 text-gray-300">
            <li>
              <strong>Castling:</strong> This is a special move involving the
              king and one of the rooks. It is the only move where two pieces
              can move simultaneously. It is performed by moving the king two
              squares toward a rook, and then placing the rook on the other side
              of the king. Castling is only possible under specific conditions.
            </li>
            <li>
              <strong>En Passant:</strong> This is a special pawn capture that
              can only occur immediately after an opponent's pawn moves two
              squares forward from its starting position.
            </li>
            <li>
              <strong>Pawn Promotion:</strong> When a pawn reaches the opposite
              side of the board, it must be promoted to a queen, rook, bishop,
              or knight. Most players choose to promote to a queen.
            </li>
          </ul>
        </section>

        {/* Section: Ending the Game */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-teal-400">Ending the Game</h2>

          <h3 className="text-xl font-semibold text-teal-400">
            Winning the Game
          </h3>
          <p>
            The game is won when a player delivers **checkmate**. This is when
            the opponent's king is in check and cannot escape.
          </p>

          <h3 className="text-xl font-semibold text-teal-400">Draws</h3>
          <p>
            The game can end in a draw, where neither player wins. This can
            happen in a few ways:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
            <li>
              <strong>Stalemate:</strong> The player whose turn it is has no
              legal moves, but their king is not in check.
            </li>
            <li>
              <strong>Repetition:</strong> The same position occurs three times.
            </li>
            <li>
              <strong>Fifty-Move Rule:</strong> Fifty moves have passed without
              a pawn move or a capture.
            </li>
            <li>
              <strong>Insufficient Material:</strong> Neither player has enough
              pieces left on the board to force a checkmate.
            </li>
          </ul>
        </section>

        {/* Final call to action */}
        <div className="flex flex-col gap-6 items-center justify-center">
          <p className="text-lg sm:text-xl text-teal-400 text-center pt-8">
            Ready to start playing?
          </p>
          <Button
            text="Return"
            className="bg-customGreen text-white font-semibold"
            onClick={handleLandingPage}
          />
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
