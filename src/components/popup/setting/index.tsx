import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettings } from '@/hooks/useSettings';

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

const Setting = () => {
  const { settings, setSettings } = useSettings();

  return (
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
  );
};

export default Setting;
