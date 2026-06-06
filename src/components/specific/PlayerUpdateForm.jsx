import { useState } from 'react';

import { api } from '@/services';
import { useGameContext } from '@/hooks/useGameContext';
import styles from './PlayerUpdateForm.module.css';

export function PlayerUpdateForm() {
  const { player, setPlayer } = useGameContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const response = await api.updatePlayerMoveEndpoint(player?.id, {
        ai_player_move_endpoint: formData.get('ai_player_move_endpoint'),
      });

      setPlayer({ ...player, ...response });
    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao atualizar jogador', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Endpoint de movimento do jogador</label>
        <input
          name="ai_player_move_endpoint"
          className={styles.input}
          type="text"
          defaultValue={player?.ai_player_move_endpoint || 'https://minha-api.com/move'}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.button}
      >
        {isSubmitting ? 'Atualizando...' : 'Atualizar Endpoint'}
      </button>
    </form>
  );
}
