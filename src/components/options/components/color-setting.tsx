import { ColorPicker } from '@/components/ui/color-picker';

type ColorSettingProps = {
  label: string;
  color: string;
  name?: string;
  onColorChange: (color: string, name?: string) => void;
};

export default function ColorSetting({ label, color, onColorChange, name }: ColorSettingProps) {
  return (
    <div className="ext-flex ext-flex-col ext-gap-2">
      <p className="ext-text-sm ext-font-medium">{label}</p>
      <div className="ext-flex ext-flex-row ext-items-center ext-gap-2">
        <ColorPicker name={name} value={color} onChange={(value) => onColorChange(value, name)} />
        <p className="ext-text-sm ext-font-medium">{color}</p>
      </div>
    </div>
  );
}
