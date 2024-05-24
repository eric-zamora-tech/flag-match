import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [isLoading, setLoading] = useState(true);
  const [countries, setCountries] = useState({list: []});
  const answerChoices = [];

  useEffect(() => {
    getAPIData();
  }, []);

  const getAPIData = async () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  if(isLoading) {
    return <div>Loading...</div>;
  }

  const correctAnswer = Math.floor(Math.random() * countries.length);
  answerChoices.push(countries[correctAnswer]);

  for(let i = 0; i < 3; i++) {
    let wrongAnswer = Math.floor(Math.random() * countries.length);
    if(wrongAnswer == correctAnswer) {
      i--;
      continue;
    }
    answerChoices.push(countries[wrongAnswer]);
  }

  const shuffledAnswerChoices = answerChoices.sort((a, b) => 0.5 - Math.random());

  function checkAnswer(answerChoice) {
    if(answerChoice == countries[correctAnswer].name.common) {
      console.log("correct");
      return;
    }
    console.log("incorrect");
  }

  return (
    <>
      <h2>Guess the flag:</h2>
      <img src={countries[correctAnswer].flags.png}></img>
      <div className="card">
        {shuffledAnswerChoices.map((choice) => <button onClick={() => checkAnswer(choice.name.common)} key={choice.cca2}>{choice.name.common}</button>)}
      </div>
    </>
  )
}

export default App
