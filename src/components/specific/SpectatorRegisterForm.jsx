import { useState } from "react";

import { api } from "@/services";
import { useGameContext } from "@/hooks";
import styles from "./SpectatorRegisterForm.module.css";

export function SpectatorRegisterForm({ gameId }) {
  const { setSpectator } = useGameContext();
  const [spectatorAvatar, setSpectatorAvatar] = useState(
    "https://picsum.photos/200",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const spectator = await api.addSpectator(gameId, {
        spectator_name: formData.get("spectator_name"),
        spectator_avatar: spectatorAvatar,
      });

      setSpectator(spectator);
      e.currentTarget.reset();
    } catch (err) {
      console.error(err?.message || "[ERR]: erro ao registrar espectador", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <img
        src={spectatorAvatar}
        alt="Avatar"
        className={styles.previewAvatar}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <div className={styles.inputGroup}>
        <label className={styles.label}>Nome do espectador</label>
        <input
          name="spectator_name"
          className={styles.input}
          type="text"
          defaultValue="Espectador Anônimo"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>URL do avatar</label>
        <input
          name="spectator_avatar"
          value={spectatorAvatar}
          onChange={(e) => setSpectatorAvatar(e.target.value)}
          className={styles.input}
          type="text"
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        {isSubmitting ? "Registrando..." : "Registrar Espectador"}
      </button>
    </form>
  );
}
