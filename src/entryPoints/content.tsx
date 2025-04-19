import SubtitleTranslator from '@/services/subtitle-translator';
import { useEffect } from 'react';
import renderRoot from './render/render-root';

export default function Content() {
  useEffect(() => {
    const translator = new SubtitleTranslator();
    translator.startObserving();

    return () => {
      translator.stopObserving();
    };
  }, []);

  return <></>;
}

renderRoot(document.body, <Content />);
