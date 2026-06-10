import { useState, useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { registerPlayer } from './feature/api';
import { cn } from '@/components/specific/helpers';

import { api } from "@/services";
import { useGameContext } from "@/hooks";
import styles from "./PlayerRegisterForm.module.css";

export function PlayerRegisterForm() {
const context = useGameContext();


const { player, setPlayer } = context;
  const form = useForm({
    defaultValues: {
      ai_player_name: player?.ai_player_name || 'Meu Jogador',
      ai_player_avatar:
        player?.ai_player_avatar || 'https://example.com/avatar.png',
      group_name: player?.group_name || 'Meu Grupo',
      ai_player_description:
        player?.ai_player_description || 'Descrição do meu jogador de IA',
      ai_player_move_endpoint:
        player?.ai_player_move_endpoint || 'https://example.com/move-endpoint',
    },
  });
  const { formState } = form;
  const { isSubmitting, errors } = formState;

  async function handleSubmit(dto) {
    try {
      const response = await registerPlayer({
        ...dto,
      });

      if (!response?.player_access_token) {
        throw new Error('[ERR]: resposta inesperada ao registrar jogador');
      }

      setPlayer(response);

      form?.reset({
        ai_player_name: response?.ai_player_avatar,
        ai_player_avatar: response?.ai_player_avatar,
        group_name: response?.group_name,
        ai_player_description: response?.ai_player_description,
        ai_player_move_endpoint: response?.ai_player_move_endpoint,
      });
    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao registrar jogador', err);
    }
  }

  useEffect(() => {
    if (player?.id) {
      form.reset({
        ai_player_name: player?.ai_player_name || 'Meu Jogador',
        ai_player_avatar:
          player?.ai_player_avatar || 'https://example.com/avatar.png',
        group_name: player?.group_name || 'Meu Grupo',
        ai_player_description:
          player?.ai_player_description || 'Descrição do meu jogador de IA',
        ai_player_move_endpoint:
          player?.ai_player_move_endpoint ||
          'https://example.com/move-endpoint',
      });
    }
  }, [player]);

  return (
  <form
    onSubmit={form.handleSubmit(handleSubmit)}
    className={styles.formContainer}
  >
    <br/>
    <Controller
      name={'group_name'}
      control={form.control}
      rules={{ required: 'O nome do grupo é obrigatório' }}
      render={({ field }) => (
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Nome do grupo
          </label>

          <input
            className={styles.input}
            type="text"
            {...field}
          />

          {errors.group_name && (
            <span className={styles.error}>
              {errors.group_name.message}
            </span>
          )}
        </div>
      )}
    />

    <Controller
      name={'ai_player_name'}
      control={form.control}
      rules={{ required: 'O nome do jogador de IA é obrigatório' }}
      render={({ field }) => (
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Nome do jogador
          </label>

          <input
            className={styles.input}
            type="text"
            {...field}
          />

          {errors.ai_player_name && (
            <span className={styles.error}>
              {errors.ai_player_name.message}
            </span>
          )}
        </div>
      )}
    />

    <Controller
      name={'ai_player_avatar'}
      control={form.control}
      rules={{
        required:
          'A URL do avatar do jogador de IA é obrigatória',
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

          {errors.ai_player_avatar && (
            <span className={styles.error}>
              {errors.ai_player_avatar.message}
            </span>
          )}
        </div>
      )}
    />

    <Controller
      name={'ai_player_description'}
      control={form.control}
      render={({ field }) => (
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Descrição do jogador
          </label>

          <input
            className={styles.input}
            type="text"
            {...field}
          />

          {errors.ai_player_description && (
            <span className={styles.error}>
              {errors.ai_player_description.message}
            </span>
          )}
        </div>
      )}
    />

    <Controller
      name={'ai_player_move_endpoint'}
      control={form.control}
      rules={{
        required:
          'O endpoint de movimento do jogador de IA é obrigatório',
      }}
      render={({ field }) => (
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Endpoint de movimento do jogador
          </label>

          <input
            className={styles.input}
            type="text"
            {...field}
          />

          {errors.ai_player_move_endpoint && (
            <span className={styles.error}>
              {errors.ai_player_move_endpoint.message}
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
        ? 'Registrando...'
        : 'Registrar Jogador'}
    </button>
  </form>
);}