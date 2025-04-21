import ColorSetting from '@/components/ui/components/color-setting';
import SliderSetting from '@/components/ui/components/slider-setting';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LANGUAGES, useSettings } from '@/hooks/useSettings';

const Setting = () => {
  const { settings, setSettings } = useSettings();

  const handleDisplaySettingChange = (value: number | string, name?: string) => {
    if (!name) return;
    setSettings({ ...settings, [name]: value });
  };

  return (
    <div className="ext-flex ext-flex-col ext-gap-3 ext-flex-1 ext-overflow-y-auto ext-my-4 ext-p-3">
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

      <div className="ext-flex ext-flex-col ext-gap-1">
        <SliderSetting
          label="Font Size"
          value={settings.fontSize}
          min={10}
          max={30}
          step={1}
          name="fontSize"
          onChange={handleDisplaySettingChange}
        />
      </div>

      <div className="ext-flex ext-flex-col ext-gap-1">
        <SliderSetting
          label="Opacity"
          value={settings.opacity}
          min={0}
          max={100}
          step={1}
          name="opacity"
          onChange={handleDisplaySettingChange}
        />
      </div>

      <div className="ext-flex ext-flex-col ext-gap-1">
        <ColorSetting
          label="Font color"
          color={settings.fontColor}
          name="fontColor"
          onColorChange={handleDisplaySettingChange}
        />
      </div>

      <div className="ext-flex ext-flex-col ext-gap-1">
        <ColorSetting
          label="Background color"
          color={settings.backgroundColor}
          name="backgroundColor"
          onColorChange={handleDisplaySettingChange}
        />
      </div>
    </div>
  );
};

export default Setting;
