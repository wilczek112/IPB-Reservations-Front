import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #501238;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  overflow: hidden;
  z-index: -1;
`;

const Logo = styled.div`
  width: 200px;
  height: 200px;
  background-image: url('/logo_ipb.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

function Background() {
    const items = new Array(100).fill(null);

    return (
        <BackgroundContainer>
            {items.map((_, index) => (
                <Logo key={index} />
            ))}
        </BackgroundContainer>
    );
}

export default Background;
