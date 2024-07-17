import { render, screen, fireEvent } from '@testing-library/react';
import { RadioButton } from './RadioButton';
import '@testing-library/jest-dom';

describe('RadioButton component', () => {
  it('renders correctly with the given props', () => {
    render(<RadioButton label="Option One" name="example" value="optionOne" checked={false} onChange={() => {}} />);
    expect(screen.getByLabelText('Option One')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<RadioButton label="Option One" name="example" value="optionOne" checked={false} onChange={handleChange} />);
    const radioButton = screen.getByLabelText('Option One');
    fireEvent.click(radioButton);
    expect(handleChange).toHaveBeenCalled();
  });
});
