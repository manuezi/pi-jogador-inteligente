import { getLocalStorageItem } from "@/utils";

/**
 * @typedef {Object} Player
 * @property {number} id
 * @property {string} group_name
 * @property {string} ai_player_name
 * @property {string} ai_player_avatar
 * @property {string} ai_player_description
 * @property {string} ai_player_move_endpoint
 * @property {number} games_played
 * @property {number} games_won
 * @property {number} games_lost
 * @property {number | null} average_move_time
 */

/**
 * @typedef {Pick<
 *   Player,
 *   | "group_name"
 *   | "ai_player_name"
 *   | "ai_player_avatar"
 *   | "ai_player_description"
 *   | "ai_player_move_endpoint"
 * >} CreatePlayerPayload
 */

/**
 * @typedef {Player & { player_access_token: string }} CreatePlayerResponse
 */

/**
 * @typedef {1 | 2} TeamID
 */

/**
 * @typedef {"WAITING_PLAYERS" | "PLAYING" | "PAUSED" | "FINISHED"} GameStatus
 */

/**
 * @typedef {"setup_placement" | "player_turn"} TurnPhase
 */

/**
 * @typedef {Object} Spectator
 * @property {number} id
 * @property {string} game_id
 * @property {string} spectator_name
 * @property {string | null} spectator_avatar
 * @property {string} created_at
 */

/**
 * @typedef {Object} Game
 * @property {string} id
 * @property {GameStatus} status
 * @property {Player | null} turing_player
 * @property {Player | null} lovelace_player
 * @property {Array<Spectator>} spectators
 * @property {Array<Array<BoardSquare>>} board
 * @property {number} current_turn_number
 * @property {TeamID | null} current_turn_team_id
 * @property {TurnPhase} current_turn_phase
 * @property {TeamID | null} winner_team
 * @property {number | null} winner_player_id
 * @property {number | null} lost_player_id
 * @property {string | null} started_at
 * @property {string | null} finished_at
 * @property {boolean} auto_start
 * @property {string} created_at
 * @property {number} created_by
 */

/**
 * @typedef {Object} GameListResponse
 * @property {number} total
 * @property {number} page
 * @property {number} page_size
 * @property {Array<Game>} items
 */

/**
 * @typedef {Object} GameTurn
 * @property {number} id
 * @property {string} game_id
 * @property {number} turn_number
 * @property {TeamID} turn_team_id
 * @property {TurnPhase} turn_phase
 * @property {number | null} turn_player_id
 * @property {Array<Array<BoardSquare>>} board
 * @property {string} created_at
 */

/**
 * @typedef {Object} MoveRequest
 * @property {number} id
 * @property {string} game_id
 * @property {number} player_id
 * @property {TeamID} team_id
 * @property {Object} move_request
 * @property {Object | null} move_response
 * @property {number | null} move_time
 * @property {string} created_at
 */

/**
 * @typedef {Object} GameCreatePayload
 * @property {number} player_id
 * @property {TeamID} team_slot
 * @property {boolean} [vs_random_bot]
 * @property {boolean} [auto_start]
 */

/**
 * @typedef {Object} JoinGamePayload
 * @property {number} player_id
 * @property {TeamID} team_slot
 */

/**
 * @typedef {Object} SpectatorCreatePayload
 * @property {string} spectator_name
 * @property {string | null} [spectator_avatar]
 */

/**
 * @typedef {Spectator & { spectator_access_token: string }} SpectatorCreateResponse
 */

/**
 * @typedef {Object} ListGamesParams
 * @property {GameStatus} [status]
 * @property {number} [player_id]
 * @property {string} [started_after]
 * @property {string} [started_before]
 * @property {string} [created_after]
 * @property {string} [created_before]
 * @property {number} [page]
 * @property {number} [page_size]
 */

/**
 * @typedef {Object} BoardSquare
 * @property {number} level
 * @property {string} professor
 */

/**
 *
 * @typedef {Object} MockState
 * @property {string} username
 * @property {string} game_id
 * @property {string} status
 * @property {number} winner_team
 * @property {number} turn_number
 * @property {number} turn_team_id
 * @property {string} turn_phase
 * @property {Array<Array<BoardSquare>>} board
 * @property {Object} last_action
 */

/**
 * @typedef {Object} ConnectionParams
 * @property {string} token
 * @property {string} gameId
 * @property {(e: Event) => void} onOpen
 * @property {(e: MessageEvent) => void} onMessage
 * @property {(e: CloseEvent) => void} onClose
 */

const BASE_URL = "https://pi5-api-production.up.railway.app/api/v1";
const WS_BASE_URL = "wss://pi5-api-production.up.railway.app/api/v1/ws";

