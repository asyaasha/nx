import {render,  waitFor, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {ticketsApi} from '../../services/ticketsApi';
import {usersApi} from '../../services/usersApi';
import {setupApiStore} from '../../test-utils';

import Tickets from './tickets';
import { ticketsMock } from '../../__mock__';


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const handlers = [
  rest.get('/api/tickets', (_:any, res:any, ctx:any) => {
    return res(ctx.status(200), ctx.json(ticketsMock), ctx.delay(10))
  })
]

const server = setupServer(...handlers)


// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

const storeRef = setupApiStore({...usersApi, ...ticketsApi}, { });

const TicketsWithProvider = (
  <Provider store={storeRef.store}>
    <Tickets users={[]} />
  </Provider>
);


describe('Tickets', () => {
  it('should render successfully', async() => {
    const {container} = render(TicketsWithProvider)
    expect(container).toBeTruthy();
  });

  it('should render the page after loading and show all the data', async() => {
    const {container} = render(TicketsWithProvider)
    expect(container).toHaveTextContent('Loading...');

    await waitFor(() => {
      expect(screen.getByText("Tickets")).toBeInTheDocument();
      expect(screen.getAllByText("ID:").length).toBe(ticketsMock.length);
    });
  });
});
