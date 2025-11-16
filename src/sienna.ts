import runAccessibility from "@/views/menu/runAccessibility";
import { renderWidget } from "@/views/widget/widget";

import {
  userSettings,
  getSavedUserSettings,
  STORAGE_KEY,
} from "@/globals/userSettings";

import { pluginConfig } from "./globals/pluginConfig";
import { changeLanguage } from "./i18n/changeLanguage";
import { getDefaultLanguage } from "./i18n/getDefaultLanguage";
import { saveStorageData } from "./storage";

export default function sienna({ options }) {
  const savedSettings = getSavedUserSettings();

  // Reset saved language to default
  if (savedSettings) {
    savedSettings.lang = getDefaultLanguage();
    saveStorageData(STORAGE_KEY, savedSettings);
  }

  Object.assign(pluginConfig, options);
  Object.assign(userSettings, savedSettings);

  runAccessibility();
  renderWidget();

  return {
    changeLanguage,
  };
}
