import { useSettings } from '@/hooks/useSettings';

type Props = {
  text: string;
};

const CustomArea = ({ text }: Props) => {
  const { settings } = useSettings();

  return (
    <div
      className="ext-w-full ext-h-full ext-bg-background ext-text-foreground"
      style={{
        backgroundColor: settings.backgroundColor,
        opacity: settings.opacity,
      }}
    >
      <p
        style={{
          fontSize: settings.fontSize,
          color: settings.fontColor,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default CustomArea;
