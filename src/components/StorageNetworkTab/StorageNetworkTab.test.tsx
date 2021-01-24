import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StorageNetworkTab from './StorageNetworkTab';

describe('<StorageNetworkTab />', () => {
  test('it should mount', () => {
    render(<StorageNetworkTab />);
    
    const storageNetworkTab = screen.getByTestId('StorageNetworkTab');

    expect(storageNetworkTab).toBeInTheDocument();
  });
});