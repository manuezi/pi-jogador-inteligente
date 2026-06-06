/**
 * Função que retorna o valor armazenado em localStorage
 * @param {string} key - Chave do item a ser retornado
 * @returns {any} Valor armazenado no localStorage
 */
export function getLocalStorageItem(key) {
	if (typeof window === "undefined") return null;

	const storedValue = localStorage.getItem(key);
	return storedValue ? JSON.parse(storedValue) : null;
}

/**
 * Função que armazena um valor em localStorage
 * @param {string} key - Chave do item a ser armazenado
 * @param {any} value - Valor a ser armazenado
 */
export function setLocalStorageItem(key, value) {
	if (typeof window === "undefined") return;
	localStorage.setItem(key, JSON.stringify(value));
}
