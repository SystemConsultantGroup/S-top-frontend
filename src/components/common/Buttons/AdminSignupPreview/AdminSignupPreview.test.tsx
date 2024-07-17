import { render, screen } from '@testing-library/react';
import { AdminSignupPreview } from './AdminSignupPreview';
import '@testing-library/jest-dom';

describe('AdminSignupPreview component', () => {
  it('renders correctly with the given props', () => {
    render(<AdminSignupPreview name="John Doe" email="john.doe@example.com" role="Administrator" />);
    expect(screen.getByText('Admin Signup Preview')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Administrator')).toBeInTheDocument();
  });
});
