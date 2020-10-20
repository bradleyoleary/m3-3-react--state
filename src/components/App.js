import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import words from "../data/words.json";
import { colors, contentWidth } from "./GlobalStyles";

const initialGameState = { started: false, over: false, win: false}; //Exercise 1

const App = () => {
  const [game, setGame] = useState(initialGameState); //Exercise 1
  const [word, setWord] = useState({ str: "" });
  const [wrongGuesses, setWrongGuesses] = useState ([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const handleStart = () => {
    setGame({ ...game, started: !game.started });

    if(word.str === "") {
      getNewWord();
    }
  };

  const getNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord ({
      ...word,
      str: randomWord,
      revealed: randomWord.split("").map (() => ""),
    });
  };

  const handleGuess = (letter) => {
    console.log(letter)
    const splitWord = word.str.split("")

    setUsedLetters([...usedLetters, letter])

    if(splitWord.includes(letter)) {
      splitWord.forEach((w, index) => {
        if (letter === w) {
          const newWord = {...word};
          newWord.revealed[index] = letter;
          setWord(newWord)
        
        };
      });
    } else {
      setWrongGuesses([...wrongGuesses, letter])
    }

    if(usedLetters.length >= 9) {
      handleEndGame(false)
    } 
    else if (word.revealed.filter((w) => w === "").length === 0) {
      handleEndGame(true);
    };
  };

  const handleReset = () => {  
    getNewWord();
    setWrongGuesses([]); 
    setUsedLetters([]);
  }

  const handleEndGame = (win) => {
    setGame ({
      started: true,
      paused: false,
      over: true,
      win: { win },
    });
    alert(`Game Over! You ${win ? "win" : "lose"}`)
  }

 
  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
      <Button onClickFunc={handleStart}>
        {game.started ? "Pause" : word.str.length > 1 ? "Continue" : "Start"}
        </Button> 
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
        <>
        <Container>
          <Deadman />
          <RightColumn>
            <DeadLetters wrongGuesses={wrongGuesses} />
            <TheWord word={word} />
          </RightColumn>
        </Container>
        <Keyboard usedLetters={usedLetters} handleGuess={handleGuess} />
      </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
