import { useState } from 'react';

import { api } from '@/services';
import { useGameContext } from '@/hooks';
import styles from './SpectatorRegisterForm.module.css';

export function SpectatorRegisterForm({ gameId }) {
  const { setSpectator } = useGameContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const response = await api.addSpectator(gameId, {
        spectator_name: formData.get('spectator_name'),
        spectator_avatar: formData.get('spectator_avatar'),
      });

      setSpectator(response);
      e.currentTarget.reset();
    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao registrar espectador', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
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
          className={styles.input}
          type="text"
          defaultValue="https://picsum.photos/200"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.button}
      >
        {isSubmitting ? 'Registrando...' : 'Registrar Espectador'}
      </button>
    </form>
  );
}
