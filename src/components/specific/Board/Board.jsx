import { Cell } from "./Cell";
import styles from "./Board.module.css";

/**
 * Componente Board - Renderiza a grade 5x5 do jogo.
 *
 * @param {Object} props
 * @param {Array<Array<{level: number, professor: string|null}>>} props.board - Matriz do tabuleiro.
 * @param {Object} [props.players] - Objeto opcional contendo informações dos times para mapeamento.
 */
export function Board({ board }) {
  if (!board || !Array.isArray(board)) {
    return (
      <div className={styles.boardContainer}>
        <p>Tabuleiro não disponível.</p>
      </div>
    );
  }

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              level={cell.level}
              professor={cell.professor}
            />
          )),
        )}
      </div>
    </div>
  );
}
