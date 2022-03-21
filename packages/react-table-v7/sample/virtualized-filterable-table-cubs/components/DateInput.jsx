import React from 'react';
import ReactDatePicker from 'react-date-picker';
import styled, { css } from 'styled-components';

import Icon from './Icon';
import { inputStyles } from './Input';

const calendarButtonStyles = css`
  padding: 4px;
  transition: 100ms;
  background: transparent;
`;
const enabledInactiveCalendarTileAndButtonStyles = css`
  &:not(:disabled) {
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.color.primary};
      background: ${({ theme }) => theme.color.highlight};
    }
  }
`;
const calendarStyles = css`
  width: 280px; /* NOTE: Magic Number */
  border: 0;
  .react-calendar {
    border: 0;
    background: white;
    box-shadow: 0 0 4px 1px rgb(14 30 37 / 6%), 0 8px 16px 0 rgb(14 30 37 / 20%);
    border-radius: 4px;
    overflow: hidden;
    font-family: 'Open Sans', sans-serif;
    button {
      font-family: 'Open Sans', sans-serif;
    }
  }
  & button {
    cursor: pointer;
    background: transparent;
    border: none;
    transition: 100ms;

    &:focus {
      outline: none;
    }
  }

  & .react-calendar__navigation {
    margin: 8px;
    height: 32px;
    gap: 4px;
    button {
      border-radius: 32px;
      ${({ disabled }) =>
        !disabled && enabledInactiveCalendarTileAndButtonStyles};
    }
  }

  & .react-calendar__navigation__label {
    ${calendarButtonStyles};
    font-weight: 600;
  }

  & .react-calendar__tile {
    padding: 3.75px; /* NOTE: Magic Number */
    height: 38px;

    & abbr {
      display: inline-block;
      position: relative;
    }

    &.react-calendar__month-view__days__day {
      position: relative;
      background: transparent;
      &:before {
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        background: ${({ theme }) => theme.color.primaryHighlight};
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        border-radius: 32px;
        transition: 100ms;
      }
    }

    &:not(.react-calendar__tile--active) {
      ${({ disabled, theme }) =>
        !disabled
          ? `
        &:not(:disabled) {
          &:hover,
          &:focus {
            color: ${theme.color.primary};
            &:not(.react-calendar__month-view__days__day) {
              background: ${theme.color.highlight};
            }
            &.react-calendar__month-view__days__day {
              &:before {
                transform: translate(-50%, -50%) scale(1);
              }       
            }
          }
        }
      `
          : ``}
    }
    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.color.disabled};
    }
    &:not(:disabled):not(.react-calendar__tile--active) {
      &.react-calendar__month-view__days__day--weekend:not(:hover) {
        color: ${({ theme }) => theme.color.textPrimary};
      }
      &.react-calendar__month-view__days__day--neighboringMonth:not(:hover) {
        color: ${({ theme }) => theme.color.textPrimaryLight};
      }
      &.react-calendar__tile--now {
        color: ${({ theme }) => theme.color.primary};
      }
    }
    &.react-calendar__tile--active {
      color: ${({ theme }) => theme.color.white};
      &:not(.react-calendar__month-view__days__day) {
        background: ${({ theme }) => theme.color.primary};
      }
      &.react-calendar__month-view__days__day {
        &:before {
          transform: translate(-50%, -50%) scale(1);
          background: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }

  & .react-calendar__navigation__arrow {
    min-width: 32px;
    padding: 0;
    text-align: center;
    font-size: 20px;
    line-height: 24px;

    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.color.disabled};
    }
  }
  & .react-calendar__month-view__weekdays {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    padding: 0 8px;
    gap: 4px;
    .react-calendar__month-view__weekdays__weekday {
      font-weight: 700;
      text-align: center;
      padding: 0 0 4px 0;
      color: ${({ theme }) => theme.color.textPrimaryLight};
      abbr {
        text-decoration: none;
        font-size: 10px;
        letter-spacing: 0.125em;
        text-transform: uppercase;
      }
    }
  }

  & .react-calendar__century-view__decades {
    grid-template-columns: repeat(2, 1fr);
  }
  & .react-calendar__decade-view__years {
    grid-template-columns: repeat(5, 1fr);
  }
  & .react-calendar__year-view__months {
    grid-template-columns: repeat(3, 1fr);
  }
  & .react-calendar__month-view__days {
    grid-template-columns: repeat(7, 1fr);
  }

  & .react-calendar__century-view__decades,
  & .react-calendar__decade-view__years,
  & .react-calendar__year-view__months,
  & .react-calendar__month-view__days {
    padding: 6px;
    display: grid !important;

    button {
      border: 2px solid white;
      border-radius: 32px;
      flex-basis: auto !important;
      max-width: 100% !important;
    }
  }
`;

const StyledDatePicker = styled(ReactDatePicker)`
  .react-date-picker__wrapper {
    ${inputStyles}
    padding-left: 6px;
    .react-date-picker__button {
      border: 0;
      background: transparent;
      padding: 2px 4px;
    }
  }
  .react-date-picker__calendar {
    ${calendarStyles}
  }
`;

const DatePicker = ({ value, onChange }) => {
  return (
    <StyledDatePicker
      onChange={onChange}
      value={value}
      calendarIcon={<Icon type='calendar' size='xs' />}
      clearIcon={<Icon type='cross-mark' size='xs' />}
    />
  );
};

export default DatePicker;
