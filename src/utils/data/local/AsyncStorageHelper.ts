import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from '../../logger';

class AsyncStorageHelper {
  /**
   * Save an item to AsyncStorage.
   * @param key - The key to store the data under.
   * @param value - The value to store.
   */
  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
       Logger.log(`[AsyncStorage] Set item: ${key}`);
    } catch (error) {
      Logger.error(`[AsyncStorage] Failed to set item: ${key}`, error);
    }
  }

  /**
   * Get an item from AsyncStorage.
   * @param key - The key to retrieve the data from.
   * @returns The parsed value or null if not found.
   */
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      Logger.error(`[AsyncStorage] Failed to get item: ${key}`, error);
      return null;
    }
  }

  /**
   * Remove an item from AsyncStorage.
   * @param key - The key to remove.
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      Logger.log(`[AsyncStorage] Removed item: ${key}`);
    } catch (error) {
      Logger.error(`[AsyncStorage] Failed to remove item: ${key}`, error);
    }
  }

  /**
   * Clear all items from AsyncStorage.
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
      Logger.log(`[AsyncStorage] Cleared all items`);
    } catch (error) {
      Logger.error(`[AsyncStorage] Failed to clear items`, error);
    }
  }
}

export default AsyncStorageHelper;
