import { useState } from "react";

import { api } from "@/services";
import { useGameContext } from "@/hooks";
import styles from "./PlayerUpdateForm.module.css";

export function PlayerUpdateForm() {
  const { player, setPlayer } = useGameContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const updatedPlayer = await api.updatePlayerMoveEndpoint(player?.id, {
        ai_player_move_endpoint: formData.get("ai_player_move_endpoint"),
      });

      setPlayer({ ...player, ...updatedPlayer });
    } catch (err) {
      console.error(err?.message || "[ERR]: erro ao atualizar jogador", err);
    } finally {
      setIsSubmitting(false);
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
        disabled={isSubmitting}
        className={styles.updateButton}
      >
        {isSubmitting ? "Atualizando..." : "Atualizar Endpoint"}
      </button>
    </form>
  );
}
