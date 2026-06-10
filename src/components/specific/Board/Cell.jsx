import clsx from "clsx";
import styles from "./Cell.module.css";

/**
 * Componente Cell - Representa uma única célula do tabuleiro 5x5.
 *
 * @param {Object} props
 * @param {number} props.level - Nível de construção (0 a 4).
 * @param {string|null} props.professor - Nome do professor na célula, se houver.
 * @param {"turing" | "lovelace" | null} props.team - Time do professor (turing ou lovelace).
 */
export function Cell({ level, professor, team }) {
  const professorInitial = professor ? professor.charAt(0) : "";

  return (
    <div className={styles.cellWrapper}>
      <div
        className={clsx(styles.cell, {
          [styles.level1]: level >= 1,
          [styles.level2]: level >= 2,
          [styles.level3]: level >= 3,
          [styles.level4]: level === 4,
        })}
      >
        <div className={styles.levelIndicator}>
          {level === 4 ? "Graduado" : `${level + 1}º Ano`}
        </div>

        {/* Nível 4: Cúpula (Dome) */}
        {level === 4 && <div className={styles.dome} />}

        {/* Marcador do Professor */}
        {professor && (
          <div
            className={clsx(styles.professor, {
              [styles.turing]: team === "turing",
              [styles.lovelace]: team === "lovelace",
            })}
            title={professor}
          >
            {professorInitial}
          </div>
        )}
      </div>
    </div>
  );
}
