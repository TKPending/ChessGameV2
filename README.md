♟️ ChessGame — Documentation

🌍 Overview

ChessGameV2 is a browser-based chess application built with React, TypeScript, and Redux Toolkit.
It runs entirely client-side and supports full chess gameplay with history tracking, undo/redo, time controls, and animated navigation.

The design goals are simple but ambitious:
	•	🧠 Clear, predictable state management
	•	🎮 Smooth player experience
	•	🛠️ Code that future-you won’t curse at

⸻

🧑‍💻 For Players (End-User Guide)

🎯 What You Can Do
	•	♟️ Play a full local chess match (two players)
	•	🏷️ Set custom player names
	•	👀 View legal moves and captures
	•	🧾 Track full move history
	•	⏪ Undo and review previous moves
	•	🧠 Detect:
	•	Checkmate
	•	Stalemate
	•	Win by time
	•	⏱️ Play with configurable time controls (or infinite time)

⸻

🔁 Game Flow
	1.	🏁 Landing Page
Start a new game or view the rules
	2.	🧑‍🤝‍🧑 Player Setup
Enter player names
	3.	⚙️ Game Settings
Choose time controls
	4.	♜ Chessboard
Play the game, view history, and handle endgame states

Page transitions are animated, so the app feels like a continuous journey rather than a set of disconnected screens.

⸻

🧠 For Developers (How the Machine Thinks)

🧰 Tech Stack
	•	⚛️ React — UI rendering
	•	🟦 TypeScript — Type safety everywhere
	•	🧱 Redux Toolkit — Global state control
	•	🎞️ Framer Motion — Page & UI animations
	•	🎨 Tailwind CSS — Styling

⸻

🗂️ Project Structure

src/
├─ app/
│  ├─ pages/          # Full-screen views (Landing, Board, Settings)
│  ├─ components/     # Reusable UI components
│  ├─ layouts/        # Backgrounds & persistent visuals
│  ├─ redux/          # Redux slices & reducers
│  ├─ utils/          # Chess logic, time helpers, navigation helpers
│  ├─ types/          # Shared TypeScript definitions

Each folder has one job. No junk drawers.

⸻

🧭 Navigation System (Redux-Driven)

❓ Why Not React Router?

Navigation is controlled through Redux instead of URLs because:
	•	🧩 The app behaves like a step-based flow
	•	🎞️ Animation direction matters
	•	🧠 Navigation state must stay in sync with game state

⸻

📍 How Navigation Works

Pages are defined in order:

export const pages = [
  PageEnum.landing,
  PageEnum.enterPlayerNames,
  PageEnum.gameSettings,
  PageEnum.board,
  PageEnum.gameRules,
];

Redux tracks:
	•	index → current page
	•	prevIndex → previous page

This allows the app to infer animation direction automatically:
	•	➡️ Forward navigation → slide left
	•	⬅️ Backward navigation → slide right

Smooth, deterministic, drama-free.

⸻

🧩 Redux State Overview

There are three core slices, each with a clearly defined role.

⸻

🗺️ PageState

Controls where the user is.

{
  index: number;
  prevIndex: number | null;
}

No chess logic here.
This slice only answers: “Which screen should be visible?”

⸻

♟️ GameState

Represents the current live game.

Tracks:
	•	🧑‍🤝‍🧑 Players
	•	Name
	•	Team (white / black)
	•	Captured pieces
	•	Remaining time
	•	🔄 Current turn
	•	🏁 Game flags:
	•	isPlaying
	•	isKingInCheckmate
	•	stalemate
	•	winByTime
	•	❗ Error state
	•	⏪ Undo / redo availability
	•	👁️ View mode (used when reviewing history)

This is the present moment of the game.

⸻

🕰️ HistoryState

Represents everything that already happened.

Tracks:
	•	🔢 Move count
	•	♟️ Chessboard snapshots (TileType[][])
	•	🧾 Move history entries
	•	🧠 Previous game states

This makes time travel possible without guesswork.

⸻

♜ Chessboard Representation
	•	The board is an 8×8 2D array
	•	Each tile knows:
	•	📍 Position
	•	♟️ Occupying piece (if any)

On every move:
	1.	🧱 A new board snapshot is created
	2.	📦 The snapshot is pushed to history
	3.	🧾 Move metadata is recorded

No mutation archaeology required later.

⸻

🧾 Move History

Each move records:
	•	🔢 Move number
	•	📤 Origin → destination
	•	♟️ Piece moved
	•	💥 Capture info
	•	👑 Pawn promotion data
	•	🎯 Selection state (for UI)

Selecting a move does not replay logic.
The board is rendered directly from historical state.

This is intentional. It avoids subtle bugs and temporal paradoxes.

⸻

⏪ Undo & Redo Philosophy

Undo does not mean “reverse the last instruction.”

Instead:
	•	🕰️ Restore a known-good snapshot
	•	👁️ Enter view mode
	•	🧠 Let Redux handle consistency

This is why undo never breaks the game.

⸻

⏱️ Time Control System
	•	⌛ Time categories are user-defined
	•	🔢 Internally converted to numeric values
	•	➕ Increment applied after moves
	•	♾️ Infinite time short-circuits the timer logic

Time is treated as data, not behavior. That’s the secret.

⸻

❗ Error Handling

Errors live centrally:

{
  isError: boolean;
  message: string;
}

This supports:
	•	🧩 UI-level error displays
	•	🔮 Future expansion into richer error states

⸻

🏁 Endgame Handling

The game can end via:
	•	👑 Checkmate
	•	🤝 Stalemate
	•	⏱️ Time expiration

When this happens:
	•	🏆 Winner is calculated
	•	👁️ Game enters view mode
	•	🪟 Endgame modal is displayed

Closing the modal allows board review without resuming play.

⸻

🔄 Resetting the Game

Reset logic supports:
	•	🔁 Full game restart
	•	🔄 Optional color swapping
	•	⏱️ Time reset
	•	🧹 Cleared captures and history

All done without tearing down the app.

⸻

🚀 Extending the Project

This architecture is intentionally extensible.

Easy future additions:
	•	🌐 Online multiplayer
	•	🤖 AI opponent
	•	📄 PGN export/import
	•	💾 Save & load games
	•	🎨 Board themes

The hardest parts—history, undo safety, navigation—are already solved.

⸻

▶️ Running the Project

git clone https://github.com/TKPending/ChessGameV2
npm install
npm run dev


⸻

🧠 Final Thoughts

This isn’t just a chess game.
It’s a state-driven system that happens to be chess-shaped.

Once you internalize how navigation, history, and live game state are deliberately separated, the entire codebase becomes legible instead of intimidating.

If you want next steps, we can:
	•	📊 Add architecture diagrams
	•	🧬 Auto-generate type docs
	•	📝 Turn this into a polished README
	•	🧪 Document test strategy

The board is set.
