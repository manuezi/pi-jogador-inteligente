import clsx from "clsx";
import styles from "./Cell.module.css";

/**
 * Componente Cell - Representa uma única célula do tabuleiro 5x5.
 *
 * @param {Object} props
 * @param {number} props.level - Nível de construção (0 a 4).
 * @param {string|null} props.professor - Nome do professor na célula, se houver.
 */
export function Cell({ level, professor }) {
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
              [styles.turing]: getTeam(professor) === "turing",
              [styles.lovelace]: getTeam(professor) === "lovelace",
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

function getTeam(professorName) {
  switch (professorName) {
    case "CLARO":
    case "REY":
      return "turing";
    case "KARIN":
    case "BEATRIZ":
      return "lovelace";
    default:
      return null;
  }
}
