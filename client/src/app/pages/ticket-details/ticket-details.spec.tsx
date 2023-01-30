import {render, waitFor, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import {ticketsApi} from '../../services/ticketsApi';
import {usersApi} from '../../services/usersApi';
import {setupApiStore} from '../../test-utils';
import TicketDetails from './ticket-details';
import { usersMock, ticketsMock } from '../../__mock__';

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useParams: () => ({
    id: '1',
  }),
  useRouteMatch: () => ({ url: '/1' }),
}));

const handlers = [
  rest.get(`/api/tickets/1`, (_:any, res:any, ctx:any) => {
    return res(ctx.status(200), ctx.json(ticketsMock[0]), ctx.delay(10))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeEach(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

const storeRef = setupApiStore({...usersApi, ...ticketsApi}, { });

const TicketDetailsWithProvider = (
  <Provider store={storeRef.store}>
      <TicketDetails users={usersMock} />
    </Provider>
);


describe('Tickets', () => {
  it('should render successfully', async() => {
    const {container} = render(TicketDetailsWithProvider)
    expect(container).toBeTruthy();
  });

  it('should render the page after loading', async() => {
    const {container} = render(TicketDetailsWithProvider)
    expect(container).toHaveTextContent('Loading...');

    await waitFor(() => {
      expect(screen.getByText("Ticket Details")).toBeInTheDocument();
    });
  });


});
