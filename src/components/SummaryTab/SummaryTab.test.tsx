import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SummaryTab from './SummaryTab';

describe('<SummaryTab />', () => {
  test('it should mount', () => {
    render(<SummaryTab />);
    
    const summaryTab = screen.getByTestId('SummaryTab');

    expect(summaryTab).toBeInTheDocument();
  });
});