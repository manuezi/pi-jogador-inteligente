/**
 * @typedef {Object} GithubUser
 * @property {string} login
 * @property {number} id
 * @property {string} avatar_url
 * @property {string} name
 * @property {string} bio
 * @property {number} public_repos
 */

export const api = {
  /**
   * @param {string} username
   * @returns {Promise<GithubUser>}
   */
  getUser: async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("Falha ao buscar o usuário no GitHub");
    return res.json();
  },
};
