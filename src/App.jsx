import Question from './components/Question';
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [hasNotStarted, setHasNotStarted] = useState(true);
  const [answerChoices, setAnswerChoices] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [flagToGuessSrc, setFlagToGuessSrc] = useState('');
  
  function startGame() {
    setHasNotStarted(false);

    const answerChoices = genAnswerChoices();
    setAnswerChoices(answerChoices.sort((a, b) => 0.5 - Math.random()));
  }

  function genAnswerChoices() {
    const answerChoices = [];
    const correctCountryIndex = Math.floor(Math.random() * countryData.length);

    setFlagToGuessSrc(countryData[correctCountryIndex].flags.png);
    answerChoices.push({name: countryData[correctCountryIndex].name.common, isCorrect: true});

    for(let i = 0; i < 3; i++) {
      let wrongCountryIndex = Math.floor(Math.random() * countryData.length);
      if(wrongCountryIndex == correctCountryIndex) {
        i--;
        continue;
      }
      for(let j = 0; j < answerChoices.length; j++) {
        if(answerChoices[j].name === countryData[wrongCountryIndex].name.common) {
          i--;
          continue;
        }
      }
      answerChoices.push({name: countryData[wrongCountryIndex].name.common, isCorrect: false});
    }

    return answerChoices;
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
            setCountryData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
  }, []);

  if(hasNotStarted) {
    return (
      <button onClick={startGame}>Start Game</button>
    )
  }

  return (
    <>
      <Question startGame={startGame} imgSrc={flagToGuessSrc} choices={answerChoices}/>
    </>
  )
}

export default App
