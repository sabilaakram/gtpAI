"use client";
// GuessTheNumber.tsx
import React, { useState, ChangeEvent } from "react";
import "./GuessTheNumber.css";

const GuessTheNumber: React.FC = () => {
  const [number, setNumber] = useState<number>(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState<string>("1");
  const [message, setMessage] = useState<string>("");

  const handleGuess = () => {
    const userGuess = parseInt(guess, 10);
    if (isNaN(userGuess)) {
      setMessage("Please enter a valid number.");
      return;
    }
    if (userGuess > number) {
      setMessage("Too high! Try again.");
    } else if (userGuess < number) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Congratulations! You guessed the number!");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  return (
    <div style={{ alignContent: "center", justifyContent: "center" }}>
      <h3>Guess the Number</h3>
      <p>Guess a number between 1 and 100:</p>
      <input type="number" value={guess} onChange={handleChange} />
      <button type="button" onClick={handleGuess}>
        Guess
      </button>
      <p>{message}</p>
    </div>
  );
};

export default GuessTheNumber;
