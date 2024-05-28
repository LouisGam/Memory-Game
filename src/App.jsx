import { useState, useEffect } from 'react';
import './App.css';
const imageGlob = import.meta.glob("../Karate Images/*"); // Import all images from the Karate Images folder

function App() {
  const [currentCard, setCurrentCard] = useState({filepath: '', hasBeenSeen: false}); // Stores the currently displayed card object
  const [allCards, setAllCards] = useState([]); // Stores the currently displayed card object

  const [score, setScore] = useState(0); // Tracks player score
  const [userWon, setUserWon] = useState(false); // Controls the congratulation dialog
  let randomIndex = 0;

  function initializeCards(){
  // Get all image file paths 
  const imageFilePathArray = Object.keys(imageGlob);

  // Convert file paths to card objects with additional properties
  const imageFileObjects = imageFilePathArray.map((imageFilePath, index) => {
    return {
      id: index,
      filepath: imageFilePath, // Path to the image
      hasBeenSeen: false, // Flag to track if the card has been seen
    };
  });
  setAllCards(imageFileObjects);
  };

  // Function to pick a random card (excluding seen cards)
  const getRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * allCards.length);
    return randomIndex;
  };

  // Handle user guess ("yes" or "no")
  const handleGuess = (guess) => {
    if (guess === currentCard.hasBeenSeen ) {
      setScore(prevScore => {
        let newScore = prevScore + 1;
        if (newScore === 5) { 
          setUserWon(true);
        } else {
          }
          return newScore;
      } );
     
      setAllCards(prev => prev.map((card) => {if(card.id === currentCard.id) {return {id: card.id, filepath: card.filepath, hasBeenSeen: true}} else {return card}}));
      
    } else {
      setScore(0); // Reset score on wrong guess
    }
    return null;     

  };

  function setNextCard() {
    let randomIndex = getRandomIndex();
    setCurrentCard(allCards[randomIndex]);
  }

  function resetGame() {
    setScore(0);
    setUserWon(false);
    setAllCards(prev => prev.map((card) => {
      return {  
        id:card.id,
        filepath:card.filepath,
        hasBeenSeen:false
      };
    }))
  }


  useEffect(() => {
    //initialize the allCards state to populate with the filepaths and its initial mapped objects
    initializeCards();
  }, []); 

  useEffect(() => {
    //Fetch a random card on mount
    if (allCards.length > 0){
      setNextCard();
    }
  }, [allCards]);

  return (
    <div className="App">
      <h1>Karate Memory Game</h1>
      {currentCard && ( // Only display card if available
        <div>
          <img src={currentCard.filepath} alt="Karate Image" style={{width:'250px', height:'250px'}} />
          <p className="Guess">Guess: Have you seen this before?</p>
          <button onClick={() => handleGuess(true)}>Yes</button>
          <button onClick={() => handleGuess(false)}>No</button>
        </div>
      )}
      <p className="Score"> Score: {score}</p>
      {userWon ? (
      <div>
        <h1>You Won Good Memory!</h1>
        <button onClick={() => {resetGame();}}>Play Again</button>
      </div>) : ""}
    </div>
  );
}

export default App;
