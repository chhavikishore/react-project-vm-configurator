import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StorageCard from './StorageCard';

describe('<StorageCard />', () => {
  test('it should mount', () => {
    render(<StorageCard />);
    
    const storageCard = screen.getByTestId('StorageCard');

    expect(storageCard).toBeInTheDocument();
  });
});