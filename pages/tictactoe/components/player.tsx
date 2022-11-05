import styles from '../../../styles/TicTacToe.module.css';

interface PlayerProps {
  player: string;
  winner: string;
}

export default function Player({player, winner}:PlayerProps) {
  
  return (
    <>
    <div className={styles.winner}>{`${winner !=='' ? 'Winner: '+ winner : ''}`}</div>
    <div className={styles.playerContainer}>
    <div className={styles.playerX}>{`${player === 'X' ? 'Player: ' + player: ''}`}</div>
    <div className={styles.playerO}>{`${player === 'O' ? 'Player: ' + player: ''}`}</div>
    </div>
    </>
  )
  
}