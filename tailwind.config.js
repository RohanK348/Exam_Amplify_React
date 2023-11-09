const plugin = require('tailwindcss/plugin')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: false,
  //purge: ['./src/**/*.js'],
  target: 'relaxed',
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    typography: {
      default: {
        css: {
          color: '#212121',
          p: {
            fontSize: '0.825rem'
          },
          li: {
            fontSize: '0.825rem'
          },
          a: {
            color: '#2196f3',
            '&:hover': {
              color: '#1e88e5'
            }
          }
        }
      }
    },
    customForms: (theme) => ({
      default: {
        input: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
            borderColor: 'none'
          }
        },
        select: {},
        checkbox: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
            borderColor: 'none'
          }
        }
      }
    }),
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      red: {
        '50': '#ffebee',
        '100': '#ffcdd2',
        '200': '#ef9a9a',
        '300': '#e57373',
        '400': '#ef5350',
        '500': '#f44336',
        '600': '#e53935',
        '700': '#d32f2f',
        '800': '#c62828',
        '900': '#b71c1c',
        A100: '#ff8a80',
        A200: '#ff5252',
        A400: '#ff1744',
        A700: '#d50000'
      },
      pink: {
        '50': '#fce4ec',
        '100': '#f8bbd0',
        '200': '#f48fb1',
        '300': '#f06292',
        '400': '#ec407a',
        '500': '#e91e63',
        '600': '#d81b60',
        '700': '#c2185b',
        '800': '#ad1457',
        '900': '#880e4f',
        A100: '#ff80ab',
        A200: '#ff4081',
        A400: '#f50057',
        A700: '#c51162'
      },
      purple: {
        '50': '#f3e5f5',
        '100': '#e1bee7',
        '200': '#ce93d8',
        '300': '#ba68c8',
        '400': '#ab47bc',
        '500': '#9c27b0',
        '600': '#8e24aa',
        '700': '#7b1fa2',
        '800': '#6a1b9a',
        '900': '#4a148c',
        A100: '#ea80fc',
        A200: '#e040fb',
        A400: '#d500f9',
        A700: '#aa00ff'
      },
      'deep-purple': {
        '50': '#ede7f6',
        '100': '#d1c4e9',
        '200': '#b39ddb',
        '300': '#9575cd',
        '400': '#7e57c2',
        '500': '#673ab7',
        '600': '#5e35b1',
        '700': '#512da8',
        '800': '#4527a0',
        '900': '#311b92',
        A100: '#b388ff',
        A200: '#7c4dff',
        A400: '#651fff',
        A700: '#6200ea'
      },
      indigo: {
        '50': '#e8eaf6',
        '100': '#c5cae9',
        '200': '#9fa8da',
        '300': '#7986cb',
        '400': '#5c6bc0',
        '500': '#3f51b5',
        '600': '#3949ab',
        '700': '#303f9f',
        '800': '#283593',
        '900': '#1a237e',
        A100: '#8c9eff',
        A200: '#536dfe',
        A400: '#3d5afe',
        A700: '#304ffe'
      },
      blue: {
        '50': '#e3f2fd',
        '100': '#bbdefb',
        '200': '#90caf9',
        '300': '#64b5f6',
        '400': '#42a5f5',
        '500': '#2196f3',
        '600': '#1e88e5',
        '700': '#1976d2',
        '800': '#1565c0',
        '900': '#0d47a1',
        A100: '#82b1ff',
        A200: '#448aff',
        A400: '#2979ff',
        A700: '#2962ff'
      },
      'light-blue': {
        '50': '#e1f5fe',
        '100': '#b3e5fc',
        '200': '#81d4fa',
        '300': '#4fc3f7',
        '400': '#29b6f6',
        '500': '#03a9f4',
        '600': '#039be5',
        '700': '#0288d1',
        '800': '#0277bd',
        '900': '#01579b',
        A100: '#80d8ff',
        A200: '#40c4ff',
        A400: '#00b0ff',
        A700: '#0091ea'
      },
      cyan: {
        '50': '#e0f7fa',
        '100': '#b2ebf2',
        '200': '#80deea',
        '300': '#4dd0e1',
        '400': '#26c6da',
        '500': '#00bcd4',
        '600': '#00acc1',
        '700': '#0097a7',
        '800': '#00838f',
        '900': '#006064',
        A100: '#84ffff',
        A200: '#18ffff',
        A400: '#00e5ff',
        A700: '#00b8d4'
      },
      teal: {
        '50': '#e0f2f1',
        '100': '#b2dfdb',
        '200': '#80cbc4',
        '300': '#4db6ac',
        '400': '#26a69a',
        '500': '#009688',
        '600': '#00897b',
        '700': '#00796b',
        '800': '#00695c',
        '900': '#004d40',
        A100: '#a7ffeb',
        A200: '#64ffda',
        A400: '#1de9b6',
        A700: '#00bfa5'
      },
      green: {
        '50': '#e8f5e9',
        '100': '#c8e6c9',
        '200': '#a5d6a7',
        '300': '#81c784',
        '400': '#66bb6a',
        '500': '#4caf50',
        '600': '#43a047',
        '700': '#388e3c',
        '800': '#2e7d32',
        '900': '#1b5e20',
        A100: '#b9f6ca',
        A200: '#69f0ae',
        A400: '#00e676',
        A700: '#00c853'
      },
      'light-green': {
        '50': '#f1f8e9',
        '100': '#dcedc8',
        '200': '#c5e1a5',
        '300': '#aed581',
        '400': '#9ccc65',
        '500': '#8bc34a',
        '600': '#7cb342',
        '700': '#689f38',
        '800': '#558b2f',
        '900': '#33691e',
        A100: '#ccff90',
        A200: '#b2ff59',
        A400: '#76ff03',
        A700: '#64dd17'
      },
      lime: {
        '50': '#f9fbe7',
        '100': '#f0f4c3',
        '200': '#e6ee9c',
        '300': '#dce775',
        '400': '#d4e157',
        '500': '#cddc39',
        '600': '#c0ca33',
        '700': '#afb42b',
        '800': '#9e9d24',
        '900': '#827717',
        A100: '#f4ff81',
        A200: '#eeff41',
        A400: '#c6ff00',
        A700: '#aeea00'
      },
      yellow: {
        '50': '#fffde7',
        '100': '#fff9c4',
        '200': '#fff59d',
        '300': '#fff176',
        '400': '#ffee58',
        '500': '#ffeb3b',
        '600': '#fdd835',
        '700': '#fbc02d',
        '800': '#f9a825',
        '900': '#f57f17',
        A100: '#ffff8d',
        A200: '#ffff00',
        A400: '#ffea00',
        A700: '#ffd600'
      },
      amber: {
        '50': '#fff8e1',
        '100': '#ffecb3',
        '200': '#ffe082',
        '300': '#ffd54f',
        '400': '#ffca28',
        '500': '#ffc107',
        '600': '#ffb300',
        '700': '#ffa000',
        '800': '#ff8f00',
        '900': '#ff6f00',
        A100: '#ffe57f',
        A200: '#ffd740',
        A400: '#ffc400',
        A700: '#ffab00'
      },
      orange: {
        '50': '#fff3e0',
        '100': '#ffe0b2',
        '200': '#ffcc80',
        '300': '#ffb74d',
        '400': '#ffa726',
        '500': '#ff9800',
        '600': '#fb8c00',
        '700': '#f57c00',
        '800': '#ef6c00',
        '900': '#e65100',
        A100: '#ffd180',
        A200: '#ffab40',
        A400: '#ff9100',
        A700: '#ff6d00'
      },
      'deep-orange': {
        '50': '#fbe9e7',
        '100': '#ffccbc',
        '200': '#ffab91',
        '300': '#ff8a65',
        '400': '#ff7043',
        '500': '#ff5722',
        '600': '#f4511e',
        '700': '#e64a19',
        '800': '#d84315',
        '900': '#bf360c',
        A100: '#ff9e80',
        A200: '#ff6e40',
        A400: '#ff3d00',
        A700: '#dd2c00'
      },
      brown: {
        '50': '#efebe9',
        '100': '#d7ccc8',
        '200': '#bcaaa4',
        '300': '#a1887f',
        '400': '#8d6e63',
        '500': '#795548',
        '600': '#6d4c41',
        '700': '#5d4037',
        '800': '#4e342e',
        '900': '#3e2723'
      },
      grey: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#616161',
        '800': '#424242',
        890: '#3a3a3a', //tint %10 or lighten %10
        895: '#2e2e2e', //tint 5% or lighten 5%
        '900': '#212121'
      },
      'blue-grey': {
        '50': '#eceff1',
        '100': '#cfd8dc',
        '200': '#b0bec5',
        '300': '#90a4ae',
        '400': '#78909c',
        '500': '#607d8b',
        '600': '#546e7a',
        '700': '#455a64',
        '800': '#37474f',
        '900': '#263238'
      },
      black: '#000000',
      white: '#FFFFFF'
    },
    spacing: {
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem',
      '96': '24rem',
      '128': '32rem'
    },
    backgroundColor: (theme) => theme('colors'),
    backgroundImage: {
      none: 'none',
      'gradient-to-t': 'linear-gradient(to top, var(--gradient-color-stops))',
      'gradient-to-tr':
        'linear-gradient(to top right, var(--gradient-color-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--gradient-color-stops))',
      'gradient-to-br':
        'linear-gradient(to bottom right, var(--gradient-color-stops))',
      'gradient-to-b':
        'linear-gradient(to bottom, var(--gradient-color-stops))',
      'gradient-to-bl':
        'linear-gradient(to bottom left, var(--gradient-color-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--gradient-color-stops))',
      'gradient-to-tl':
        'linear-gradient(to top left, var(--gradient-color-stops))'
    },
    gradientColorStops: (theme) => theme('colors'),
    backgroundOpacity: (theme) => theme('opacity'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain'
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      default: theme('colors.grey.200', 'currentColor')
    }),
    borderOpacity: (theme) => theme('opacity'),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px'
    },
    boxShadow: {
      xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      default:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none'
    },
    container: {},
    cursor: {
      none: 'none',
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed'
    },
    divideColor: (theme) => theme('borderColor'),
    divideOpacity: (theme) => theme('borderOpacity'),
    divideWidth: (theme) => theme('borderWidth'),
    fill: {
      current: 'currentColor'
    },
    flex: {
      '1': '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none'
    },
    flexGrow: {
      '0': '0',
      default: '1'
    },
    flexShrink: {
      '0': '0',
      default: '1'
    },
    fontFamily: {
      sans: [
        'Poppins',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    },
    fontSize: {
      '3xs': '0.6rem',
      '2xs': '0.7rem',
      xs: '0.75rem',
      sm: '0.825rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh'
    }),
    inset: {
      '0': '0',
      auto: 'auto'
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      '3': '.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem'
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal'
    },
    margin: (theme, {negative}) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    maxHeight: {
      full: '100%',
      screen: '100vh'
    },
    maxWidth: (theme, {breakpoints}) => ({
      none: 'none',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%',
      ...breakpoints(theme('screens'))
    }),
    minHeight: {
      '0': '0',
      full: '100%',
      screen: '100vh'
    },
    minWidth: {
      '0': '0',
      full: '100%'
    },
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '100': '1'
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12'
    },
    padding: (theme) => theme('spacing'),
    placeholderColor: (theme) => theme('colors'),
    placeholderOpacity: (theme) => theme('opacity'),
    space: (theme, {negative}) => ({
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    stroke: {
      current: 'currentColor'
    },
    strokeWidth: {
      '0': '0',
      '1': '1',
      '2': '2'
    },
    textColor: (theme) => theme('colors'),
    textOpacity: (theme) => theme('opacity'),
    width: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw'
    }),
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50'
    },
    gap: (theme) => theme('spacing'),
    gridTemplateColumns: {
      none: 'none',
      '1': 'repeat(1, minmax(0, 1fr))',
      '2': 'repeat(2, minmax(0, 1fr))',
      '3': 'repeat(3, minmax(0, 1fr))',
      '4': 'repeat(4, minmax(0, 1fr))',
      '5': 'repeat(5, minmax(0, 1fr))',
      '6': 'repeat(6, minmax(0, 1fr))',
      '7': 'repeat(7, minmax(0, 1fr))',
      '8': 'repeat(8, minmax(0, 1fr))',
      '9': 'repeat(9, minmax(0, 1fr))',
      '10': 'repeat(10, minmax(0, 1fr))',
      '11': 'repeat(11, minmax(0, 1fr))',
      '12': 'repeat(12, minmax(0, 1fr))'
    },
    gridColumn: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6',
      'span-7': 'span 7 / span 7',
      'span-8': 'span 8 / span 8',
      'span-9': 'span 9 / span 9',
      'span-10': 'span 10 / span 10',
      'span-11': 'span 11 / span 11',
      'span-12': 'span 12 / span 12'
    },
    gridColumnStart: {
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
      '13': '13'
    },
    gridColumnEnd: {
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
      '13': '13'
    },
    gridTemplateRows: {
      none: 'none',
      '1': 'repeat(1, minmax(0, 1fr))',
      '2': 'repeat(2, minmax(0, 1fr))',
      '3': 'repeat(3, minmax(0, 1fr))',
      '4': 'repeat(4, minmax(0, 1fr))',
      '5': 'repeat(5, minmax(0, 1fr))',
      '6': 'repeat(6, minmax(0, 1fr))'
    },
    gridRow: {
      auto: 'auto',
      'span-1': 'span 1 / span 1',
      'span-2': 'span 2 / span 2',
      'span-3': 'span 3 / span 3',
      'span-4': 'span 4 / span 4',
      'span-5': 'span 5 / span 5',
      'span-6': 'span 6 / span 6'
    },
    gridRowStart: {
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7'
    },
    gridRowEnd: {
      auto: 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7'
    },
    transformOrigin: {
      center: 'center',
      top: 'top',
      'top-right': 'top right',
      right: 'right',
      'bottom-right': 'bottom right',
      bottom: 'bottom',
      'bottom-left': 'bottom left',
      left: 'left',
      'top-left': 'top left'
    },
    scale: {
      '0': '0',
      '50': '.5',
      '75': '.75',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5'
    },
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '0': '0',
      '45': '45deg',
      '90': '90deg',
      '180': '180deg'
    },
    translate: (theme, {negative}) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '-full': '-100%',
      '-1/2': '-50%',
      '1/2': '50%',
      full: '100%'
    }),
    skew: {
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '0': '0',
      '3': '3deg',
      '6': '6deg',
      '12': '12deg'
    },
    transitionProperty: {
      none: 'none',
      all: 'all',
      default:
        'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform'
    },
    transitionTimingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    transitionDuration: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms'
    },
    transitionDelay: {
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms'
    },
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite'
    },
    keyframes: {
      spin: {
        to: {transform: 'rotate(360deg)'}
      },
      ping: {
        '75%, 100%': {transform: 'scale(2)', opacity: '0'}
      },
      pulse: {
        '50%': {opacity: '.5'}
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
        }
      }
    }
  },
  variants: {
    accessibility: ['responsive', 'focus'],
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundClip: ['responsive'],
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'dark:hover',
      'dark:focus'
    ],
    backgroundImage: ['responsive'],
    gradientColorStops: ['responsive', 'hover', 'focus'],
    backgroundOpacity: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColor: [
      'responsive',
      'hover',
      'focus',
      'first',
      'last',
      'dark',
      'dark:hover',
      'dark:focus'
    ],
    borderOpacity: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive', 'first', 'last'],
    borderStyle: ['responsive', 'first', 'last'],
    borderWidth: ['responsive', 'first', 'last'],
    boxShadow: ['responsive', 'hover', 'focus'],
    boxSizing: ['responsive'],
    container: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    divideColor: ['responsive'],
    divideOpacity: ['responsive'],
    divideStyle: ['responsive'],
    divideWidth: ['responsive'],
    fill: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    clear: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontSmoothing: ['responsive'],
    fontVariantNumeric: ['responsive'],
    fontStyle: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    inset: ['responsive'],
    justifyContent: ['responsive'],
    justifyItems: ['responsive'],
    justifySelf: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive', 'hover', 'focus'],
    order: ['responsive'],
    outline: ['responsive', 'focus'],
    overflow: ['responsive'],
    overscrollBehavior: ['responsive'],
    padding: ['responsive'],
    placeContent: ['responsive'],
    placeItems: ['responsive'],
    placeSelf: ['responsive'],
    placeholderColor: ['responsive', 'focus'],
    placeholderOpacity: ['responsive', 'focus'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    space: ['responsive'],
    stroke: ['responsive'],
    strokeWidth: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'dark:hover',
      'dark:focus'
    ],
    textOpacity: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    wordBreak: ['responsive'],
    zIndex: ['responsive'],
    gap: ['responsive'],
    gridAutoFlow: ['responsive'],
    gridTemplateColumns: ['responsive'],
    gridColumn: ['responsive'],
    gridColumnStart: ['responsive'],
    gridColumnEnd: ['responsive'],
    gridTemplateRows: ['responsive'],
    gridRow: ['responsive'],
    gridRowStart: ['responsive'],
    gridRowEnd: ['responsive'],
    transform: ['responsive'],
    transformOrigin: ['responsive'],
    scale: ['responsive', 'hover', 'focus'],
    rotate: ['responsive', 'hover', 'focus'],
    translate: ['responsive', 'hover', 'focus'],
    skew: ['responsive', 'hover', 'focus'],
    transitionProperty: ['responsive'],
    transitionTimingFunction: ['responsive'],
    transitionDuration: ['responsive'],
    transitionDelay: ['responsive'],
    animation: ['responsive']
  },
  corePlugins: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-prefers-dark-mode')({
      type: 'class',
      className: '.dark-mode',
      prefix: 'dark'
    })
    /*
    plugin(function ({addVariant, e}) {
      addVariant('collapsed', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.is-collapsed .${e(`collapsed${separator}${className}`)}`
        })
      }),
      addVariant('collapsed:hover', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.is-collapsed .${e(`collapsed:hover${separator}${className}`)}:hover`
        })
      }),
    })
    */
  ]
}
