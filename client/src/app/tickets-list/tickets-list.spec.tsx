import { render } from '@testing-library/react';

import TicketsList from './tickets-list';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TicketsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketsList users={[]} tickets={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
