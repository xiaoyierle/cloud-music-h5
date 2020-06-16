import {createGlobalStyle} from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {
  font-family: 'iconfont';  /* project id 1887241 */
  src: url('//at.alicdn.com/t/font_1887241_gy3rlkg7qna.eot');
  src: url('//at.alicdn.com/t/font_1887241_gy3rlkg7qna.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1887241_gy3rlkg7qna.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1887241_gy3rlkg7qna.woff') format('woff'),
  url('//at.alicdn.com/t/font_1887241_gy3rlkg7qna.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1887241_gy3rlkg7qna.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`