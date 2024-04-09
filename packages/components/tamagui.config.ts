import { createAnimations } from '@tamagui/animations-moti';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes } from '@tamagui/themes';
import { createFont, createTamagui, createTokens } from 'tamagui';

import {
  brand,
  brandDark,
  caution,
  cautionDark,
  critical,
  criticalDark,
  info,
  infoDark,
  neutral,
  neutralDark,
  primary,
  primaryDark,
  light as primitive,
  blackA as primitiveBlackA,
  dark as primitiveDark,
  whiteA as primitiveWhiteA,
  success,
  successDark,
} from './colors';

import type { Variable } from '@tamagui/web/types/createVariable';

const isTamaguiNative = process.env.TAMAGUI_TARGET === 'native';
const font = createFont({
  family: isTamaguiNative
    ? 'System'
    : 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  size: {
    bodySm: 12,
    bodySmMedium: 12,
    bodyMd: 14,
    bodyMdMedium: 14,
    true: 16,
    bodyLg: 16,
    bodyLgMedium: 16,
    headingXxs: 10,
    headingXs: 12,
    headingSm: 14,
    headingMd: 16,
    headingLg: 18,
    headingXl: 20,
    heading2xl: 24,
    heading3xl: 28,
    heading4xl: 32,
    heading5xl: 40,
  },
  lineHeight: {
    bodySm: 16,
    bodySmMedium: 16,
    bodyMd: 20,
    bodyMdMedium: 20,
    true: 24,
    bodyLg: 24,
    bodyLgMedium: 24,
    headingXxs: 12,
    headingXs: 16,
    headingSm: 20,
    headingMd: 24,
    headingLg: 28,
    headingXl: 28,
    heading2xl: 32,
    heading3xl: 36,
    heading4xl: 40,
    heading5xl: 48,
  },
  weight: {
    bodySm: '400',
    bodySmMedium: '500',
    bodyMd: '400',
    bodyMdMedium: '500',
    true: '400',
    bodyLg: '400',
    bodyLgMedium: '500',
    headingXxs: '500',
    headingXs: '600',
    headingSm: '600',
    headingMd: '600',
    headingLg: '600',
    headingXl: '600',
    heading2xl: '600',
    heading3xl: '600',
    heading4xl: '600',
    heading5xl: '700',
  },
  transform: {
    bodySm: 'none',
    bodySmMedium: 'none',
    bodyMd: 'none',
    bodyMdMedium: 'none',
    true: 'none',
    bodyLg: 'none',
    bodyLgMedium: 'none',
    headingXxs: 'none',
    headingXs: 'uppercase',
    headingSm: 'none',
    headingMd: 'none',
    headingLg: 'none',
    headingXl: 'none',
    heading2xl: 'none',
    heading3xl: 'none',
    heading4xl: 'none',
    heading5xl: 'none',
  },
  letterSpacing: {
    bodySm: 0,
    bodySmMedium: 0,
    bodyMd: 0,
    bodyMdMedium: 0,
    true: 0,
    bodyLg: 0,
    bodyLgMedium: 0,
    headingXxs: 0,
    headingXs: 0.8,
    headingSm: 0,
    headingMd: 0,
    headingLg: 0,
    headingXl: 0,
    heading2xl: 0,
    heading3xl: 0,
    heading4xl: 0,
    heading5xl: 0,
  },
});

// https://docs.swmansion.com/react-native-reanimated/docs/2.x/api/animations/withSpring/
const animations = createAnimations({
  '50ms': {
    type: 'timing',
    duration: 100,
  },
  '100ms': {
    type: 'timing',
    duration: 100,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 0.1,
  },
  fast: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
});

const { whiteA } = primitiveWhiteA;
const { blackA } = primitiveBlackA;
const { gray, grayA } = primitive;
const { grayDark, grayDarkA } = primitiveDark;

