import React from "react";

import { Logo } from "./Logo";
import {
  HeaderWrapper,
  LogoWrapper,
  Title,
  Description,
  TabGroup,
  Tab,
} from "./styles.Header";

interface HeaderProps {
  title?: string;
  description?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Title>
        {title} {""}
        <Description>| {description}</Description>
      </Title>
      <TabGroup>
        {React.Children.map(children, (child) => (
          <Tab>{child}</Tab>
        ))}
      </TabGroup>
    </HeaderWrapper>
  );
};
