import { cn } from '@/core/components/helpers';
import { PlayerRegisterForm } from '@/components/specific/PlayerRegisterForm';
import { PlayerUpdateForm } from '@/components/specific/PlayerUpdateForm';
import { useGameContext } from '@/hooks/useGameContext';
import { Typography } from '@/core/components/ui/text/typography';

export function Player() {
  const { player } = useGameContext();

  return (
    <div className={cn('flex flex-col gap-4 py-8', 'flex-1')}>
      <Typography
        variant={'h1'}
        asTag={'h1'}
        className={cn('text-4xl', 'font-bold')}
      >
        {player?.ai_player_name ? `${player.ai_player_name}` : 'Jogador'}
      </Typography>

      {!player && (
        <>
          <Typography variant={'h3'}>Registro de Jogador</Typography>
          <PlayerRegisterForm />
        </>
      )}

      {player && (
        <>
          <p>
            <strong>Grupo</strong>: {player?.group_name}
          </p>
          <p>
            <strong>Nome do jogador</strong>: {player?.ai_player_name}
          </p>
          <p>
            <strong>URL do Avatar</strong>: {player?.ai_player_avatar}
          </p>
          <p>
            <strong>Descrição do Jogador</strong>:{' '}
            {player?.ai_player_description}
          </p>
          <p>
            <strong>Endpoint de Movimento</strong>:{' '}
            {player?.ai_player_move_endpoint}
          </p>

          <hr />

          <Typography variant={'h3'}>
            Atualizar Endpoint de Movimento
          </Typography>

          <PlayerUpdateForm />
        </>
      )}
    </div>
  );
}
