import iconDark from '@/assets/images/icon-dark.png';
import iconLight from '@/assets/images/icon-light.png';
import Card from '@/components/ui/card.tsx';
import { Command, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command.tsx';
import SafeImage from '@/components/ui/safe-image.tsx';
import { useSettings } from '@/hooks/useSettings.tsx';
import { MessageCircleMore, Palette, Settings } from 'lucide-react';
import { useState } from 'react';
import ColorSetting from './components/color-setting';
import SliderSetting from './components/slider-setting';

type MenuItemTypes = 'General' | 'Appearance' | 'Contact';

type DisplaySetting = {
  fontSize: number;
  opacity: number;
  fontColor: string;
  backgroundColor: string;
};

const DefaultDisplaySetting: DisplaySetting = {
  fontSize: 12,
  opacity: 100,
  fontColor: '#000000',
  backgroundColor: '#ffffff',
};

export default function Options() {
  const { settings } = useSettings();
  const [currentMenu, setCurrentMenu] = useState<MenuItemTypes>('General');
  const menuItemClass = 'ext-text-sm ext-py-2 ext-px-3 ext-rounded-xl ext-font-normal ext-mt-2 ext-cursor-pointer';

  const handleMenuClick = (value: unknown) => {
    setCurrentMenu(value as MenuItemTypes);
  };

  const [displaySetting, setDisplaySetting] = useState<DisplaySetting>(DefaultDisplaySetting);

  const handleDisplaySettingChange = (value: number | string, name?: string) => {
    if (!name) return;
    setDisplaySetting({ ...displaySetting, [name]: value });
  };

  return (
    <div className="ext-w-full ext-h-svh ext-flex ext-flex-col ext-bg-background ext-text-foreground">
      <div className="ext-flex ext-w-[896px] ext-h-full ext-m-auto">
        <div className="ext-w-full ext-flex ext-flex-col ext-px-2">
          {/* HEADER */}
          <div className="ext-flex ext-flex-row ext-justify-between ext-py-7">
            <div className="ext-flex ext-flex-row ext-items-center">
              <SafeImage className="ext-pl-3" width={45} src={settings.theme === 'dark' ? iconLight : iconDark} />
              <p
                className={`ext-text-center ext-text-2xl ext-ml-2 ext-font-black ${settings.theme === 'dark' ? 'ext-text-white' : 'ext-text-black'}`}
              >
                DreamSub Translator
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="ext-flex ext-flex-row ext-flex-1">
            {/* LEFT MENU */}
            <div className="ext-flex ext-w-56">
              <Command value={currentMenu}>
                <CommandList>
                  <CommandItem className={menuItemClass} value="General" onSelect={handleMenuClick}>
                    <Settings /> <span>General</span>
                  </CommandItem>
                  <CommandItem className={menuItemClass} value="Appearance" onSelect={handleMenuClick}>
                    <Palette /> <span>Appearance</span>
                  </CommandItem>
                  <CommandSeparator className="ext-my-3" />
                  <CommandItem className={menuItemClass} value="Contact" onSelect={handleMenuClick}>
                    <MessageCircleMore /> <span>Contact Us</span>
                  </CommandItem>
                </CommandList>
              </Command>
            </div>

            {/* RIGHT CONTENT */}
            <div className="ext-flex ext-flex-col ext-flex-1 ext-pl-9 ext-pr-3 ext-pt-2">
              <div className="ext-flex ext-flex-col ext-gap-3">
                {currentMenu === 'General' && (
                  <>
                    <Card>
                      Hello, <span className="ext-font-bold">Joe Doe</span>
                    </Card>
                  </>
                )}
                {currentMenu === 'Appearance' && (
                  <div className="ext-flex ext-flex-col ext-gap-5">
                    <SliderSetting
                      label="Font Size"
                      value={displaySetting.fontSize}
                      min={10}
                      max={30}
                      step={1}
                      name="fontSize"
                      onChange={handleDisplaySettingChange}
                    />
                    <SliderSetting
                      label="Opacity"
                      value={displaySetting.opacity}
                      min={0}
                      max={100}
                      step={1}
                      name="opacity"
                      onChange={handleDisplaySettingChange}
                    />
                    <ColorSetting
                      label="Font color"
                      color={displaySetting.fontColor}
                      name="fontColor"
                      onColorChange={handleDisplaySettingChange}
                    />
                    <ColorSetting
                      label="Background Color"
                      color={displaySetting.backgroundColor}
                      name="backgroundColor"
                      onColorChange={handleDisplaySettingChange}
                    />
                  </div>
                )}

                {currentMenu === 'Contact' && (
                  <>
                    <Card title="Contact Us">
                      <p className="ext-text-xs ext-pt-4">Contact us on</p>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="ext-flex ext-flex-col ext-justify-center ext-w-full ext-items-center ext-pt-4 ext-pb-14">
            <p className="ext-text-xs">Made with ❤️ by DreamDev</p>
            <p className="ext-text-xs">Version {chrome?.runtime?.getManifest().version || '0.0.0.1'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
