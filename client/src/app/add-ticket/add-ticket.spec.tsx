import {render, screen,fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';

import {ticketsApi} from '../services/ticketsApi';
import {usersApi} from '../services/usersApi';
import {setupApiStore} from '../test-utils';
import AddTicket from './add-ticket';

const storeRef = setupApiStore({...usersApi, ...ticketsApi}, { });

const AddTicketWithProvider = (
  <Provider store={storeRef.store}>
    <AddTicket />
  </Provider>
);

const mockSubmit = jest.fn((description) => {
  return Promise.resolve({ description });
});

describe('AddTicket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(AddTicketWithProvider);
    expect(baseElement).toBeTruthy();
  });

  it('should render input and set the value corectly ', async() => {
    const newTicketDescription = "new ticket description";

    render(AddTicketWithProvider);
    fireEvent.input(screen.getByRole("textbox"), {
      target: {
        value: newTicketDescription,
      }
    });
    fireEvent.submit(screen.getByRole("button"));

    expect(mockSubmit).not.toBeCalled();
    expect((screen.getByRole("textbox") as HTMLTextAreaElement).value).toBe(newTicketDescription);
  });
});
