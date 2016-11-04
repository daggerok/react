# react-in-html [![build](https://travis-ci.org/daggerok/react.svg?branch=react-in-html)](https://travis-ci.org/daggerok/react)

https://daggerok.github.io/react/ site

```bash
npm i
npm start
npm run dev
npm run webpack
npm run build
npm run serve
```

gihub pages deployment:

```fish
npm run gh-pages # or:
fish bin/gh-pages.fish
```

webpack-dev-server / browser-sync:

- proxy /api/ -> http://localhost:8080/api/
- any fallbacks -> /react/index.html
