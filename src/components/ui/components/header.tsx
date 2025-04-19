import iconLight from '@/assets/images/icon-light.png';
import iconDark from '@/assets/images/icon-dark.png';
import SafeImage from '@/components/ui/safe-image';
import { Theme } from '@/lib/types';

type HeaderProps = {
  theme: Theme;
};

export default function Header({ theme }: HeaderProps) {
  return (
    <div className="ext-flex ext-flex-row ext-justify-between ext-items-center">
      <div className="ext-flex">
        <div className="ext-flex ext-flex-row ext-items-center">
          <SafeImage className="ext-pl-3" width={40} src={theme === 'dark' ? iconLight : iconDark} />
          <p
            className={`ext-text-center ext-text-lg ext-ml-2 ext-font-black ${theme === 'dark' ? 'ext-text-white' : 'ext-text-black'}`}
          >
            DreamSub Translator
          </p>
        </div>
      </div>
    </div>
  );
}
