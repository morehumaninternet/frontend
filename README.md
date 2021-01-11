<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://morehumaninternet.org">
    <img alt="More Human Internet" src="https://morehumaninternet.org/logo.svg" width="180" />
  </a>
</p>
<h1 align="center">
  More Human Internet
</h1>

This repository houses the frontend code for [morehumaninternet.org](https://morehumaninternet.org), check us out to see what we're about!

## 🔗 Links

- **[Landing Page](https://morehumaninternet.org)** - the current landing page for the site.
- **[Roar Page](https://morehumaninternet.org/roar)** - promoting [Roar!](https://chrome.google.com/webstore/detail/roar/jfcmnmgckhjcflmljjgjjilmjhbgdfkc?hl=en&authuser=0)

### Semi-deprecated

These pages are for a demo of an initial idea to market a widget for website maintainers. They are retained for posterity and because some of the ideas may be revisited.

- **[Demo Page](https://morehumaninternet.org/demo)** - the start of the demo, with an example of a faulty checkout experience where more human internet could be useful. For this and all subsequent pages add `?noTour=true` as the query as in [morehumaninternet.org/demo?noTour=true](https://morehumaninternet.org/demo?noTour=true) to view the page by itself with no tour.
- **[Issue Page](https://morehumaninternet.org/issue?site=goalco.com&id=7)** - a page for a specific issue, identified by the `site` and `id` in the query params. Change the `id` query parameter to another integer and the [mockApi](https://github.com/morehumaninternet/frontend/blob/production/src/clients/mockApi.ts) will generate a new issue for you. The [issue page with no tour](https://morehumaninternet.org/issue?site=goalco.com&id=9&noTour=1) has `noTour=1` as a query parameter.
- **[Issues Page](https://morehumaninternet.org/issues?site=goalco.com)** - a page for all the issues of a given site, identified by the `site` query parameter. The [issues page with no tour](https://morehumaninternet.org/issue?site=goalco.com&noTour=1) has `noTour=1` as a query parameter.

## 👩🏽‍💻 Development

This project uses the [Gatsby](https://github.com/gatsbyjs/gatsby) framework using [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), and [Sass](https://sass-lang.com/). We aren't using much of Gatsby's GraphQL capabilities and don't intend to.

1. **Install**

```shell
git clone git@github.com:morehumaninternet/frontend.git
npm install
```

2. **Start developing**

If you want to integrate with Mailchimp jump to step 4. Otherwise run:

```shell
npm run develop
```

3. **Open the source code and start editing**

Your site is now running at `http://localhost:8000`

4. **Integrate with Mailchimp**

Roar's landing page includes a form to subscribe to our newsletter. If you want to test this feature, follow these steps:
5.1 Create a Mailchimp account. If you need More Human Internet's account details, please contact Will Weiss or Shachar Langer.
5.2 Create a `.env.development` file in the root directory of the project with the following environment variables:

```shell
MAILCHIMP_LIST_ID=
MAILCHIMP_API_KEY=
MAILCHIMP_SERVER_PREFIX=
```

> :warning: Do not commit or share MAILCHIMP_API_KEY (Admin API Key) with anyone!

6. **Start developing with Netlify functions**

```shell
npm install netlify-cli -g
netlify dev
```

Your site is now running at `http://localhost:8888`

## 💅 Code Style

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
    ├── functions
       ├── postIssue.js
    ├── src
       ├── __tests
       ├── animations
       ├── clients
       ├── components
          ├── shared
          ├── widget
          ├── simple-feedback-widget
       ├── effects
       ├── fonts
       ├── images
       ├── pages
          ├── 404.tsx
          ├── demo.tsx
          ├── index.tsx
          ├── issue.tsx
          ├── issues.tsx
          ├── roar.tsx
          ├── thank-you.tsx
       ├── styles
          ├── components
          ├── pages
          ├── shared
          ├── global.scss
       ├── utils
       ├── types.ts
    ├── static

- **`/functions`** "Serverless" functions executed by netlify go here.
- **`/i18n`** Translations go here. Support for Spanish and other languages is planned, but not fully implemented yet.
- **`/src`** Frontend code goes here
  - **`/src/__tests`** Unit tests run by mocha. Tests both `/src` & `/functions`.
  - **`/src/animations`** Reusable animations requiring javascript.
  - **`/src/clients`** Modules that connect with the outside world. [src/clients/mockApi.ts](src/clients/mockApi.ts) is used by the [demo](https://morehumaninternet.org/demo) and representing the functionality the [API](github.com/morehumaninternet/api) might support.
  - **`/src/components`** React components that aren't whole pages go here. If the components are page-specific, they go in their corresponding folder e.g., `demo-page`, `issue-page`, etc. Shared components go in `shared`. The `widget` is used in the demo. On our roadmap, we plan on building a cross platform widget, to be written [here](https://github.com/morehumaninternet/widget), built separately from this frontend.
  - **`/src/effects`** Reusable React hooks/effects
  - **`/src/fonts`** Fonts go here. Be sure there's a file for each font-weight you are using. [/src/styles/shared/fonts.scss](/src/styles/shared/fonts.scss) can be used as a reference and would need to be updated accordingly.
  - **`/src/pages`** Pages go here. Each file corresponds with a page at the same route, e.g. [demo.tsx](src/pages/demo.tsx) defines [morehumaninternet.org/demo](morehumaninternet.org/demo). Note that the convention is for any complicated pages to just point to a corresponding component in the page-specific directory in [src/components](src/components) e.g., [src/pages/issue.tsx](src/pages/issue.tsx) just points to [src/components/issue-page.tsx](src/components/issue-page.tsx).
  - **`/src/styles`** Styles go here. Styles that are shared across pages go in `shared`. Styles that are specific to given to components go in `components`. Page layouts go in `pages`. `global.scss` imports the corresponding `_all.scss` file for each, so be sure to add the relevant import whenever you add a file.
  - **`/src/utils`** Poor programming style, but functions that don't otherwise have a clear home.
  - **`/src/types.ts`** Type definitions available across the project. Define any types that are used in multiple places here.
- **`/static`** Any files to be included without modification. Note the direct inclusion of `trix.js` and `trix.css` to support the [trix](https://github.com/basecamp/trix) editor, used by the widget and the comment boxes.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/sites/admiring-carson-42ff06/overview)

Pull requests to this repository should result in a deploy preview branch being built with a notification in the [#engineering](https://app.slack.com/client/T0150864CCV/C017G3R1UUA) channel. Approved pull requests will be merged to production by Will.

If you believe you should have access to Netlify but don't, reach out to Will.
