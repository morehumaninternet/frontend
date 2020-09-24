<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://morehumaninternet.org">
    <img alt="More Human Internet" src="https://morehumaninternet.org/logo.svg" width="180" />
  </a>
</p>
<h1 align="center">
  More Human Internet
</h1>

## Overview

This repository houses the frontend code for [morehumaninternet.org](morehumaninternet.org), check us out to see what we're about!

## Development

This project uses the [Gatsby](https://github.com/gatsbyjs/gatsby) framework using [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), and [Sass](https://sass-lang.com/). We aren't using much of Gatsby's GraphQL capabilities and don't intend to.

1. **Install**
  ```shell
  git clone git@github.com:morehumaninternet/frontend.git
  npm install
  ```

2. **Start developing**
  ```shell
  gatsby develop
  ```

3. **Open the source code and start editing**

  Your site is now running at `http://localhost:8000`

4. **Integrate with Algolia**

  Clicking on the bottom-right corner of the landing page will open a widget. The user can post new issues or search for existing issues. Currently, the issues are saved in `localStorage` or [Algolia](https://www.algolia.com/). To work with Algolia, please follow these steps:  
  4.1 Create an Algolia account and a new index.  
  4.2 Create a `.env.development` file in the root directory of the project with the following environment variables:

  ```shell
  GATSBY_ALGOLIA_APP_ID=
  GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY=
  GATSBY_ALGOLIA_INDEX_NAME=
  ALGOLIA_API_KEY=
  ```

  You can find the values of these variables in your Algolia account under "API Keys" on the left.
  > :warning: Do not commit or share ALGOLIA_API_KEY (Admin API Key) with anyone!

  4.3 Set your Algolia settings by running:

  ```shell
  npm run setup
  ```

  4.4 Run:

  ```shell
  netlify dev
  ```

  Your site is now running at `http://localhost:8888`

## Code Style

### Typescript

  We favor functional programming and immutability within reason. This means prefering `const` to `let` and never mutating arguments passed into a function, but also means we simply use `null | T` to represent data of type `Maybe<T>`.

  The build process runs `npm run lint` to enforce the rules in [tslint.json](tslint.json) and will fail the build with any errors, so be sure to add this executable script at `.git/hooks/pre-commit`.

  ```shell
  #!/bin/sh

  npm run format && npm run lint
  ```

  Our design system could use some more formalization, but we do enforce that all styles are declared in .scss rather than other JS-in-CSS approaches or inline styles. The thinking there is that this enforces good practices around writing clean markup (especially around mobile), helps separate business logic from styling concerns, and would make theming and/or custom styles simpler to implement. All `<div>`s should be given a `className` reflecting what they are. Utilize Sass's ability to nest styles in `{ ... }` blocks and use the `>` operator so that the markup mirrors the associated styles.

## 🧐 What's inside?

A quick look at the top-level files and directories in this project.

    .
    ├── src
       ├── clients
       ├── components
          ├── shared
          ├── widget
       ├── effects
       ├── fonts
       ├── images
       ├── pages
          ├── 404.tsx
          ├── demo.tsx
          ├── index.tsx
          ├── issue.tsx
          ├── thank-you.tsx
       ├── styles
          ├── components
          ├── pages
          ├── shared
          ├── global.scss
       ├── utils
       ├── types.ts
    ├── static

* **`/src`** Code goes here
  * **`/src/clients`** Modules that connect with the outside world. Currently there is only [src/clients/mockApi.ts](src/clients/mockApi.ts) used by the [demo](https://morehumaninternet.org/demo) and representing the functionality the [API](github.com/morehumaninternet/api) should support.
  * **`/src/components`** React components that aren't whole pages go here. If the components are page-specific, they go in their corresponding folder e.g., `demo-page`, `issue-page`, etc. Shared components go in `shared`. The `widget` is used in the demo. On our roadmap, we plan on building a cross platform widget, to be written [here](https://github.com/morehumaninternet/widget), built separately from this frontend.
  * **`/src/effects`** Reusable React hooks/effects
  * **`/src/fonts`** Fonts go here. Be sure there's a file for each font-weight you are using. [/src/styles/shared/fonts.scss](/src/styles/shared/fonts.scss) can be used as a reference and would need to be updated accordingly.
  * **`/src/images`** Images that need resizing via [gatsby-image](https://www.gatsbyjs.com/plugins/gatsby-image/) go here. We're not using this much, which might change in the future or we might get rid gatsby-image altogether. Note, svgs are defined inline so that they are included directly in the resultant mockup.
  * **`/src/pages`** Pages go here. Each file corresponds with a page at the same route, e.g. [demo.tsx](src/pages/demo.tsx) defines [morehumaninternet.org/demo](morehumaninternet.org/demo)
  * **`/src/styles`** Styles go here. Styles that are shared across pages go in `shared`. Styles that are specific to given to components go in `components`. Page layouts go in `pages`. `global.scss` imports the corresponding `_all.scss` file for each, so be sure to add the relevant import whenever you add a file.
  * **`/src/utils`** Poor programming style, but functions that don't otherwise have a clear home.
  * **`/src/types.ts`** Type definitions available across the project. Define any types that are used in multiple places here.
* **`/static`** Any files to be included without modification. Note the direct inclusion of `trix.js` and `trix.css` to support the [trix](https://github.com/basecamp/trix) editor, used by the widget and the comment boxes.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/sites/admiring-carson-42ff06/overview)

Pull requests to this repository should result in a deploy preview branch being built with a notification in the [#engineering](https://app.slack.com/client/T0150864CCV/C017G3R1UUA) channel. Approved pull requests will be merged to production by Will.

If you believe you should have access to Netlify but don't, reach out to Will.
