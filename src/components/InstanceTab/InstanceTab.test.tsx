import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InstanceTab from './InstanceTab';

describe('<InstanceTab />', () => {
  test('it should mount', () => {
    render(<InstanceTab />);
    
    const instanceTab = screen.getByTestId('InstanceTab');

    expect(instanceTab).toBeInTheDocument();
  });
});