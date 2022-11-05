import { MouseEventHandler } from 'react';
import styles from '../../../styles/TicTacToe.module.css';

interface CellProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  cellDisplay: string; 
}

export default function Cell({onClick, cellDisplay}:CellProps) {
  return (
    <div className={styles.gridItem} onClick={onClick}>
      {cellDisplay}
    </div>
  );
}