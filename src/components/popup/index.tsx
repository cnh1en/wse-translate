import { useSettings } from '@/hooks/useSettings';
import Footer from '../ui/components/footer';
import Header from '../ui/components/header';
import './popup.css';
import Setting from './setting';

export default function Popup() {
  const { settings } = useSettings();

  return (
    <div className="ext-h-100 ext-w-80 ext-bg-white ext-flex ext-flex-col ext-border-0 ext-p-0 ext-m-0">
      <div className="ext-w-full ext-h-full ext-flex ext-flex-col ext-justify-between ext-py-3 ext-px-3 ext-bg-background ext-text-foreground">
        <Header theme={settings.theme} />
        <Setting />
        <Footer />
      </div>
    </div>
  );
}
