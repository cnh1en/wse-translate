import iconDark from '@/assets/images/icon-dark.png';
import iconLight from '@/assets/images/icon-light.png';
import { Button } from '@/components/ui/button.tsx';
import SafeImage from '@/components/ui/safe-image.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettings } from '@/hooks/useSettings.tsx';
import { CircleHelp, Settings } from 'lucide-react';
import './popup.css';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
];

export default function Popup() {
  const { settings, setSettings } = useSettings();

  const handleOpenOptions = () => {
    chrome?.runtime?.openOptionsPage();
  };

  return (
    <div className="ext-h-100 ext-w-80 ext-bg-white ext-flex ext-flex-col ext-border-0 ext-p-0 ext-m-0">
      <div className="ext-w-full ext-h-full ext-flex ext-flex-col ext-justify-between ext-py-3 ext-px-3 ext-bg-background ext-text-foreground">
        {/* HEADER */}
        <div className="ext-flex ext-flex-row ext-justify-between ext-items-center">
          <div className="ext-flex">
            <div className="ext-flex ext-flex-row ext-items-center">
              <SafeImage className="ext-pl-3" width={40} src={settings.theme === 'dark' ? iconLight : iconDark} />
              <p
                className={`ext-text-center ext-text-lg ext-ml-2 ext-font-black ${settings.theme === 'dark' ? 'ext-text-white' : 'ext-text-black'}`}
              >
                DreamSub Translator
              </p>
            </div>
          </div>
          <div className="ext-flex">
            <Button size="xs" variant="ghost" onClick={handleOpenOptions}>
              <Settings size={12} />
            </Button>
          </div>
        </div>
        {/* Content */}
        <div className="ext-flex ext-flex-col ext-gap-3 ext-flex-1 ext-overflow-y-auto ext-my-4">
          <div className="ext-flex ext-flex-col ext-gap-2">
            <div className="ext-flex ext-flex-col ext-gap-1">
              <label className="ext-text-sm ext-font-medium">Source Language</label>
              <Select
                value={settings.sourceLanguage || 'en'}
                onValueChange={(value: string) => setSettings({ sourceLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="ext-flex ext-flex-col ext-gap-1">
              <label className="ext-text-sm ext-font-medium">Target Language</label>
              <Select
                value={settings.targetLanguage || 'vi'}
                onValueChange={(value: string) => setSettings({ targetLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <div className="ext-flex">
          <div className="ext-flex ext-flex-row ext-justify-between ext-items-center ext-w-full">
            <Button size="xs" variant="ghost">
              <CircleHelp size={12} />
            </Button>
            <p className="ext-text-xs">Version {chrome?.runtime?.getManifest().version}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
