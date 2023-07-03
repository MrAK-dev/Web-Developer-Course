import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    icons: `${buildFolder}/icons/`,
    json: `${buildFolder}/json/`,
  },
  src: {
    js: `${srcFolder}/js/index.js`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
    icons: `${srcFolder}/icons/**/*.*`,
    json: `${srcFolder}/json/**/*.json`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.+(scss|sass|css)`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    icons: `${srcFolder}/icons/**/*.*`,
    json: `${srcFolder}/json/**/*.json`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
