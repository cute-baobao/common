import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import presetTheme from "unocss-preset-theme";
import type { Theme } from "unocss/preset-uno"
import { myTheme } from "./src/assets/myTheme"


export default defineConfig({
  rules:[
    // 滚动条整体样式
    ['scrollbar', { 'scrollbar-width': 'thin', 'scrollbar-color': 'blue gray-200' }],
    // 滚动条轨道样式
    ['scrollbar-track', { 'scrollbar-color': 'transparent', 'scrollbar-width': 'thin' }],
    // 滚动条滑块样式
    ['scrollbar-thumb', { 'background-color': 'blue', 'border-radius': '9999px', 'border': '1px solid transparent' }],
  ],
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
    presetTheme<Theme>({
        theme: myTheme,
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})