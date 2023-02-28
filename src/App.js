import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';

  const cardImages = [
    { "src": "/img/helmet-1.png", matched:false },
    { "src": "/img/potion-1.png", matched:false },
    { "src": "/img/ring-1.png"  , matched:false },
    { "src": "/img/scroll-1.png", matched:false },
    { "src": "/img/shield-1.png", matched:false },
    { "src": "/img/sword-1.png" , matched:false }
  ]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => 
  {
    const shuffledCards = [...cardImages,...cardImages]
    .sort(() => Math.random() -0.5)
    .map(card => ({
      ...card,
      id: Math.random()
      }
    ))
    
    setCards(shuffledCards);
    setTurns(0);
    
  }

  const handleChoice = (card) => {       
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);        

  }

  useEffect(() => {    
    compareChoices(choiceOne, choiceTwo);      
  }, [choiceOne, choiceTwo])
  
  const compareChoices = (choiceOne, choiceTwo) => {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id ){        

        setCards(prevState => {
          return prevState.map(card =>{
            if(card.src === choiceOne.src){
              return {...card,matched:true}
            }            
              return card;            
          })
        })                
        
      } 
      
        setTimeout(() => {
          resetTurn();
        }, 1000); 
                               
    }
    
  }

  const resetTurn = () => {
    setTurns(prev => prev+1)
    setChoiceOne(null);
    setChoiceTwo(null);
  }
  

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <h3>Turns: {turns}</h3>
      <button onClick={shuffleCards} >New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            card={card} 
            key={card.id} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}/>
          )          
        )}
      </div>
    </div>
  );
}

export default App