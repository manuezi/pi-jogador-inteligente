/**
 * @typedef {Object} GithubUser
 * @property {string} login
 * @property {number} id
 * @property {string} avatar_url
 * @property {string} name
 * @property {string} bio
 * @property {number} public_repos
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

const BASE_URL = "https://pi5-api-production.up.railway.app/api/v1";

export const api = {
  /**
   * @param {string} username
   * @returns {Promise<GitHubUser>}
   */
  getUser: async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("Falha ao buscar o usuário no GitHub");
    return res.json();
  },

  /**
   * @returns {Promise<MockState>}
   */
  getMockState: async () => {
    const res = await fetch(BASE_URL + "/games/mock-state", { method: "POST" });
    if (!res.ok) throw new Error("Falha ao obter mock state: " + res.text());
    return res.json();
  },
};
