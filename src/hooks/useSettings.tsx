import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { GENERAL_SETTINGS_KEY, GeneralSettings, MESSAGE_TYPES, Theme } from '@/lib/types.ts';
import { ROOT_CONTAINER_ID } from '@/lib/constants.ts';
import useMessage from '@/hooks/useMessage.tsx';

type SettingsProviderProps = {
  children: React.ReactNode;
  shadowRoot?: ShadowRoot;
  defaultTheme?: Theme;
};

type SettingsProviderState = {
  settings: GeneralSettings;
  setSettings: (updatedSettings: Partial<GeneralSettings>) => void;
};

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
];

const initialSettingsState: SettingsProviderState = {
  settings: {
    theme: 'dark',
    hide_sidebar_button: false,
    sourceLanguage: 'en',
    targetLanguage: 'vi',
    fontSize: 12,
    opacity: 100,
    fontColor: '#000000',
    backgroundColor: '#ffffff',
  },
  setSettings: () => null,
};

const SettingsProviderContext = createContext<SettingsProviderState>(initialSettingsState);

export function SettingsProvider({
  children,
  defaultTheme = initialSettingsState.settings.theme,
  shadowRoot,
  ...props
}: SettingsProviderProps) {
  const messageData = useMessage();
  const [settings, setSettings] = useState<GeneralSettings>({
    ...initialSettingsState.settings,
    ...(defaultTheme && { theme: defaultTheme }),
  });
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Read persisted settings from chrome.storage
  useEffect(() => {
    chrome?.storage?.sync.get().then((items) => {
      if (items && items[GENERAL_SETTINGS_KEY]) {
        setSettings({ ...settings, ...items[GENERAL_SETTINGS_KEY] });
      }
    });
  }, []);

  // If settings updated globally from any component
  useEffect(() => {
    if (messageData?.type === MESSAGE_TYPES.GENERAL_SETTINGS_UPDATED && messageData?.data) {
      setSettings({ ...settings, ...(messageData.data as GeneralSettings) });
    }
  }, [messageData]);

  // Handles settings related changes
  useEffect(() => {
    function updateTheme() {
      const root = shadowRoot
        ? shadowRoot.getElementById(ROOT_CONTAINER_ID)
        : document.getElementById(ROOT_CONTAINER_ID);

      if (!root) {
        console.error(`No root with id "${ROOT_CONTAINER_ID}" found to toggle theme.`);
        return;
      }

      root.classList.remove('light', 'dark');
      root.classList.add(settings.theme);
    }

    updateTheme();
  }, [settings]);

  const value = {
    settings,
    setSettings: (updatedSettings: Partial<GeneralSettings>) => {
      const newSettings = { ...settings, ...updatedSettings };
      // Update UI immediately
      setSettings(newSettings);

      // Debounce storage update
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        chrome?.storage?.sync
          .set({ [GENERAL_SETTINGS_KEY]: newSettings })
          .then(() => console.log('[useSettings.js] UPDATE_GENERAL_SETTINGS'));
      }, 500);
    },
  };

  return (
    <SettingsProviderContext.Provider {...props} value={value}>
      {children}
    </SettingsProviderContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsProviderContext);

  if (context === undefined) throw new Error('useSettings must be used within a SettingsProvider');

  return context;
};
