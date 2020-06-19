import {createGlobalStyle} from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {
  font-family: 'iconfont';  /* project id 1887241 */
  src: url('//at.alicdn.com/t/font_1887241_i13z28ddy9.eot');
  src: url('//at.alicdn.com/t/font_1887241_i13z28ddy9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1887241_i13z28ddy9.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1887241_i13z28ddy9.woff') format('woff'),
  url('//at.alicdn.com/t/font_1887241_i13z28ddy9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1887241_i13z28ddy9.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`