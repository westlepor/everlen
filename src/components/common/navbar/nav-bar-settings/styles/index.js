import { Link } from "gatsby"
import styled from "styled-components"

import { Button, H5, colors } from "@everlywell/leaves"

const NavSetting = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  position: relative;
  cursor: pointer;

  .raf-icon-badge {
    padding: 5px 5px 2px 5px;

    &:hover {
      border-radius: 4px;
      background-blend-mode: multiply;
      background-color: #f5faf7;
    }
  }

  .raf-icon-badge + div {
    left: -13px !important;
    top: 45px !important;
    transform: translate(-318px, 0px) !important;
  }

  .raf-icon-badge > .raf-icon-badge__badge {
    display: none;
  }

  .raf-icon-badge > .raf-icon-badge > .raf-icon-badge__badge {
    display: flex;
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`

const NavSettingProfile = styled(NavSetting)`
  margin-left: 10px;
`

const NavSettingMasquerade = styled(NavSetting)``

const SettingContainer = styled.div`
  display: flex;
  padding: 10px;

  :hover {
    border-radius: 4px;
    background-blend-mode: multiply;
    background-color: #f5faf7;
  }
`

const NavItem = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${colors.teal6};
  margin-left: 2rem;
  position: relative;
  cursor: pointer;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: ${props => (props.active === 1 ? "100%" : "0%")};
    content: ".";
    color: transparent;
    background: ${colors.teal6};
    height: 4px;
  }

  :hover {
    color: ${colors.teal6};
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`
const ImageView = styled.div`
  display: flex;
  margin: auto 0;
  width: 24px;
`

const SupportIconWrapper = styled(ImageView)`
  display: flex;
`

const NavSettingName = styled(H5)`
  font-size: 16px;
  color: ${colors.green5};
  margin: auto 0 auto 0.75rem;
`

const NavLinkName = styled(H5)`
  font-size: 16px;
  color: ${colors.green4};
  margin: auto 0;
`

const UserSettings = styled.ul`
  display: ${props => (props.open ? "block" : "none")};
  position: absolute;
  top: 67px;
  right: 0;
  width: 262px;
  padding: unset;
  margin: unset;
  list-style: none;
  z-index: 1;
  background-color: white;
  box-shadow: 0 2px 30px -5px rgba(0, 0, 0, 0.1);

  :after {
    bottom: 100%;
    left: auto;
    left: initial;
    right: 30px;
    border: solid rgba(255, 255, 255, 0);
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: white;
    border-width: 8px;
    margin-left: -8px;
  }
`
const SettingsItemSettings = styled.li`
  padding: 18px 24px;
  background: white;
`

const SettingsItemLogOut = styled.li`
  padding: 16px 24px;
  display: flex;
  color: ${colors.gray5};
  border-top: 2px solid ${colors.green1};
`

const StyledUserName = styled.div`
  font-size: 16px;
  color: ${colors.gray5};
  margin: 0.25rem 0;
`

const StyledUserEmail = styled.div`
  overflow-wrap: anywhere;
  font-size: 14.22px;
  color: ${colors.gray4};
  margin-top: 0.25rem;
  margin-bottom: 10px;
`

const StyledSettingsBtn = styled(Button)`
  border-color: ${colors.green2};
  border-radius: 2px;
  padding: 5px 11px;
  font-size: 16px;

  :hover {
    background-color: rgba(214, 235, 221, 0.2);
    border-color: ${colors.green2};
    color: ${colors.green5} !important;
  }
`

const Icon = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`

export {
  NavSetting,
  NavSettingProfile,
  NavSettingMasquerade,
  SettingContainer,
  NavItem,
  ImageView,
  SupportIconWrapper,
  NavSettingName,
  NavLinkName,
  UserSettings,
  SettingsItemSettings,
  SettingsItemLogOut,
  StyledUserName,
  StyledUserEmail,
  StyledSettingsBtn,
  Icon,
}