const lightColors = {
  ...brand,
  ...primary,
  ...neutral,
  ...success,
  ...caution,
  ...info,
  ...critical,
  bgApp: '#FFFFFF',
  bg: '#FFFFFF',
  bgReverse: '#1b1b1b',
  bgHover: neutral.neutral3,
  bgActive: neutral.neutral4,
  bgBackdrop: grayA.grayA8,
  bgCaution: caution.caution3,
  bgCautionStrong: caution.caution9,
  bgCautionSubdued: caution.caution2,
  bgCritical: critical.critical3,
  bgCriticalStrong: critical.critical9,
  bgCriticalStrongActive: critical.critical11,
  bgCriticalStrongHover: critical.critical10,
  bgCriticalSubdued: critical.critical2,
  bgDisabled: neutral.neutral3,
  bgInfo: info.info3,
  bgInfoStrong: info.info9,
  bgInfoSubdued: info.info2,
  bgInverse: neutral.neutral12,
  bgInverseActive: whiteA.whiteA5,
  bgInverseHover: whiteA.whiteA4,
  bgPrimary: primary.primary12,
  bgPrimaryActive: primary.primary10,
  bgPrimaryHover: primary.primary11,
  bgSubdued: gray.gray2,
  bgStrong: neutral.neutral3,
  bgStrongHover: neutral.neutral4,
  bgStrongActive: neutral.neutral5,
  bgSuccess: success.success3,
  bgSuccessStrong: success.success9,
  bgSuccessSubdued: success.success2,
  bgSidebar: gray.gray2,
  border: neutral.neutral6,
  borderActive: primary.primary12,
  borderCaution: caution.caution7,
  borderCautionSubdued: caution.caution6,
  borderCritical: critical.critical7,
  borderCriticalActive: critical.critical9,
  borderCriticalHover: critical.critical8,
  borderCriticalSubdued: critical.critical6,
  borderDisabled: neutral.neutral3,
  borderHover: neutral.neutral8,
  borderInfo: info.info7,
  borderInfoSubdued: info.info6,
  borderInverse: grayDark.gray7,
  borderStrong: neutral.neutral7,
  borderSubdued: neutral.neutral5,
  borderSuccess: success.success7,
  borderSuccessSubdued: success.success6,
  focusRing: neutral.neutral7,
  focusRingCritical: critical.critical8,
  icon: neutral.neutral11,
  iconActive: neutral.neutral12,
  iconCaution: caution.caution11,
  iconCritical: critical.critical11,
  iconDisabled: neutral.neutral8,
  iconHover: neutral.neutral12,
  iconInfo: info.info11,
  iconInverse: gray.gray1,
  iconOnBrightColor: gray.gray12,
  iconOnColor: '#ffffff',
  iconStrong: neutral.neutral12,
  iconSubdued: neutral.neutral9,
  iconSuccess: success.success11,
  text: neutral.neutral12,
  textCaution: caution.caution11,
  textCautionStrong: caution.caution12,
  textCritical: critical.critical11,
  textCriticalStrong: critical.critical12,
  textDisabled: neutral.neutral9,
  textInfo: info.info11,
  textInfoStrong: info.info12,
  textInteractive: brand.brand11,
  textInteractiveHover: brand.brand12,
  textInverse: grayDarkA.grayA12,
  textInverseSubdued: grayDarkA.grayA11,
  textOnBrightColor: gray.gray12,
  textOnColor: '#ffffff',
  textPlaceholder: neutral.neutral9,
  textSubdued: neutral.neutral11,
  textSuccess: success.success11,
  textSuccessStrong: success.success12,
  transparent: '#AAAAAA00',
};

