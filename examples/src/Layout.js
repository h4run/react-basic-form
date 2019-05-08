import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

export const Row = ({ children }) => (
  <Flex mx={[0, 0, -4]} flexWrap="wrap">
    {children}
  </Flex>
);
export const Column = ({ children }) => (
  <Box px={[0, 0, 4]} mb={[3, 3, 4]} width={[1, 1, 1 / 2]}>
    {children}
  </Box>
);

const Layout = styled.div`
  width: 900px;
  margin: 4vh auto;
  h1 {
    margin-bottom: 25px;
    text-align: center;
  }

  button[type='submit'] {
    background-color: #666;
    color: white;
    border: none;
    font-weight: bold;
    transition: 0.3s;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    padding: 0 20px;
    appearance: none;
    background-color: #203260;
    display: block;
    width: 220px;
    height: 53px;
    border-radius: 4px;
    &:hover {
      text-decoration: none;
    }
  }

  .error-message {
    position: absolute;
    color: #cc0000;
    margin: 2px 0 0 5px;
    font-size: 0.85em;
  }

  .form-element {
    position: relative;

    input:not([type='checkbox']):not([type='radio']),
    select,
    textarea {
      border: 1px solid #ccc;
      padding: 15px 19px;
      width: 100%;
      height: 53px;
      appearance: none;
      background-color: white;
    }
    textarea {
      height: auto;
    }
    select {
      padding-right: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      border-radius: 0;
      &:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
      }
    }
    .input-wrap {
      [class^='icon-'] {
        position: absolute;
        right: 19px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
      }
    }
    & > label {
      text-transform: uppercase;
      color: #222;
      font-weight: 400;
      margin-bottom: 5px;
      display: inline-block;
      margin-left: 18px;
    }

    .inline-items {
      .item-wrap {
        margin-top: 15px;
      }
      .item {
        top: 1px;
        display: inline-flex;
        align-items: center;
        flex-direction: row-reverse;
        position: relative;
        cursor: pointer;
        user-select: none;

        &.radio .checkmark {
          border-radius: 50%;
          &:after {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
          }
        }
        &.checkbox .checkmark {
          &:after {
            margin-top: -2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
          }
        }

        .checkmark {
          height: 24px;
          width: 24px;
          background-color: #ddd;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s;
          will-change: background-color;
          &:after {
            content: '';
            position: absolute;
            opacity: 0;
            transition: opacity 0.2s;
            will-change: opacity;
          }
        }
        &:hover input ~ .checkmark {
          background-color: #ccc;
        }
        input {
          position: absolute;
          opacity: 0;

          &:checked ~ .checkmark {
            background-color: #203260;
            &:after {
              opacity: 1;
            }
          }
        }
      }

  }
`;

export default Layout;
