import { Cell } from "./Cell";
import styles from "./Board.module.css";

/**
 * Componente Board - Renderiza a grade 5x5 do jogo.
 *
 * @param {Object} props
 * @param {Array<Array<{level: number, professor: string|null}>>} props.board - Matriz do tabuleiro.
 * @param {Object} [props.players] - Objeto opcional contendo informações dos times para mapeamento.
 * @param {string|null} [props.turingProfessor] - Nome do professor do time Turing.
 * @param {string|null} [props.lovelaceProfessor] - Nome do professor do time Lovelace.
 */
export function Board({ board, turingProfessor, lovelaceProfessor }) {
  if (!board || !Array.isArray(board)) {
    return (
      <div className={styles.boardContainer}>
        <p>Tabuleiro não disponível.</p>
      </div>
    );
  }

  /**
   * Determina o time de um professor com base no nome.
   * @param {string} professorName
   */
  const getTeam = (professorName) => {
    if (!professorName) return null;

    // Se tivermos os nomes específicos passados por props
    if (turingProfessor && professorName.includes(turingProfessor))
      return "turing";
    if (lovelaceProfessor && professorName.includes(lovelaceProfessor))
      return "lovelace";

    // Fallback: se não tiver props, podemos tentar inferir ou deixar neutro
    // Por padrão, assumimos que o componente pai passará as props corretas
    return null;
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              level={cell.level}
              professor={cell.professor}
              team={getTeam(cell.professor)}
            />
          )),
        )}
      </div>
    </div>
  );
}
