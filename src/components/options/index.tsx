import { Card, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Command, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command.tsx';
import { useSettings } from '@/hooks/useSettings.tsx';
import { MessageCircleMore, Palette, Settings } from 'lucide-react';
import { useState } from 'react';
import ColorSetting from '../ui/components/color-setting';
import Footer from '../ui/components/footer';
import Header from '../ui/components/header';
import SliderSetting from '../ui/components/slider-setting';

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
          <div className="ext-m-8">
            <Header theme={settings.theme} />
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
                      <CardHeader>
                        <CardTitle>
                          Hello, <span className="ext-font-bold">Joe Doe</span>
                        </CardTitle>
                      </CardHeader>
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Us</CardTitle>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="ext-m-4">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
