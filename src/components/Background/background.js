import React from 'react';
import styled from 'styled-components';
import logo from '../../logo_ipb.png';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #501238; /* Fallback color */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  overflow: hidden;
  z-index: -1; /* Ensure the background is behind other elements */
`;

const Logo = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

function Background() {
    const items = new Array(100).fill(null); // Adjust the number based on your requirement

    return (
        <BackgroundContainer>
            {items.map((_, index) => (
                <Logo key={index} />
            ))}
        </BackgroundContainer>
    );
}

export default Background;
