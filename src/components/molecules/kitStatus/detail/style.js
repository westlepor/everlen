import styled from "styled-components"

import {
  Row,
  H5,
  Button,
  Container as BaseContainer,
  mediaQueries,
  colors,
} from "@everlywell/leaves"

import TestIcon from "components/atoms/icons/tests"

const Container = styled.div`
  margin-bottom: 24px;
`

const RowWrapper = styled.div`
  padding-left: 42px;
`

const StyledRow = styled(Row)`
  margin: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
`

const StyledTitleRow = styled(Row)`
  margin: 0 0 2px 0;
  align-items: center;
`

const LabelColumn = styled.div`
  width: 181px;
  margin-right: 21px;

  ${mediaQueries.forPhoneOnly} {
    width: 103px;
  }
`

const ValueColumn = styled.div`
  width: calc(100% - 202px);

  ${mediaQueries.forPhoneOnly} {
    width: calc(100% - 124px);
  }
`

const Title = styled.label`
  color: ${colors.teal6};
  font-size: 20.3px;
  font-weight: normal;
  line-height: 1.28;
  letter-spacing: 0.3px;
  margin-left: 10px;
`

const Text = styled(H5)`
  color: ${colors.gray4};
  margin: 0 0 4px 0;
  overflow-wrap: anywhere;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.75;
  letter-spacing: normal;
`

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

const Label = styled(H5)`
  color: ${colors.gray4};
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
`

const StyledTestIcon = styled(TestIcon)`
  width: 32px;
  height: 32px;
  stroke: ${colors.teal6};
`

const BackButton = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.green5};
  font-size: 16px;
  width: 100%;
`

const BackButtonText = styled.div`
  width: 38px;
  height: 24px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.green5};
  margin-left: 7px;
`

const BackArrowLink = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 24px;
`

const CloseArrowLink = styled.div`
  align-self: flex-end;
  cursor: pointer;
  margin-top: 16px;
`

const DesktopPDFButton = styled(Button)`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.27px;
  padding: 0;
  color: ${colors.green5};
  border-radius: 2px;
  border: solid 1px ${colors.green2};
  padding: 3px 10px;

  ${props =>
    props.isDisabled &&
    `
    color: ${colors.gray3};
    border-color: ${colors.gray2};
    box-shadow: none;
    background: white;
    cursor: not-allowed;
    pointer-events: all !important;

    &:hover {
      color: ${colors.gray3};
      border-color: ${colors.gray2};
      background: white;
    }
  `}

  ${mediaQueries.forPhoneOnly} {
    display: none;
  }
`

const MobilePDFButton = styled(DesktopPDFButton)`
  display: none;

  ${mediaQueries.forPhoneOnly} {
    display: block;
  }
`

const Header = styled(Row)`
  margin: 0 0 20px 0;
`

const HeaderContainer = styled(BaseContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0 0 16px 0;
  height: 32px;
`

const HeaderRow = styled(Row)`
  margin: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const KitIDLabel = styled(H5)`
  color: ${colors.green5};
  font-size: 14.2px;
  line-height: 1.13;
  letter-spacing: 3.16px;
  font-weight: 600;
  margin: 0;
`

const KitIDValue = styled.div`
  font-size: 32.4px;
  line-height: 1.23;
  letter-spacing: 0.56px;
  color: ${colors.teal6};
`

const PendingResultsEnteredCountDown = styled.div`
  color: ${colors.red3};
  margin-top: 5px;
  font-weight: 500;
  text-align: right;
  width: 332px;
`

export {
  Container,
  RowWrapper,
  StyledRow,
  StyledTitleRow,
  LabelColumn,
  ValueColumn,
  Title,
  Text,
  CapitalizedText,
  Label,
  StyledTestIcon,
  BackButton,
  BackButtonText,
  CloseArrowLink,
  BackArrowLink,
  DesktopPDFButton,
  MobilePDFButton,
  Header,
  HeaderContainer,
  HeaderRow,
  KitIDLabel,
  KitIDValue,
  PendingResultsEnteredCountDown,
}
