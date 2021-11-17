import styled from "styled-components";

export const Content = styled.section`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

export const Controls = styled.section`
  margin: .5rem 1rem 0;
  display: flex;
  flex-wrap: wrap;
`

export const Footer = styled.footer`
  margin: 0 1rem 1rem;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 900px)  {
    justify-content: space-around;
  }
`;
