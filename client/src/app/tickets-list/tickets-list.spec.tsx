import { render } from '@testing-library/react';

import TicketsList from './tickets-list';

describe('TicketsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketsList />);
    expect(baseElement).toBeTruthy();
  });
});
