import { render, screen, fireEvent } from '@testing-library/react';
import { RadioButton } from './RadioButton';
import '@testing-library/jest-dom';

describe('RadioButton component', () => {
  it('renders correctly and toggles state on click', () => {
    render(<RadioButton defaultChecked={false} />);

    const radioButton = screen.getByRole('button');
    expect(radioButton).toBeInTheDocument();
    expect(radioButton).not.toHaveClass('checked');

    fireEvent.click(radioButton);
    expect(radioButton).toHaveClass('checked');

    fireEvent.click(radioButton);
    expect(radioButton).not.toHaveClass('checked');
  });
});
