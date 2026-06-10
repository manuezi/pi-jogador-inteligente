import {
  PlayerRegisterForm,
  PlayerUpdateForm,
  PlayerLoginForm,
} from "@/components/specific";
import { useGameContext } from "@/hooks/useGameContext";
import styles from "./Player.module.css";

export function PlayerPage() {
  const { player, logout } = useGameContext();

  return (
    <div className={styles.playerPage}>
      {!player && (
        <div className={styles.formsContainer}>
          <div className={styles.playerCard}>
            <h3>Novo Jogador</h3>
            <p className={styles.playerSubtitle}>
              Crie sua identidade para jogar
            </p>
            <br />
            <PlayerRegisterForm />
          </div>

          <div className={styles.playerCard}>
            <h3>Já tenho cadastro</h3>
            <p className={styles.playerSubtitle}>Entre com seu ID e Token</p>
            <br />
            <PlayerLoginForm />
          </div>
        </div>
      )}

      {player && (
        <>
          <div className={styles.playerCard}>
            <img
              src={player.ai_player_avatar}
              alt={player.ai_player_name}
              className={styles.playerAvatar}
            />

            <h3>{player.ai_player_name}</h3>

            <span className={styles.playerGroup}>{player.group_name}</span>

            <button onClick={logout} className={styles.logoutButton}>
              Trocar Jogador
            </button>
          </div>

          <div className={styles.infoCard}>
            <h3>Informações do Jogador</h3>
            <br />

            <div className={styles.infoItem}>
              <strong>Grupo</strong>
              <span>{player.group_name}</span>
            </div>

            <div className={styles.infoItem}>
              <strong>Nome</strong>
              <span>{player.ai_player_name}</span>
            </div>

            <div className={styles.infoItem}>
              <strong>Avatar</strong>
              <span>{player.ai_player_avatar}</span>
            </div>

            <div className={styles.infoItem}>
              <strong>Descrição</strong>
              <span>{player.ai_player_description}</span>
            </div>

            <div className={styles.infoItem}>
              <strong>Endpoint</strong>
              <span>{player.ai_player_move_endpoint}</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3>Atualizar Endpoint de Movimento</h3>
            <br />

            <PlayerUpdateForm />
          </div>
        </>
      )}
    </div>
  );
}
