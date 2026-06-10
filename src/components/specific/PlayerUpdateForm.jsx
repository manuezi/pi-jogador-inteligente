import { useState } from "react";
import { cn } from '@/components/specific/helpers';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { updatePlayerMoveEndpoint } from './feature/api';

import { api } from "@/services";
import { useGameContext } from "@/hooks/useGameContext";
import styles from "./PlayerUpdateForm.module.css";

export function PlayerUpdateForm() {
  const { player, setPlayer } = useGameContext();

  const form = useForm({
    defaultValues: {
      ai_player_move_endpoint:
        player?.ai_player_move_endpoint || 'https://example.com/move-endpoint',
    },
  });
  const { formState } = form;
  const { isSubmitting, errors } = formState;

  async function handleSubmit(dto) {
    try {
      const response = await updatePlayerMoveEndpoint(player?.id, {
        ...dto,
      });

      if (!response?.id) {
        throw new Error('[ERR]: resposta inesperada ao atualizar jogador');
      }

      setPlayer(Object.assign({}, player, response));
    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao atualizar jogador', err);
    }
  }

  useEffect(() => {
    if (player?.id) {
      form.reset({
        ai_player_move_endpoint:
          player?.ai_player_move_endpoint ||
          'https://example.com/move-endpoint',
      });
    }
  }, [player]);

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn('flex flex-col gap-2')}
    >
      <Controller
        name={'ai_player_move_endpoint'}
        control={form.control}
        rules={{
          required: 'O endpoint de movimento do jogador de IA é obrigatório',
        }}
        render={({ field }) => (
          <div className={cn('flex flex-col gap-1')}>
            <label className="text-xs">Endpoint de movimento do jogador</label>
            <br/>            <br/>


<input
  className={styles.updateInput}
  type="text"
  {...field}
/>

            {errors.ai_player_move_endpoint && (
              <span className={cn('text-red-500 text-xs')}>
                {errors.ai_player_move_endpoint.message}
              </span>
            )}
            
          </div>
          
        )}
      />
            <br/>

<button
  type="submit"
  disabled={isSubmitting}
  className={styles.updateButton}
>
        {isSubmitting ? 'Atualizando...' : 'Atualizar Endpoint'}
      </button>
    </form>
  );
}
