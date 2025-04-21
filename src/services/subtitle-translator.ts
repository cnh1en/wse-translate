import { WSE_DISPLAY_TRANSLATE_CLASSNAME } from '@/entryPoints/content';
import { GeneralSettings } from '@/lib/types';

class SubtitleTranslator {
  private observer: MutationObserver;
  private previousCaption: string = '';
  private settings!: GeneralSettings;

  constructor(settings: GeneralSettings) {
    this.setSettings(settings);
    this.observer = new MutationObserver(this.handleSubtitleChanges.bind(this));
  }

  public setSettings(settings: GeneralSettings) {
    this.settings = settings;
    this.beautifyDisplayTranslateElement();
  }

  public beautifyDisplayTranslateElement() {
    const displayTranslateElement = document.querySelector(`.${WSE_DISPLAY_TRANSLATE_CLASSNAME}`) as HTMLElement;
    if (displayTranslateElement) {
      displayTranslateElement.style.fontSize = `${this.settings.fontSize}px`;
      displayTranslateElement.style.color = this.settings.fontColor;

      // Apply opacity only to background color
      const bgColor = this.settings.backgroundColor;
      const opacity = this.settings.opacity / 100;

      // Convert hex to rgba to apply opacity
      if (bgColor.startsWith('#')) {
        const r = parseInt(bgColor.slice(1, 3), 16);
        const g = parseInt(bgColor.slice(3, 5), 16);
        const b = parseInt(bgColor.slice(5, 7), 16);
        displayTranslateElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      } else {
        // Fallback for non-hex colors
        displayTranslateElement.style.backgroundColor = bgColor;
        displayTranslateElement.style.opacity = `${opacity}`;
      }
    }
  }

  private async handleSubtitleChanges() {
    const caption =
      document.querySelectorAll("div[class^='well--container--']").length === 1
        ? document.querySelector("div[class^='well--container--']")?.textContent
        : document.querySelector("div[class^='captions-display--captions-container']")?.textContent;

    if (!caption || caption === this.previousCaption) return;

    this.previousCaption = caption;

    this.stopObserving();
    const translatedText = await this.translateText(caption);
    if (translatedText) {
      const displayTranslateElement = document.querySelector(`.${WSE_DISPLAY_TRANSLATE_CLASSNAME}`) as HTMLElement;
      if (displayTranslateElement) {
        displayTranslateElement.textContent = translatedText;
      }
    }
    this.startObserving();
  }

  private async translateText(text: string) {
    const data = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${this.settings.targetLanguage}&dt=t&q=${encodeURIComponent(
        text,
      )}`,
    );

    const json = await data.json();
    return json[0][0][0];
  }

  public startObserving() {
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }

  public stopObserving() {
    this.observer.disconnect();
  }
}

export default SubtitleTranslator;
