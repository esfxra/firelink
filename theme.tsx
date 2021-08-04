import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    gray: {
      '50': '#F2F2F2',
      '100': '#DBDBDC',
      '200': '#C4C4C5',
      '300': '#ADADAE',
      '400': '#969697',
      '500': '#7E7E81',
      '600': '#656567',
      '700': '#4C4C4D',
      '800': '#333333',
      '900': '#19191A',
    },
    orange: {
      '50': '#FFF1E5',
      '100': '#FFD9B8',
      '200': '#FFC08A',
      '300': '#FFA75C',
      '400': '#FF8F2E',
      '500': '#FF7600',
      '600': '#CC5E00',
      '700': '#994700',
      '800': '#662F00',
      '900': '#331800',
    },
  },
});

export default theme;
