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
      displayTranslateElement.style.backgroundColor = this.settings.backgroundColor;
      displayTranslateElement.style.opacity = `${this.settings.opacity / 100}`;
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
