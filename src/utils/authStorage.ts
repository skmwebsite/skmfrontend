import CryptoJS from "crypto-js";
import { TUserData } from "../contexts/AuthContext";

const SECRET_KEY = "shree-kakaji-masale-auth-secret-key-2025";
const TOKEN_KEY = "shree_kakaji_masale_auth_token";
const USER_KEY = "shree_kakaji_masale_user";

/**
 * Encrypts a string using AES encryption
 */
export const encrypt = (text: string): string =>
  CryptoJS.AES.encrypt(text, SECRET_KEY).toString();

/**
 * Decrypts an AES encrypted string
 */
export const decrypt = (text: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(text, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
};

/**
 * Gets the decrypted token from localStorage
 */
export const getToken = (): string | null => {
  try {
    const encryptedToken = localStorage.getItem(TOKEN_KEY);
    if (encryptedToken) {
      return decrypt(encryptedToken);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Sets the token in localStorage (encrypted)
 */
export const setToken = (token: string): void => {
  try {
    const encryptedToken = encrypt(token);
    localStorage.setItem(TOKEN_KEY, encryptedToken);
  } catch {
    // Handle storage error silently
  }
};

/**
 * Removes the token from localStorage
 */
export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Handle storage error silently
  }
};

/**
 * Gets the decrypted user data from localStorage
 */
export const getUser = (): TUserData | null => {
  try {
    const encryptedUser = localStorage.getItem(USER_KEY);
    if (encryptedUser) {
      const decryptedUser = decrypt(encryptedUser);
      return JSON.parse(decryptedUser);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Sets the user data in localStorage (encrypted)
 */
export const setUser = (user: TUserData): void => {
  try {
    const encryptedUser = encrypt(JSON.stringify(user));
    localStorage.setItem(USER_KEY, encryptedUser);
  } catch {
    // Handle storage error silently
  }
};

/**
 * Removes the user data from localStorage
 */
export const removeUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    // Handle storage error silently
  }
};

/**
 * Clears all auth data from localStorage
 */
export const clearAuthData = (): void => {
  removeToken();
  removeUser();
};
