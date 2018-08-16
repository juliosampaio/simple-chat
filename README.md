# Simple Chat &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/juliosampaio/simple-chat/blob/master/LICENSE) [![CircleCI](https://circleci.com/gh/juliosampaio/simple-chat/tree/master.svg?style=svg)](https://circleci.com/gh/juliosampaio/simple-chat/tree/master)

A simple chat project that aims to be used as playground for various front-end technologies (and also as coding challenges 😅)

## Used technologies

- [Jest](https://jestjs.io/)
- [RxJS](https://rxjs-dev.firebaseapp.com/)
- [Scaledrone](https://www.scaledrone.com/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Webpack](https://webpack.js.org/)

## Running

```sh
$ yarn install
$ yarn start
```

Then go to http://localhost:8080

## Architecture

This app uses a OO approach along with the MVC pattern. There is a very basic DI (Dependency Injection) implementation powered by TypeScript decorators (see `decorators` directory)

The components were built using the WebComponents technology, which makes things more natural when developing custom components for the web.

WebComponents is in a early stage, for this reason there is no support for it yet in testing libraries like [jest](https://github.com/jsdom/jsdom/issues/1030) and cypress. Despite this, this tech seems to have a great future, due to big players (Google) envolved on its specification and its very likely the support will increases in the near future opening the doors for production use.
