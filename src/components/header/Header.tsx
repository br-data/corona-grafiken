import React from "react";

import { Logo } from "./Logo";
import {
  HeaderWrapper,
  LogoWrapper,
  Title,
  Description,
  OrganizationLink,
  TabGroup,
  Tab,
} from "./styles.Header";

interface HeaderProps {
  title?: string;
  description?: string;
  organization?: string;
  organizationLink?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  organization,
  organizationLink,
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
        <OrganizationLink href={organizationLink}>
          {organization}
        </OrganizationLink>
        {React.Children.map(children, (child) => (
          <Tab>{child}</Tab>
        ))}
      </TabGroup>
    </HeaderWrapper>
  );
};
