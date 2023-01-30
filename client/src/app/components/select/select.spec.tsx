import { render } from '@testing-library/react';

import Select from './select';

xdescribe('Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Select />);
    expect(baseElement).toBeTruthy();
  });
});
