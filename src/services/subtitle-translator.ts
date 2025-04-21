import { GeneralSettings } from '@/lib/types';

class SubtitleTranslator {
  private observer: MutationObserver;
  private targetLanguage: string;
  private previousCaption: string = '';
  private settings: GeneralSettings;

  constructor(settings: GeneralSettings, targetLanguage: string = 'vi') {
    this.settings = settings;
    this.targetLanguage = targetLanguage;
    this.observer = new MutationObserver(this.handleSubtitleChanges.bind(this));
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
      const displayTranslateElement = document.querySelector('.wse-display-translate') as HTMLElement;
      if (displayTranslateElement) {
        displayTranslateElement.textContent = translatedText;
        displayTranslateElement.style.color = this.settings.fontColor;
        displayTranslateElement.style.backgroundColor = this.settings.backgroundColor;
        displayTranslateElement.style.opacity = `${this.settings.opacity / 100}`;
        displayTranslateElement.style.fontSize = `${this.settings.fontSize}px`;
      }
    }
    this.startObserving();
  }

  private async translateText(text: string) {
    const data = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${this.targetLanguage}&dt=t&q=${encodeURIComponent(
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
