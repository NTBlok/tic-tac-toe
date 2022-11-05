import useLocalStorage from "../../hooks/UseLocalStorage";
import styles from '../../../styles/TicTacToe.module.css';
import dynamic from "next/dynamic";

const Game = dynamic(
  () => import('./game'),
  { ssr: false }
)
const Player = dynamic(
  () => import('./player'),
  { ssr: false }
)

const defaultPossibleWins = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

export default function Board() {
  const [currentBoard, setCurrentBoard] = useLocalStorage<string[]>("currentGame", Array(9).fill(''));
  const [currPossibleWins, setCurrPossibleWins] = useLocalStorage<Array<number[]>>("currPossibleWins", defaultPossibleWins);
  const [nxn, setNxn] = useLocalStorage<number>("n",3);
  const [player, setPlayer] = useLocalStorage<string>("player", "X");
  const [isX, setIsX] = useLocalStorage<boolean>("isX", true);
  const [winner, setWinner] = useLocalStorage<string>("winner", "");

  const possibleWins = (size:number) => {
    const sr = Math.sqrt(size);
    // rows
    let rowwins: Array<number[]> = [];
    for (let i = 0; i < size; i+=sr) {
      let rowwin:number[] = [];
      for (let j = i; j < i+sr; j++) {
        rowwin.push(j);
      }
      rowwins.push(rowwin);
    }
    // columns
    let columnwins:Array<number[]> = [];
    for (let i = 0; i < rowwins.length; i++) {
    let columnwin:number[] = [];
    rowwins.map((row) => {
        columnwin.push(row[i]);
    })
      columnwins.push(columnwin);
    }
    // diagonals
    let diagwins: Array<number[]> = [];
    let diagwin1:number[] = [];
    let diagwin2:number[] = [];
    let i = 0;
    rowwins.map((row) => {
      diagwin1.push(row[i]);
      i++;
    })
    diagwins.push(diagwin1);
    let j = sr -1;
    rowwins.map((row) => {
      diagwin2.push(row[j]);
      j--;
    })
    diagwins.push(diagwin2);
    const possible = rowwins.concat(columnwins).concat(diagwins);
    console.log('possible',possible);
    return possible;
  }

  const resetGame = ( n: number ) => { 
    const nxnboard = Array(Math.pow(n, 2)).fill(''); 
    setCurrentBoard(nxnboard);
    const possible = possibleWins(Math.pow(n, 2));
    setCurrPossibleWins(possible);
    setPlayer('X');
    setIsX(true);
    setWinner('');
  }
  
  const handleClickChangeSize = ( n: number ) => {
    if(nxn !== n) {
      setNxn(n);
      resetGame(n);
    }
  }

  return (
    <>
    <div className={styles.gameHeader}><h1 className={styles.gameHeader}>Tic-Tac-Toe (NxN)</h1></div>
      <div className={styles.sizeControllerContainer}>
      <button className={styles.sizeControllerItem} onClick={() => handleClickChangeSize(3)}>3x3</button>
      <button className={styles.sizeControllerItem} onClick={() => handleClickChangeSize(4)}>4x4</button>
      <button className={styles.sizeControllerItem} onClick={() => handleClickChangeSize(5)}>5x5</button>
      <button className={styles.sizeControllerItem} onClick={() => handleClickChangeSize(6)}>6x6</button>
      </div>
      <div className={styles.resetButton} onClick={() => resetGame(nxn)}>Click to Reset</div>
      <Player player={player} winner={winner} />
      <Game 
      currentBoard={currentBoard} 
      setCurrentBoard={setCurrentBoard}
      currPossibleWins={currPossibleWins}
      nxn={nxn}
      player={player}
      setPlayer={setPlayer}
      isX={isX}
      setIsX={setIsX}
      winner={winner}
      setWinner={setWinner}
      />
    </>
  )
}