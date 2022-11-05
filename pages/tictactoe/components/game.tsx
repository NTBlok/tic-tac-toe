import dynamic from 'next/dynamic';
import { MouseEvent } from 'react';
import styles from '../../../styles/TicTacToe.module.css';

const Cell = dynamic(
  () => import('./cell'),
  { ssr: false }
)

interface GameProps {
  currentBoard: string[];
  setCurrentBoard: (value: string[] | ((val: string[]) => string[])) => void;
  currPossibleWins: Array<number[]>;
  nxn:number;
  player:string;
  setPlayer: (value: string | ((val: string) => string)) => void;
  isX:boolean;
  setIsX: (value: boolean | ((val: boolean) => boolean)) => void;
  winner:string;
  setWinner: (value: string | ((val: string) => string)) => void;
}

export default function Game(
  {currentBoard,
  setCurrentBoard,
  currPossibleWins,
  nxn,
  player,
  setPlayer,
  isX,
  setIsX,
  winner,
  setWinner}:GameProps
  ) {
  
  const checkForWinner = (current:string[]) => {
    let line:number[];
    let letter:string;
    let match = false;
    for (let i = 0; i < currPossibleWins.length; i++) {
      line = currPossibleWins[i];
      console.log('line',line);
      letter = current[line[0]];
      if(letter !== '') {
        match = true;
        for (let j = 1; j < line.length; j++) {
          if(letter !== current[line[j]]) {
            match = false;
          }
        }
        if(match === true) {
          setWinner(letter);
          break;
        }
      } 
    }
  }

  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, n: number) => {
    if(currentBoard[n] === '' && winner === '') {
      const current = currentBoard.slice();
      current[n] = isX ? 'X' : 'O' ;
      setCurrentBoard(current);
      let nextPlayer = player.slice();
      nextPlayer = isX ? 'O' : 'X';
      setPlayer(nextPlayer);
      setIsX(!isX);
      checkForWinner(current);
    }
  }
  
  const createBoard = (size:number) => {
    let board = [];
    for (let i = 0; i < size; i++) {
      board.push(<Cell onClick={(e) => handleClick(e,i)} cellDisplay={currentBoard[i]} />)
    }
    return board
  }
    
  return (
  <>
  <div className={styles.gameBoard}>
    <div className={styles.gridContainer} style={{ ["--grid-size" as any]: nxn }}>
      { createBoard(Math.pow(nxn, 2)) }
    </div>
  </div>
  </>
  )
}