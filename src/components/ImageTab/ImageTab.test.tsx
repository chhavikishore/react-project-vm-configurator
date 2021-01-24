import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ImageTab from './ImageTab';

describe('<ImageTab />', () => {
  test('it should mount', () => {
    render(<ImageTab />);
    
    const imageTab = screen.getByTestId('ImageTab');

    expect(imageTab).toBeInTheDocument();
  });
});