const darkColors: typeof lightColors = {
  ...brandDark,
  ...primaryDark,
  ...neutralDark,
  ...successDark,
  ...cautionDark,
  ...infoDark,
  ...criticalDark,
  bgApp: '#0f0f0f',
  bg: '#1b1b1b',
  bgReverse: '#ffffff',
  bgHover: neutralDark.neutral3,
  bgActive: neutralDark.neutral4,
  bgBackdrop: grayA.grayA8,
  bgCaution: cautionDark.caution3,
  bgCautionStrong: cautionDark.caution9,
  bgCautionSubdued: cautionDark.caution2,
  bgCritical: criticalDark.critical3,
  bgCriticalStrong: criticalDark.critical9,
  bgCriticalStrongActive: criticalDark.critical11,
  bgCriticalStrongHover: criticalDark.critical10,
  bgCriticalSubdued: criticalDark.critical2,
  bgDisabled: neutralDark.neutral3,
  bgInfo: infoDark.info3,
  bgInfoStrong: infoDark.info9,
  bgInfoSubdued: infoDark.info2,
  bgInverse: neutralDark.neutral12,
  bgInverseActive: blackA.blackA5,
  bgInverseHover: blackA.blackA4,
  bgPrimary: primaryDark.primary12,
  bgPrimaryActive: primaryDark.primary10,
  bgPrimaryHover: primaryDark.primary11,
  bgSubdued: grayDark.gray2,
  bgStrong: neutralDark.neutral3,
  bgStrongHover: neutralDark.neutral4,
  bgStrongActive: neutralDark.neutral5,
  bgSuccess: successDark.success3,
  bgSuccessStrong: successDark.success9,
  bgSuccessSubdued: successDark.success2,
  bgSidebar: grayDark.gray2,
  border: neutralDark.neutral6,
  borderActive: primaryDark.primary12,
  borderCaution: cautionDark.caution7,
  borderCautionSubdued: cautionDark.caution6,
  borderCritical: criticalDark.critical7,
  borderCriticalActive: criticalDark.critical9,
  borderCriticalHover: criticalDark.critical8,
  borderCriticalSubdued: criticalDark.critical6,
  borderDisabled: neutralDark.neutral3,
  borderHover: neutralDark.neutral8,
  borderInfo: infoDark.info7,
  borderInfoSubdued: infoDark.info6,
  borderInverse: neutralDark.neutral2,
  borderStrong: neutralDark.neutral7,
  borderSubdued: neutralDark.neutral5,
  borderSuccess: successDark.success7,
  borderSuccessSubdued: successDark.success6,
  focusRing: neutralDark.neutral7,
  focusRingCritical: criticalDark.critical8,
  icon: neutralDark.neutral11,
  iconActive: neutralDark.neutral12,
  iconCaution: cautionDark.caution11,
  iconCritical: criticalDark.critical11,
  iconDisabled: neutralDark.neutral8,
  iconHover: neutralDark.neutral12,
  iconInfo: infoDark.info8,
  iconInverse: grayDark.gray1,
  iconOnBrightColor: gray.gray12,
  iconOnColor: '#ffffff',
  iconStrong: neutralDark.neutral12,
  iconSubdued: neutralDark.neutral9,
  iconSuccess: successDark.success11,
  text: neutralDark.neutral12,
  textCaution: cautionDark.caution11,
  textCautionStrong: cautionDark.caution12,
  textCritical: criticalDark.critical11,
  textCriticalStrong: criticalDark.critical12,
  textDisabled: neutralDark.neutral9,
  textInfo: infoDark.info11,
  textInfoStrong: infoDark.info12,
  textInteractive: brandDark.brand11,
  textInteractiveHover: brandDark.brand12,
  textInverse: grayA.grayA12,
  textInverseSubdued: grayA.grayA11,
  textOnBrightColor: gray.gray12,
  textOnColor: '#ffffff',
  textPlaceholder: neutralDark.neutral9,
  textSubdued: neutralDark.neutral11,
  textSuccess: successDark.success11,
  textSuccessStrong: successDark.success12,
  transparent: '#AAAAAA00',
};

function postfixObjKeys<
  A extends { [key: string]: Variable<string> | string },
  B extends string,
