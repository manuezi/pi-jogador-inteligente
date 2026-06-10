import { useState } from "react";
import { useGameContext } from "@/hooks";
import styles from "./PlayerRegisterForm.module.css";

export function PlayerLoginForm() {
  const { loginByToken } = useGameContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const playerId = formData.get("player_id");
      const token = formData.get("token");

      await loginByToken(playerId, token);
    } catch (err) {
      setError(err?.message || "Erro ao realizar login");
      console.error("[ERR]: erro ao fazer login por token", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>ID do jogador</label>
        <input
          name="player_id"
          className={styles.input}
          type="number"
          placeholder="Ex: 123"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Access Token</label>
        <input
          name="token"
          className={styles.input}
          type="password"
          placeholder="Seu token de acesso"
          required
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        {isSubmitting ? "Entrando..." : "Entrar com Token"}
      </button>
    </form>
  );
}
