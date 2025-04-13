import { Slider } from '@/components/ui/slider';

type SliderSettingProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  name?: string;
  onChange: (value: number, name?: string) => void;
};

export default function SliderSetting({ label, value, min, max, step = 1, name, onChange }: SliderSettingProps) {
  return (
    <div className="ext-flex ext-flex-col ext-gap-2">
      <p className="ext-text-sm ext-font-medium">{label}</p>
      <div className="ext-flex ext-flex-row ext-items-center ext-gap-2">
        <Slider
          name={name}
          value={[value]}
          max={max}
          min={min}
          step={step}
          onValueChange={([newValue]) => onChange(newValue, name)}
        />
        <p className="ext-text-sm ext-font-medium">{value}</p>
      </div>
    </div>
  );
}