export const api = {
  /**
   * @returns {Promise<Array<Player>>}
   */
  listPlayers: async () => {
    const res = await fetch(BASE_URL + "/players", {
      headers: {
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
    });
    if (!res.ok) throw new Error("Falha ao listar jogadores: " + await res.text());
    return res.json();
  },

  /**
   * @param {CreatePlayerPayload} payload
   * @returns {Promise<CreatePlayerResponse>}
   */
  createPlayer: async (payload) => {
    const res = await fetch(BASE_URL + "/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Falha ao criar jogador: " + await res.text());
    return res.json();
  },

  /**
   * @param {number} playerId
   * @param {string} endpoint
   * @returns {Promise<Player>}
   */
  updatePlayerMoveEndpoint: async (playerId, endpoint) => {
    const res = await fetch(BASE_URL + `/players/${playerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
      body: JSON.stringify({ ai_player_move_endpoint: endpoint }),
    });
    if (!res.ok)
      throw new Error(
        "Falha ao atualizar endpoint de movimento: " + await res.text(),
      );
    return res.json();
  },

  /**
   * @param {GameCreatePayload} payload
   * @returns {Promise<Game>}
   */
  createGame: async (payload) => {
    const res = await fetch(BASE_URL + "/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Falha ao criar partida: " + await res.text());
    return res.json();
  },

  /**
   * @param {ListGamesParams} params
   * @returns {Promise<GameListResponse>}
   */
  listGames: async (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const res = await fetch(BASE_URL + "/games?" + searchParams.toString(), {
      headers: {
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
    });
    if (!res.ok) throw new Error("Falha ao listar partidas: " + await res.text());
    return res.json();
  },

  /**
   * @param {string} gameId
   * @returns {Promise<Game>}
   */
  getGame: async (gameId) => {
    const res = await fetch(BASE_URL + `/games/${gameId}`, {
      headers: {
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
    });
    if (!res.ok) throw new Error("Falha ao buscar partida: " + await res.text());
    return res.json();
  },

  /**
   * @param {string} gameId
   * @returns {Promise<Array<GameTurn>>}
   */
  listGameTurns: async (gameId) => {
    const res = await fetch(BASE_URL + `/games/${gameId}/turns`, {
      headers: {
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
    });
    if (!res.ok) throw new Error("Falha ao listar turnos: " + await res.text());
    return res.json();
  },

  /**
   * @param {string} gameId
   * @returns {Promise<Array<MoveRequest>>}
   */
  listGameMoves: async (gameId) => {
    const res = await fetch(BASE_URL + `/games/${gameId}/moves`, {
      headers: {
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
    });
    if (!res.ok) throw new Error("Falha ao listar jogadas: " + await res.text());
    return res.json();
  },

  /**
   * @param {string} gameId
   * @param {JoinGamePayload} payload
   * @returns {Promise<Game>}
   */
  joinGame: async (gameId, payload) => {
    const res = await fetch(BASE_URL + `/games/${gameId}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Falha ao entrar na partida: " + await res.text());
    return res.json();
  },

  /**
   * @param {string} gameId
   * @param {string | null } reason
   * @returns {Promise<Game>}
   */
  startGame: async (gameId, reason) => {
    const res = await fetch(BASE_URL + `/games/${gameId}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
      body: JSON.stringify({ reason }),
    });
    if (!res.ok) throw new Error("Falha ao iniciar partida: " + await res.text());
    return res.json();
  },

  /**
   * @param {string} gameId
   * @param {SpectatorCreatePayload} payload
   * @returns {Promise<SpectatorCreateResponse>}
   */
  addSpectator: async (gameId, payload) => {
    const res = await fetch(BASE_URL + `/games/${gameId}/spectators`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getLocalStorageItem("token"),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok)
      throw new Error("Falha ao registrar espectador: " + await res.text());
    return res.json();
  },

  /**
   * @returns {Promise<MockState>}
   */
  getMockState: async () => {
    const res = await fetch(BASE_URL + "/games/mock-state", { method: "POST" });
    if (!res.ok) throw new Error("Falha ao obter mock state: " + await res.text());
    return res.json();
  },

  /**
   * @param {ConnectionParams} params
   * @returns {WebSocket}
   */
  connectGame: (params) => {
    const token = encodeURIComponent(params.token);
    const socketUrl = WS_BASE_URL + `/games/${params.gameId}?token=${token}`;

    const ws = new WebSocket(socketUrl);

    ws.onopen = (e) => {
      console.log("[WS] Conectado à partida", e);
      params.onOpen(e);
    };

    ws.onmessage = (e) => {
      console.log("[WS] Mensagem recebida", e);
      params.onMessage(e);
    };

    ws.onclose = (e) => {
      console.log("[WS] Desconectado da partida", e);
      params.onClose(e);
    };

    ws.onerror = (e) => {
      console.error("[WS] Erro no WebSocket:", e);
      ws.close();
    };

    return ws;
  },
};