>(
  obj: A,
  postfix: B,
): {
  [Key in `${keyof A extends string ? keyof A : never}${B}`]:
    | Variable<string>
    | string;
} {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v]),
  ) as any;
}
const mergedTokens = createTokens({
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
  size: {
    0: 0,
    px: 1,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    4.5: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    true: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    78: 312,
    80: 320,
    96: 384,
    100: 400,
    160: 640,
    sideBarWidth: 208,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    2.5: 10,
    true: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    full: 9999,
  },
  space: {
    0: 0,
    px: 1,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    true: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    46: 184,
    54: 216,
    '-px': -1,
    '-0.5': -2,
    '-1': -4,
    '-1.5': -6,
    '-2': -8,
    '-2.5': -10,
    '-3': -12,
    '-3.5': -14,
    '-4': -16,
    '-5': -20,
    '-6': -24,
    '-8': -32,
    '-10': -40,
    '-12': -48,
    '-16': -64,
    '-20': -80,
    '-24': -96,
    '-28': -112,
    '-32': -128,
  },
  color: {
    ...postfixObjKeys(lightColors, 'Light'),
    ...postfixObjKeys(darkColors, 'Dark'),
    ...whiteA,
    ...blackA,
  },
});

const config = createTamagui({
  animations,

  defaultTheme: 'light',

  shouldAddPrefersColorThemes: false,

  themeClassNameOnRoot: false,

  shorthands,

  fonts: {
    body: font,
    heading: font,
  },

  themes: {
    light: {
      ...themes.light,
      ...lightColors,

      // override default theme
      'background': mergedTokens.color.bgAppLight,
      'backgroundHover': mergedTokens.color.bgHoverLight,
      'backgroundPress': mergedTokens.color.bgActiveLight,
      'backgroundFocus': mergedTokens.color.bgHoverLight,
      'backgroundTransparent': mergedTokens.color.transparentLight,
      'borderColor': mergedTokens.color.neutral4Light,
      'borderColorHover': mergedTokens.color.neutral5Light,
      'borderColorPress': mergedTokens.color.borderActiveLight,
      'borderColorFocus': mergedTokens.color.borderActiveLight,
      'color': mergedTokens.color.textLight,
      'colorHover': mergedTokens.color.textLight,
    },
    dark: {
      ...themes.dark,
      ...darkColors,

      // override default theme
      'background': mergedTokens.color.bgAppDark,
      'backgroundHover': mergedTokens.color.bgHoverDark,
      'backgroundPress': mergedTokens.color.bgActiveDark,
      'backgroundFocus': mergedTokens.color.neutral5Dark,
      'backgroundTransparent': mergedTokens.color.transparentDark,
      'borderColor': mergedTokens.color.neutral4Dark,
      'borderColorHover': mergedTokens.color.neutral5Dark,
      'borderColorPress': mergedTokens.color.borderActiveDark,
      'borderColorFocus': mergedTokens.color.borderActiveDark,
      'color': mergedTokens.color.textDark,
      'colorHover': mergedTokens.color.textDark,
    },
  },

  tokens: mergedTokens,

  media: createMedia({
    sm: { maxWidth: 639 },
    gtSm: { minWidth: 640 },
    md: { maxWidth: 767 },
    gtMd: { minWidth: 768 },
    lg: { maxWidth: 1023 },
    gtLg: { minWidth: 1024 },
    xl: { maxWidth: 1279 },
    gtXl: { minWidth: 1280 },
    '2xl': { maxWidth: 1535 },
    'gt2xl': { minWidth: 1536 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
  disableSSR: true,
});

export type IAppConfig = typeof config;

declare module 'tamagui' {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`

  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/naming-convention
  interface TamaguiCustomConfig extends IAppConfig {}

  // override groupNames
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface TypeOverride {
    groupNames(): 'nftItem';
  }
}

export default config;
