import { render } from '@testing-library/react';

import AddTicket from './add-ticket';

describe('AddTicket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddTicket />);
    expect(baseElement).toBeTruthy();
  });
});
