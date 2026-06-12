import { useGameContext, useUpdatePlayerMoveEndpoint } from "@/hooks";
import styles from "./PlayerUpdateForm.module.css";

export function PlayerUpdateForm() {
  const { player, setPlayer } = useGameContext();
  const { updatePlayerMoveEndpoint, isLoading } = useUpdatePlayerMoveEndpoint();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const endpoint = formData.get("ai_player_move_endpoint");

      const updatedPlayer = await updatePlayerMoveEndpoint(player?.id, endpoint);

      setPlayer({ ...player, ...updatedPlayer });
    } catch (err) {
      console.error(err?.message || "[ERR]: erro ao atualizar jogador", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label className={styles.label}>Endpoint de movimento do jogador</label>
      <input
        name="ai_player_move_endpoint"
        className={styles.updateInput}
        type="text"
        defaultValue={
          player?.ai_player_move_endpoint || "https://minha-api.com/move"
        }
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className={styles.updateButton}
      >
        {isLoading ? "Atualizando..." : "Atualizar Endpoint"}
      </button>
    </form>
  );
}
