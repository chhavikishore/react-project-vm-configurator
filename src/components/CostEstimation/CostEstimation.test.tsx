import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CostEstimation from './CostEstimation';

describe('<CostEstimation />', () => {
  test('it should mount', () => {
    render(<CostEstimation />);
    
    const costEstimation = screen.getByTestId('CostEstimation');

    expect(costEstimation).toBeInTheDocument();
  });
});