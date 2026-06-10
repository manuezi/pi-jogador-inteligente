import { cn } from '@/components/specific/helpers';
import { Controller, useForm } from 'react-hook-form';
import { registerSpectator } from './feature/api';
import { useGameContext } from '@/hooks/useGameContext';
import { ViewGame } from "@/pages/View-game";
import styles from "./SpectatorRegisterForm.module.css";

export function SpectatorRegisterForm({ gameId }) {
  const { setSpectator } = useGameContext();
  const form = useForm({
    defaultValues: {
      spectator_avatar: 'https://example.com/avatar.png',
      spectator_name: 'Meu Espectador',
    },
  });
  const { formState } = form;
  const { isSubmitting, errors } = formState;

  async function handleSubmit(dto) {
    try {
      const response = await registerSpectator(gameId, {
        ...dto,
      });

      if (!response?.spectator_access_token) {
        throw new Error('[ERR]: resposta inesperada ao registrar espectador');
      }
      setSpectator(response);
    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao registrar espectador', err);
    }
  }

  return (
  <form
    onSubmit={form.handleSubmit(handleSubmit)}
    className={styles.formContainer}
  >
    <img
      src={form.watch("spectator_avatar")}
      alt="Avatar"
      className={styles.previewAvatar}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />

    <Controller
      name={"spectator_name"}
      control={form.control}
      rules={{
        required: "O nome do espectador é obrigatório",
      }}
      render={({ field }) => (
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Nome do espectador
          </label>

          <input
            className={styles.input}
            type="text"
            {...field}
          />

          {errors.spectator_name && (
            <span className={styles.error}>
              {errors.spectator_name.message}
            </span>
          )}
        </div>
      )}
    />

    <Controller
      name={"spectator_avatar"}
      control={form.control}
      rules={{
        required:
          "A URL do avatar do espectador é obrigatória",
      }}
      render={({ field }) => (
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            URL do avatar
          </label>

          <input
            className={styles.input}
            type="text"
            {...field}
          />

          {errors.spectator_avatar && (
            <span className={styles.error}>
              {errors.spectator_avatar.message}
            </span>
          )}
        </div>
      )}
    />

    <button
      type="submit"
      disabled={isSubmitting}
      className={styles.button}
    >
      {isSubmitting
        ? "Registrando..."
        : "Registrar Espectador"}
    </button>
  </form>
);
}
