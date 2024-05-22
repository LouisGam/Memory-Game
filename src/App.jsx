import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
const imageGlob = import.meta.glob("../Karate Images/*"); // Import all images from the Karate Images folder

function App() {
  const [currentCard, setCurrentCard] = useState({filepath: '', hasBeenSeen: false}); // Stores the currently displayed card object
  const [allCards, setAllCards] = useState([]); // Stores the currently displayed card object

  const [score, setScore] = useState(0); // Tracks player score
  const [openDialog, setOpenDialog] = useState(false); // Controls the congratulation dialog
  let randomIndex;

  function initializeCards(){
  // Get all image file paths 
  const imageFilePathArray = Object.keys(imageGlob);

  // Convert file paths to card objects with additional properties
  const imageFileObjects = imageFilePathArray.map((imageFilePath) => {
    return {
      filepath: imageFilePath, // Path to the image
      hasBeenSeen: false, // Flag to track if the card has been seen
    };
  });
  setAllCards(imageFileObjects);
  };

  // Function to pick a random card (excluding seen cards)
  const getRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * allCards.length);
    console.log('the random index was', randomIndex);
    return randomIndex;
  };

  // Handle user guess ("yes" or "no")
  const handleGuess = (guess) => {
    if (guess === currentCard.hasBeenSeen ) {
      setScore(score + 1);
      //const tempAllCards = allCards;
      //console.log(tempAllCards);
      //tempAllCards[randomIndex].hasBeenSeen = true;
      setAllCards(prev => prev.map((card, index) => {if(index = randomIndex) {return {filepath: card.filepath, hasBeenSeen: true}} else {return card}}));
      console.log('the random index was', randomIndex, 'allcards after it was changed', allCards);
      if (score === 12) { // All cards seen, congratulations!
        setOpenDialog(true);
      } else {
        randomIndex = getRandomIndex(); // Fetch a random card on mount
        setTimeout(() => {
          console.log('what current card is becoming', allCards[randomIndex]);
          setCurrentCard(allCards[randomIndex]);
        }, 3000);
        
        }
    } else {
      setScore(0); // Reset score on wrong guess
      randomIndex = getRandomIndex(); // Fetch a random card on mount
      setCurrentCard(allCards[randomIndex]);
  
    }
    return null;     

  };

  // Handle congratulation dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    setScore(0);
    setSeenCards([]);
  };

  useEffect(() => {
    initializeCards();
    randomIndex = getRandomIndex(); // Fetch a random card on mount
    setCurrentCard(allCards[randomIndex]);
  }, []); // Empty dependency array to run only on mount


  return (
    <div className="App">
      <h1>Memory Game (Karate Images)</h1>
      {currentCard && ( // Only display card if available
        <div>
          <img src={currentCard.filepath} alt="Karate Image" style={{width:'250px', height:'250px'}} />
          <p>Guess: Have you seen this before?</p>
          <button onClick={() => handleGuess(true)}>Yes</button>
          <button onClick={() => handleGuess(false)}>No</button>
        </div>
      )}
      <p>Score: {score}</p>
      {/*<Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText>You have a great memory!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Play Again</Button>
        </DialogActions>
    </Dialog>*/}
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
