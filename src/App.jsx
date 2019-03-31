import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './styles/App.scss';

import Line from './components/Line';

import { network } from './constants';

const MainContainer = styled.main``;

export default () => {
  const [currentLine, setCurrentLine] = useState(0);
  const line = network[currentLine];

  const nextLine = () => setCurrentLine((currentLine + 1) % network.length);
  const previousLine = () => {
    if (currentLine - 1 < 0) setCurrentLine(network.length - 1);
    else setCurrentLine(currentLine - 1);
  };

  const handleLineChange = (event) => {
    const key = event.keyCode || event.which;

    if (key === 38) previousLine();
    else if (key === 40) nextLine();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleLineChange);
    return () => document.removeEventListener('keydown', handleLineChange);
  });

  return (
    <MainContainer>
      <Line {...line} network={network} />
    </MainContainer>
  );
};
