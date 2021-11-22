import styled from "styled-components";

import { appColors } from "../../config/colors";

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  background: ${appColors.headerBackground};
  color: ${appColors.headerFontPrimary};
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 100%;
  background: ${appColors.headerTabBackground};
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  margin: 0 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled.span`
  font-weight: 300;
`;

export const OrganizationLink = styled.a`
  color: ${appColors.fontSecondary};
  font-size: 18px;
  font-weight: 300;
  margin: 0 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 650px) {
    display: none;
  }
`;

export const TabGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  height: 100%;
`;

export const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
  background: ${appColors.headerTabBackground};
  border-right: 1px solid ${appColors.headerBackground};

  &:last-child {
    border-right: none;
  }
`;
