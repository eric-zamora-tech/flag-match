import {useState} from 'react';

function Question(props) {
    const imgSrc = props.imgSrc;
    const answerChoices = props.choices;
    const startGameFunction = props.startGame;
    
    const [guessedCorrectly, setGuessedCorrectly] = useState(false);

    function checkAnswer(isCorrect) {
        if(isCorrect) {
            setGuessedCorrectly(true);
            return;
        }
        console.log("Incorrect");
    }

    return (
    <>
        <h2>Guess the flag:</h2>
        <img src={imgSrc}></img>
        <div className="card">
        {answerChoices.map((choice) => <button onClick={() => checkAnswer(choice.isCorrect)} key={choice.name}>{choice.name}</button>)}
        </div>
        {guessedCorrectly ? <button onClick={() => {setGuessedCorrectly(false); startGameFunction()}} className="danger">Next &rarr;</button> : null}
    </>
   ) 
}

export default Question