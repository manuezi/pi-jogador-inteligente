import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateGame, useGameContext, useAddSpectator } from "@/hooks";
import styles from "./CreateMatch.module.css";

export function CreateMatch() {
  const navigate = useNavigate();
  const { player, setSpectator } = useGameContext();
  const { createGame, isLoading, error } = useCreateGame();
  const { addSpectator } = useAddSpectator();

  const [formData, setFormData] = useState({
    team_slot: 1, // 1: Turing, 2: Lovelace
    vs_random_bot: true,
    auto_start: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!player) {
      alert("Você precisa estar logado como jogador para criar uma partida.");
      return;
    }

    try {
      const payload = {
        player_id: player.id,
        team_slot: Number(formData.team_slot),
        vs_random_bot: formData.vs_random_bot,
        auto_start: formData.auto_start,
      };

      const game = await createGame(payload);

      // Auto-registra como espectador antes de navegar
      try {
        const spec = await addSpectator(game.id, {
          spectator_name: player.ai_player_name,
          spectator_avatar: player.ai_player_avatar,
        });
        setSpectator(spec);
      } catch (specErr) {
        console.error("Falha ao registrar espectador no create:", specErr);
      }

      navigate(`/watch/${game.id}`);
    } catch (err) {
      console.error("Erro ao criar partida:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Configurar Nova Partida</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Seu Time (Nossa IA)</label>
          <select
            name="team_slot"
            value={formData.team_slot}
            onChange={handleChange}
            className={styles.select}
          >
            <option value={1}>Turing (Time 1)</option>
            <option value={2}>Lovelace (Time 2)</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Adversário</label>
          <select
            name="vs_random_bot"
            value={formData.vs_random_bot}
            onChange={handleChange}
            className={styles.select}
          >
            <option value={true}>Bot Aleatório</option>
            <option value={false}>Aguardar outro jogador</option>
          </select>
        </div>

        <div className={styles.fieldCheckbox}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="auto_start"
              checked={formData.auto_start}
              onChange={handleChange}
              className={styles.checkbox}
            />
            Iniciar partida automaticamente
          </label>
        </div>

        {error && (
          <p className={styles.error}>
            {error.message || "Erro ao criar partida"}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? "Criando..." : "Criar Partida"}
        </button>
      </form>
    </div>
  );
}
