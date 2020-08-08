import React from 'react';
import styled from 'styled-components';
import Font from '../theme/font';

const StyledHeader = styled.div`
  text-align: center;
  font-size: ${Font.titleFont}px;
`;

function Header() {
  return <StyledHeader></StyledHeader>;
}

export default Header;
