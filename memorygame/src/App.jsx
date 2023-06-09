import { useState, useEffect } from "react";
import "./App.css";

const cardImages = [
  { src: "/images/1.png" },
  { src: "/images/2.png" },
  { src: "/images/3.png" },
  { src: "/images/4.png" },
  { src: "/images/5.png" },
  { src: "/images/6.png" },
];
function App() {
  const [cards, setCards] = useState([]);
  const [cardOne, setcardOne] = useState(null);
  const [cardTwo, setcardTwo] = useState(null);

  function shuffle() {
    const doubled = [...cardImages, ...cardImages];
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    const memoryCards = shuffled.map((card) => ({
      ...card,
      id: Math.random(),
    }));
    setCards(memoryCards);
  }

  function handleCardChoise(card) {
    // om var kort har ingen värde/null så körds setCardOne för att null är false. Om true om det har värde körs card två
    cardOne ? setcardTwo(card) : setcardOne(card);
    console.log(card);
  }

  //useEffct körs när sidan renderas för förstå gången och när cardOne och cardTwo data ändras

  useEffect(() => {
    //båda måste vara sanna för att slippa buggar annrs köra den när bara en kort är valt
    if (cardOne && cardTwo) {
      if (cardOne.src === cardTwo.src) {
        console.log("Matched");
        reset();
      } else {
        console.log("Not matched");
        reset();
      }
    }
    //när det sker ändringar på någon av dom värden så körd useEffect
  }, [cardOne, cardTwo]);

  function reset() {
    setcardOne(null);
    setcardTwo(null);
  }

  return (
    <div className="App">
      <button className="start-game" onClick={shuffle}>
        Start Game
      </button>
      <CardDeck cards={cards} handleCardChoise={handleCardChoise} />
    </div>
  );
}

function CardDeck({ cards, handleCardChoise }) {
  return (
    <div className="cards">
      {cards.map((card) => {
        return (
          <Card key={card.id} card={card} handleCardChoise={handleCardChoise} />
        );
      })}
    </div>
  );
}

function Card({ card, handleCardChoise }) {
  function flip() {
    handleCardChoise(card);
  }
  return (
    <div key={card.id} className="deckOfCards">
      <div className="card-container">
        <img className="frontCard" src={card.src} alt="front of card" />
        <img
          onClick={flip}
          className="backCard"
          src="/images/cover.png"
          alt="Back of card"
        />
      </div>
    </div>
  );
}

export default App;
