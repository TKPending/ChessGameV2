# Chess Game ♟️

**A two-player chess game built with modern web technologies.**

This project was created using **Next.js**, **TypeScript**, and **TailwindCSS**, bringing together frontend interactivity and backend logic to simulate a realistic chess experience. 

<img width="1709" alt="gameplay" src="https://github.com/user-attachments/assets/b93d6ec2-ad3d-4083-86bc-37298429d17a" />
<img width="1710" alt="landingpage" src="https://github.com/user-attachments/assets/90349baf-20a6-4423-92c0-3955128a6b56" />


## <ins>Features 👶</ins>

**Technologies Used 📝**

- **Next.js**: For building the frontend and server-side rendering.
- **TypeScript**: To ensure type safety and maintain scalability.
- **TailwindCSS**: For designing a clean and responsive user interface.
- **Redux**: For state management, tracking the board state, player turns, and move history.

**Algorithms 🤖**

The heart of this chess game lies in its backend logic, enabling smooth gameplay and realistic rule enforcement. Here’s a breakdown of the key algorithms powering the game:

**Move Generation Algorithm**

This algorithm calculates all valid moves for each piece on the board. Depending on the piece type (e.g., pawn, rook, bishop), it traverses the board to find all possible moves while obeying the rules of chess.

- Uses a grid-based system to calculate paths and stops when an obstacle (ally or enemy piece) is encountered.
- Efficiently handles edge cases, such as pawns reaching promotion or castling rules.

**Simulated Move Validation**

This feature ensures the integrity of gameplay by validating moves before allowing them.

- Once a piece is clicked, the algorithm simulates the move and checks if it would put the player’s king in check.
- Any move that leaves the king in check is deemed invalid and removed from the list of possible moves.

**Use Case**:

Prevents illegal moves while dynamically updating valid move options as the board state evolves.


## <ins> Backend Features 📦</ins>

**King Check and Checkmate Detection**

The game actively monitors whether a king is in check or checkmate.

- If a move places the king in check, it triggers warnings on the frontend.
- The algorithm determines checkmate by ensuring no valid moves exist to remove the king from danger.

**Implementation**:

- Combines “Simulated Move Validation” with recursive checks across all enemy moves.

**Pawn Promotion Logic**

When a pawn reaches the opposite side of the board, players can promote it to a queen, rook, bishop, or knight. The backend dynamically updates the piece while maintaining the game’s integrity.

**Castling Rules**

Validates castling moves by ensuring the king and rook haven’t moved, there are no pieces in between, and the king doesn’t move through or into check.

**Move History Tracking**
<br>
Tracks every move made in the game, allowing for future features such as undo functionality or move history review.



## <ins>Frontend Features 🎨</ins>

**Responsive Chessboard**

The chessboard dynamically resizes based on screen dimensions, ensuring a consistent and immersive user experience on all devices.

**Player Indicators**

- Displays the current player’s turn and highlights when a king is in check.
  
**Interactive Feedback**

- Pieces highlight possible moves when selected, helping players understand the rules and strategies.

  

## <ins>Future Improvements 🔮</ins>

**AI Opponent**:

Implementing an AI to play against the user using decision-making algorithms such as Minimax or Alpha-Beta Pruning.

**Multiplayer Mode**:

Enable real-time gameplay between two remote players using WebSockets.

**Enhanced Analytics**:

Add move recommendations or game analysis for improving player strategies.
