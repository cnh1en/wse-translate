<div align="center">

<img src="src/assets/images/icon128.png" width="64"/>

# 🚀 Chrome Extension Starter 
### Vite + React + TypeScript + Tailwind CSS + Shadcn/ui
#### A full-featured, ready-to-use Chrome extension template built with modern technologies - *which just works!*

<p align="center">
    <a href="https://github.com/ahmed-dinar/chrome-extension-react-vite-tailwind-boilerplate/actions">
      <img src="https://img.shields.io/github/actions/workflow/status/ahmed-dinar/chrome-extension-react-vite-tailwind-boilerplate/ci.yml?branch=main" alt="Build Status">
    </a>
  <a href="https://github.com/ahmed-dinar/chrome-extension-react-vite-tailwind-boilerplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ahmed-dinar/chrome-extension-react-vite-tailwind-boilerplate" alt="License">
  </a>
</p>

https://github.com/user-attachments/assets/825363db-14a9-402f-b7ab-9b7ddd4a7e0e

</div>

## Table of Contents

- [Library and Components](#libraryComponents)
- [Development](#development)
- [Folder and File Descriptions](#folders)
- [Auto-reload and HRM](#hrm)
- [Content Scripts: CSS](#content)
- [Custom Fonts](#fonts)
- [Add New Page](#newPage)
- [Setup Your Brand](#branding)
- [Going Minimal](#minimal)
- [Contributing](#contributing)

## Library and Components <a name="libraryComponents"></a>
- ⚡ **Vite**
- 🔒 **TypeScript**
- ⚛️ **React**
- 🖌️ **Tailwind CSS**
- 🌸 **shadcn/ui**
- 📦 **CRX**
- 🎭 **Playwright**

## Development <a name="development"></a>

- Clone the repository and `cd` to it.
- Tested in node version `>=20.18.0`. So make sure its updated.
- ```
    $ yarn install
  ```
  - Install dependencies
- ```
    $ yarn dev
  ```
  - Runs vite in development mood HMR enabled
  - Default port is `5173`.
  - For popup `http://localhost:5173/popup.html`
  - For options `http://localhost:5173/options.html`
  - For content script, open any web page.
  - Auto reload works for all `popup`, `content` and `options`.
- ```
  $ yarn build
  ```
  - Just builds the extension in production mode.
- ```
  $ yarn build:test
  ```
  - Runs `lint`, `prettier` and the production build.
  - After build runs the e2e tests.
- ```
  $ yarn build:watch
  ```
  - Runs the production build with watch mode.
  - Auto reload doesn't work in this mode, needs to manually refresh extension.

## Folder and File Descriptions <a name="folders"></a>

- **`public/`**: Contains all static files that are served as-is, like icons etc.
    - `manifest.json`: The manifest file that configures the extension’s permissions, background scripts, and other settings. [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin)
- **`scripts/`**: Utility script files.
- **`src/`**: Contains all the source code for the extension.
    - `assets/`: Holds assets like fonts, images which compiled with vite.
    - `components/`: Holds user interface components. All the UI designs for `popup`, `content` and `options`.
    - `entryPoints/`: Main entry points of chrome extension.
      - `background.tsx`: The extension's background script.
      - `content.tsx`: The extension's content script.
      - `main.css`: Base common css contains tailwind and other global css shared with all parts of extension.
      - `options.tsx`: The extension's options page.
      - `popup.tsx`: The extension's popup page.
    - `hooks/`: React hooks
      - `useMessage.tsx`: A wrapper of `chrome.runtime.onMessage` usable in all `popup`, `content` and `options` page.
      - `useSettings.tsx`: Global general settings provider holds theme etc. Its sync with `chrome.storage` and notify all `popup`, `content` and `options` page.
    - `lib/`: Contains types, interface, shad cn utils etc.
- **`tests/`**: Contains all unit and e2e tests.
- **`components.json`**: Generated by shadcn/ui.
- **`options.html`**: The extension's options page entry file.
- **`popup.html`**: The extension's popup page entry file.

## Auto-reload and HRM <a name="hrm"></a>

With `vite` and [CRX Vite plugin](https://crxjs.dev/vite-plugin) the hot reload works out of the box. The content script also works, except for custom font files can't make it work yet.
Vite generates font-face's url without chrome extension absolute path. For build mode, implemented a [workaround](./src/entryPoints/render/render-font.tsx).
> After running `yarn dev` or `yarn build:watch`, make sure to refresh the chrome extension once.

## Content Scripts: CSS <a name="content"></a>

For content scripts [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) is used to ensure encapsulated styles preventing interference with the content page.
Content script CSS is injected using [adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets) when supported or via a `<style>` tag as a fallback for older browser versions.


## Custom Fonts <a name="fonts"></a>

* Custom fonts can be used by placing the font files and a @font-face css inside [`src/assets/fonts/`](./src/assets/fonts). 
  * For example, create new folder `Roboto` inside `src/assets/fonts/`.
  * Put font files (woff/woff2/ttf) and `.css` file which has `@font-face`.
  * Update the `font-family` in [`src/entryPoints/main.css`](./src/entryPoints/main.css).

The font is ready to use. [workaround](./src/entryPoints/render/render-font.tsx) script will find the css file, resolve the url using `chrome.runtime.getURL`. 
Font files are copied by `vite-plugin-static-copy` plugin.


## Add New Page <a name="newPage"></a>

You can add new page in chrome extension which will be available at `chrome-extension://{chromeExtensionId}/[page].html`.
For example you may want to have a welcome page which opens after installing the chrome extension.

* Create a ui component in `src/components/welcome/index.tsx`
* Create a entry file in `src/entryPoints/welcome.tsx`
    ```
    const element = document.getElementById('welcome-root')!;
    renderRoot(element, <WelcomeComponent />);
    ```
* Create a `welcome.html` file in root folder.
    * Make sure to add a id div `<div id="welcome-root"></div>` and a script tag `<script type="module" src="src/entryPoints/welcome.tsx"></script>` in body
* Setup entry point for vite in `vite.config.ts`
  ```
    "build": {
       "rollupOptions": {
          welcome: 'welcome.html'
        }
     }
  ```

Now you can access it in `chrome-extension://{chromeExtensionId}/welcom.html`. Or you can open it from background script `chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });`.

## Setup Your Brand <a name="branding"></a>

- Change `ROOT_CONTAINER_ID` in [`/src/lib/constants.ts`](./src/lib/constants.ts)
- Change `sidebarTagName` in [`/src/entryPoints/content.tsx`](./src/entryPoints/content.tsx)
- Change `prefix` in [`tailwind.config.ts`](./tailwind.config.ts)
- Change necessary infos like `name`, `short_name` etc. in [`/public/manifest.json`](./public/manifest.json)
- Change logo in [`/src/assets/images`](./src/assets/images)
- Change icons in [`/public`](./public)
- Delete or update test codes in [`/tests`](./tests)

## Going Minimal <a name="minimal"></a>

You may want to remove dependencies and clean up demo codes to get started from scratch. 

- Remove `src/hooks` and `src/components/ui` folders.
- Remove `src/lib/types.ts` and `src/lib/utils.ts` files.
- Clean up code inside following files. These are root file of these pages.
  - `src/components/content/index.tsx`
  - `src/components/options/index.tsx`
  - `src/components/popup/index.tsx`
  - `src/entryPoints/background.tsx`
- `shadcn/ui`: Remove all `@radix-ui/*`, `cmdk`, `tailwind-merge` dependencies
- Delete test codes in [`/tests`](./tests)

Now you are ready to go from scratch!

You can also build chrome extension without content/popup/options page.

- To remove options page, delete `"options_ui"` and `"options_page"` from `public/manifest.json`.
- To remove content script, delete `"content_scripts"` from `public/manifest.json`.
- To remove popup page, delete `"default_popup"` from `public/manifest.json`.

## Contributing <a name="contributing"></a>

This is an open-source template. Contributions are welcome!
Feel free to open pull requests or raise issues to help improve this project.





