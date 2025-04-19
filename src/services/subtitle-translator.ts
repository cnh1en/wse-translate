class SubtitleTranslator {
  private observer: MutationObserver;
  private targetLanguage: string;

  constructor(targetLanguage: string = 'vi') {
    this.targetLanguage = targetLanguage;
    this.observer = new MutationObserver(this.handleSubtitleChanges.bind(this));
  }

  private async handleSubtitleChanges(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const subtitleElements = this.findSubtitleElements(mutation.target as Element);
        for (const element of subtitleElements) {
          await this.translateSubtitle(element);
        }
      }
    }
  }

  private findSubtitleElements(node: Element): HTMLElement[] {
    return Array.from(node.querySelectorAll("div[data-purpose='captions-cue-text']"));
  }

  private async translateSubtitle(element: HTMLElement) {
    const originalText = element.textContent;
    if (!originalText) return;

    try {
      const translatedText = await this.translateText(originalText);
      element.textContent = translatedText;
    } catch (error) {
      console.error('Translation error:', error);
    }
  }

  private async translateText(text: string): Promise<string> {
    return `[${this.targetLanguage}]: ${text}`; // Placeholder
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
