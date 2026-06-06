import { useState } from "react";

import { api } from "@/services";
import { useGameContext } from "@/hooks";
import styles from "./PlayerRegisterForm.module.css";

export function PlayerRegisterForm() {
  const { player, setPlayer } = useGameContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await api.createPlayer({
        group_name: formData.get("group_name"),
        ai_player_name: formData.get("ai_player_name"),
        ai_player_avatar: formData.get("ai_player_avatar"),
        ai_player_description: formData.get("ai_player_description"),
        ai_player_move_endpoint: formData.get("ai_player_move_endpoint"),
      });

      setPlayer(response);
      e.currentTarget.reset();
    } catch (err) {
      console.error(err?.message || "[ERR]: erro ao registrar jogador", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nome do grupo</label>
        <input
          name="group_name"
          className={styles.input}
          type="text"
          defaultValue={player?.group_name}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Nome do jogador</label>
        <input
          name="ai_player_name"
          className={styles.input}
          type="text"
          defaultValue={player?.ai_player_name}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>URL do avatar</label>
        <input
          name="ai_player_avatar"
          className={styles.input}
          type="text"
          defaultValue={player?.ai_player_avatar || "https://picsum.photos/200"}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Descrição do jogador</label>
        <input
          name="ai_player_description"
          className={styles.input}
          type="text"
          defaultValue={player?.ai_player_description}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Endpoint de movimento do jogador</label>
        <input
          name="ai_player_move_endpoint"
          className={styles.input}
          type="text"
          defaultValue={
            player?.ai_player_move_endpoint || "https://minha-api.com/move"
          }
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        {isSubmitting ? "Registrando..." : "Registrar Jogador"}
      </button>
    </form>
  );
}
