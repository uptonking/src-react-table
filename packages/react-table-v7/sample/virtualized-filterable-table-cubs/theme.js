import * as responsive from './utils/responsive';
import * as color from './utils/color';

const spacingFactor = 8;

const getSpacingValue = (s) => {
  // if a number, it is a spacing unit so multiply it by the spacingFactor and append "px"
  if (typeof s === 'number') {
    return `${s * spacingFactor}px`;
  }

  // if true, use main content spacing
  if (typeof s === 'boolean' && s) {
    return APP_MAIN_CONTENT_GUTTER;
  }

  // Most likely a string and is a px, em, rem unit already
  return s;
};

const spacing = (t, r, b, l) => {
  // single value
  if (
    (r === undefined || r === null || r === false) &&
    (b === undefined || b === null || b === false) &&
    (l === undefined || l === null || l === false)
  ) {
    return getSpacingValue(t);
  }

  // x, y pair
  if (
    (b === undefined || b === null || b === false) &&
    (l === undefined || l === null || l === false)
  ) {
    return `${getSpacingValue(t)} ${getSpacingValue(r)}`;
  }

  // top, left/right, bottom shorthand
  if (l === undefined || l === null || l === false) {
    return `${getSpacingValue(t)} ${getSpacingValue(r)}`;
  }

  // top, right, bottom, left
  return `${getSpacingValue(t)} ${getSpacingValue(r)} ${getSpacingValue(
    b,
  )} ${getSpacingValue(l)}`;
};

const APP_MAIN_CONTENT_GUTTER = spacing(2.5);
const INPUT_GUTTER_SIDES = '10px';
const INPUT_ICON_FONT_SIZE = spacing(1.75);
const LARGE_INPUT_ICON_FONT_SIZE = spacing(2.5);

const themeColor = {
  primary: color.info40,
  danger: color.danger40,
  warning: color.warning40,
  success: color.confirmation40,
  text: color.gray40,
  label: color.gray30,
  alternateBackground: color.gray02,
  background: 'white',
  surface: 'white',
  highlight: color.gray03,
  primaryHighlight: color.highlightBlue,
  successHighlight: color.highlightGreen,
  warningHighlight: color.highlightAmber,
  dangerHighlight: color.highlightRed,
  elevatedSurface: 'white',
  elevatedSurfaceHighlight: color.gray03,
  border: color.gray05,
  disabledLight: color.gray05,
  disabled: color.gray10,
  disabledDark: color.gray30,
  lowEmphasis: color.gray30,
  mediumEmphasis: color.gray40,
  highEmphasis: color.gray80,
  buttonText: '#ffffff',
  cancelButtonHover: '#999999',
  cancelButtonActive: '#545455',
  cancelButtonDisabled: '#dadada',
  dangerButton: '#e63939',
  dangerButtonHover: '#f54545',
  dangerButtonActive: '#B00504',
  dangerButtonDisabled: '#FC7473',
  dangerButtonTextDisabled: '#B00504',
  primaryButton: '#177c9c',
  primaryButtonHover: '#1d8caf',
  primaryButtonActive: '#006184',
  primaryButtonDisabled: '#177c9c',
  secondaryButtonHover: '#eeeeee',
  secondaryButtonHoverBorder: '#bfbfbf',
  secondaryButtonActiveBorder: '#989898',
};

const theme = {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  responsive,
  color: {
    ...color,
    ...themeColor,
  },
  inputs: {
    minHeight: spacing(3),
    fontSize: '12px',
    lineHeight: '16px',
    defaultWidth: '175px',
    gutterSides: INPUT_GUTTER_SIDES,
    bgColor: color.white,
    borderColor: color.gray20,
    borderRadius: '2px',
    placeholder: { textColor: themeColor.textPrimaryLight },
    icon: {
      fontSize: INPUT_ICON_FONT_SIZE,
      size: `${INPUT_GUTTER_SIDES} + ${INPUT_ICON_FONT_SIZE}`,
      textColor: color.gray40,
    },
    large: {
      minHeight: spacing(4),
      fontSize: '14px',
      lineHeight: spacing(2),
      icon: {
        fontSize: LARGE_INPUT_ICON_FONT_SIZE,
        size: `${INPUT_GUTTER_SIDES} + ${LARGE_INPUT_ICON_FONT_SIZE}`,
      },
    },
    hover: {
      borderColor: color.gray30,
    },
    disabled: {
      bgColor: themeColor.disabledLight,
      borderColor: themeColor.disabledLight,
      textColor: themeColor.disabledDark,
    },
    focus: {
      borderColor: themeColor.info40,
    },
    invalid: { borderColor: themeColor.errorAccent },
    checkbox: {
      fontSize: '13px',
      size: '1.1em',
      large: { fontSize: '16px' },
    },
    select: {
      dropdownIndicatorFontSize: '1.35em',
      option: {
        gap: spacing(1),
        gutterSides: INPUT_GUTTER_SIDES,
        groupedStartExtraGutter: '10px',
        disabledColor: themeColor.disabled,
        disabledBgColor: 'transparent',
        focusedColor: themeColor.info60,
        focusedBgColor: themeColor.highlight,
        activeBgColor: themeColor.highlightActive,
        selectedBgColor: themeColor.primaryButton,
        selectedTextColor: themeColor.textSecondary,
      },
    },
    textArea: { padding: '5px' },
  },
  button: {
    minHeight: spacing(4),
    paddingTopBottom: '0',
    paddingSides: spacing(2),
    borderRadius: '2px',
    borderWidth: '1px',
    icon: {
      offset: '2px',
      spacing: spacing(0.5),
      fontSize: LARGE_INPUT_ICON_FONT_SIZE,
    },
    small: {
      minHeight: spacing(3),
      paddingTopBottom: spacing(0.5),
      paddingSides: spacing(1.5),
      icon: {
        offset: spacing(0.5),
        spacing: spacing(0.5),
        fontSize: INPUT_ICON_FONT_SIZE,
      },
    },
    default: {
      color: {
        light: '#8c8d8e',
        default: '#545455',
      },
    },
    primary: {
      color: {
        light: color.blue25,
        default: color.blue30,
      },
    },
    success: {
      color: {
        light: color.confirmation40,
        default: color.confirmation60,
      },
    },
    warning: {
      color: {
        light: color.warning40,
        default: color.warning60,
      },
    },
    danger: {
      color: {
        light: color.danger40,
        default: color.danger60,
      },
    },
  },
  buttonGroup: {
    itemMargin: '0.5em',
    itemMarginSmall: '5px',
  },
  zIndex: {
    content: 0,
    pageActions: 100,
    pageLoader: 200,
    appBar: 300,
    navigation: 400,
    dialogs: 500,
    notifications: 600,
    menus: 800,
    popovers: 700,
    tooltips: 900,
  },
  breakpoints: {
    xs: 444,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export default theme;
