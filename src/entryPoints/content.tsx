import { useSettings } from '@/hooks/useSettings';
import SubtitleTranslator from '@/services/subtitle-translator';
import { useEffect } from 'react';
import './main.css';
import renderRoot from './render/render-root';

const SELECTORS = {
  VIDEO_PLAYER: "div[class^='video-player--mock-']",
  CAPTIONS_DISPLAY: "div[class^='captions-display--captions-container--']",
} as const;

const WSE_TRANSLATE_AREA_CLASSNAME = 'wse-translate-area' as const;
export const WSE_DISPLAY_TRANSLATE_CLASSNAME = 'wse-display-translate' as const;

const getVideoPlayer = (): HTMLElement | null => document.querySelector(SELECTORS.VIDEO_PLAYER) as HTMLElement;

const getCaptionsDisplay = (): HTMLElement | null => document.querySelector(SELECTORS.CAPTIONS_DISPLAY) as HTMLElement;

const createTranslateArea = (): HTMLElement => {
  const existingTranslateArea = document.querySelector(`.${WSE_TRANSLATE_AREA_CLASSNAME}`);
  if (existingTranslateArea) {
    return existingTranslateArea as HTMLElement;
  }

  const area = document.createElement('div');
  area.classList.add(WSE_TRANSLATE_AREA_CLASSNAME);

  const displayTranslate = document.createElement('div');
  displayTranslate.classList.add(WSE_DISPLAY_TRANSLATE_CLASSNAME);

  area.appendChild(displayTranslate);
  return area;
};

const setupObserver = async () => {
  return new Promise<HTMLElement>((resolve) => {
    let isCaptionsHidden = false;

    const handleMutation = async (_mutations: MutationRecord[], observer: MutationObserver) => {
      const videoPlayer = getVideoPlayer();
      const captionsDisplay = getCaptionsDisplay();

      if (captionsDisplay && !isCaptionsHidden) {
        captionsDisplay.style.display = 'none';
        isCaptionsHidden = true;
      }

      if (videoPlayer) {
        if (isCaptionsHidden) {
          observer.disconnect();
        }

        const translateArea = createTranslateArea();
        videoPlayer.appendChild(translateArea);
        resolve(videoPlayer);
      }
    };

    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export default function Content() {
  const { settings } = useSettings();

  useEffect(() => {
    const translator = new SubtitleTranslator(settings);
    translator.startObserving();

    return () => {
      translator.stopObserving();
    };
  }, [settings]);

  return <></>;
}

setupObserver().then((container) => {
  renderRoot(container, <Content />);
});
