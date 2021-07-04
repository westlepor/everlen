import styled from "styled-components"

import { colors, typography } from "@everlywell/leaves"

const Option = styled.button`
  display: flex;
  font-family: ${typography.type.nexa};
  background: white;
  border: none;
  width: 100%;
  font-weight: normal;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
  padding: 4px 0 4px 10px;
  color: ${colors.gray4};

  :hover,
  :focus {
    outline: none;
    background: ${colors.green0};
  }
`

const DropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid ${colors.green4};
  border-radius: 2px;
  font-family: ${typography.type.nexa};
  font-weight: 600;
  cursor: pointer;
  padding: 4px 10px;
  text-decoration: none;
  transition: 0.2s;

  :hover,
  :focus {
    outline: none;
    border-color: ${colors.green4};
    background-color: rgba(214, 235, 221, 0.2);
  }
`

const ArrowWrapper = styled.span`
  margin-left: 7.8px;
`

const Text = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.green5};
`

const Title = styled.div`
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.45px;
`

const Description = styled.div`
  font-size: 16px;
  line-height: 1.75;
`

export { Text, DropdownTrigger, ArrowWrapper, Option, Title, Description }
