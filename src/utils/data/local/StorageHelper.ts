import { Bank } from "../../../data/models/Bank";
import { KEYS } from "../../constants";
import AsyncStorageHelper from "./AsyncStorageHelper";

export const bank= async ()=>await AsyncStorageHelper.getItem<Bank>(KEYS.SELECTED_BANK);