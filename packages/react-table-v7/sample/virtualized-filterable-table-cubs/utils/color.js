import { darken as polishedDarken, saturate, shade } from 'polished';

// Neutral Color Palette

export const white = '#FFFFFF'; // Backgrounds and surfaces of most UI
export const gray02 = '#F7F8F8'; // UI Navigation and related content panels—drawers that come in from the sides of the screen
export const gray03 = '#EFF0F0';
export const gray05 = '#E0E2E2'; // Component borders — borders for UI elements with shadows, such as dropdowns or modals, borders of panels
export const gray10 = '#D0D3D3';
export const gray15 = '#BDC0C0'; // Rule lines in tables
export const gray20 = '#A9ADAD';
export const gray25 = '#9DA1A1';
export const gray30 = '#878A8C'; // Form input border
export const gray35 = '#676B6E';
export const gray40 = '#53575B'; // Secondary Text
export const gray80 = '#212225'; // Primary Text
export const gray90 = '#0D0F10';
export const black = '#000000';

export const gray30Dark = darken(gray30); // TODO: Replace with a neutral color from above

// GVSG Color Palette

export const yellow01 = '#FEF8D9';
export const yellow05 = '#FFD61A';
export const yellow10 = '#FFB81C';
export const yellow15 = '#FAA61A';
export const yellow20 = '#F68D2E';
export const yellow25 = '#E66A1F';
export const yellow30 = '#D45311';
export const yellow35 = '#974A07';
export const yellow40 = '#674730';

export const red01 = '#FFE8EB';
export const red05 = '#FDA1B2';
export const red10 = '#FC4E6D';
export const red15 = '#E10F5A';
export const red20 = '#BD0057';
export const red25 = '#A6004E';
export const red30 = '#8F124A';
export const red35 = '#7D003F';
export const red40 = '#6E0D33';

export const blue01 = '#E9F7FC';
export const blue05 = '#B0EEFC';
export const blue10 = '#7DE3F4';
export const blue15 = '#49CCE6';
export const blue20 = '#01B6D1';
export const blue25 = '#007DA5';
export const blue30 = '#006184';
export const blue35 = '#005175';
export const blue40 = '#003057';

export const green01 = '#EFF7EA';
export const green05 = '#D3E952';
export const green10 = '#BED21E';
export const green15 = '#93C742';
export const green20 = '#6DB344';
export const green25 = '#50A83E';
export const green30 = '#318D43';
export const green35 = '#206B3F';
export const green40 = '#235C35';

// Highlight Color Palette

export const highlightBlue = '#E9F7FC';
export const highlightCyan = '#DDFAFB';
export const highlightGreen = '#EFF7EA';
export const highlightYellow = '#FFF8E9';
export const highlightAmber = '#FFEFDE';
export const highlightRed = '#FEE8E7';
export const highlightMagenta = '#FEE8FC';
export const highlightViolet = '#F3E9FF';

// Interactive UI Palette

export const info01 = '#E9F7FC';
export const info10 = '#20ABD7';
export const info40 = '#157493';
export const info60 = '#105970';

export const confirmation01 = '#EFF7EA';
export const confirmation10 = '#A3D287';
export const confirmation40 = '#74BB49';
export const confirmation60 = '#375A22';

export const warning01 = '#FFF8E9';
export const warning10 = '#FFD072';
export const warning40 = '#FFAE0C';
export const warning60 = '#8F4200';

export const danger01 = '#FEE8E7';
export const danger10 = '#FC7473';
export const danger40 = '#DC3838';
export const danger60 = '#B00504';

// Lagacy Colors

export const red500 = '#fc4338'; /* NAME: "Danger Will Robinson" */
export const redMatte200 = '#f2dede';
export const redMatte250 = '#ebccd1';
export const redMatte600 = '#d2705a'; /* NAME: "Sauron's Eye" */
export const redDull500 = '#a94442';

export const green500 = '#5cb85c'; /* NAME: "Success Green" */
export const green500Bright = brighten(green500);
export const green800 = '#417505'; /* NAME: "Green Crayon" */
export const greenMatte100 = '#dff0d8';
export const greenMatte150 = '#d6e9c6';
export const greenMatte300 = '#cceaaf';
export const greenMatte800 = '#3c763d';

export const blue100 = '#dff5ff'; /* NAME: "Blue Highlighter" */
export const blue200 = '#D1F1FF';
export const blue500 = '#5381ac'; /* NAME: "Header Blue" */
export const blue600 = '#3c729f';
export const blue700 = '#125687'; /* NAME: "Header Selected" */

export const blueBright400 = '#98caff'; /* NAME: "Info Button Blue" */
export const blueBright500 = '#73b5fb'; /* NAME: "Not so Boring Blue" */
export const blueBright800 = '#3477bb'; /* NAME: "Button Blue" */
export const blueDull100 = '#d9edf7';
export const blueDull200 = '#bce8f1';
export const blueDull600 = '#31708f';
export const blueVibrant500 = '#24d2fb'; /* NAME: "Vibrant Border Blue" */

export const yellow100 = '#fffcdc'; /* NAME: "Yellow Highlighter" */
export const yellow300 = '#fff58b'; /* NAME: "Yellow Border" */
export const yellow500 = '#f3ca02'; /* NAME: "Puke Yellow" */
export const yellowMatte600 = '#e0d69c'; /* NAME: "Ugly Yellow Border" */
export const yellowDull100 = '#fcf8e3';
export const yellowDull150 = '#faebcc';
export const yellowDull800 = '#b1874a';

//------------------------

// region Helpers

export function brighten(color) {
  return polishedDarken(0.075, saturate(0.15, color));
}

export function darken(color) {
  return shade(0.85, polishedDarken(0.15, color));
}

// endregion
