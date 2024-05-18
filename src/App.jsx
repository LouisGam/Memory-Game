import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
const imageGlob = import.meta.glob("../Karate Images/*"); // Import all images from the Karate Images folder

function App() {
  const [currentCard, setCurrentCard] = useState(null); // Stores the currently displayed card object
  const [seenCards, setSeenCards] = useState([]); // Keeps track of seen cards (indexes)
  const [score, setScore] = useState(0); // Tracks player score
  const [openDialog, setOpenDialog] = useState(false); // Controls the congratulation dialog

  // Get all image file paths 
  const imageFilePathArray = Object.keys(imageGlob);

  // Convert file paths to card objects with additional properties
  const imageFileObjects = imageFilePathArray.map((imageFilePath) => {
    return {
      filepath: imageFilePath, // Path to the image
      hasBeenSeen: false, // Flag to track if the card has been seen
    };
  });

  // Function to pick a random card (excluding seen cards)
  const getRandomCard = () => {
    const availableCards = imageFileObjects.filter((card) => !seenCards.includes(card.filepath));
    if (availableCards.length === 0) { // All cards seen, game over (optional: reset here)
      return null;
    }
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIndex];
  };

  // Handle user guess ("yes" or "no")
  const handleGuess = (guess) => {
    if (guess === "yes" && currentCard && !currentCard.hasBeenSeen) {
      setSeenCards([...seenCards, currentCard.filepath]);
      setScore(score + 1);
      if (score === imageFileObjects.length) { // All cards seen, congratulations!
        setOpenDialog(true);
      } else {
        const newCard = getRandomCard();
        setCurrentCard(newCard);
      }
    } else {
      setScore(0); // Reset score on wrong guess
      setSeenCards([]);
      const newCard = getRandomCard();
      setCurrentCard(newCard);
    }
  };

  // Handle congratulation dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    setScore(0);
    setSeenCards([]);
  };

  useEffect(() => {
    const newCard = getRandomCard(); // Fetch a random card on mount
    setCurrentCard(newCard);
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="App">
      <h1>Memory Game (Karate Images)</h1>
      {currentCard && ( // Only display card if available
        <div>
          <img src={currentCard.filepath} alt="Karate Image" />
          <p>Guess: Have you seen this before?</p>
          <button onClick={() => handleGuess("yes")}>Yes</button>
          <button onClick={() => handleGuess("no")}>No</button>
        </div>
      )}
      <p>Score: {score}</p>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText>You have a great memory!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Play Again</Button>
        </DialogActions>
      </Dialog>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}

export default App;
