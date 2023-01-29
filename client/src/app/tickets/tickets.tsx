import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';

import TicketsList from '../tickets-list/tickets-list';
import { useGetTicketsQuery } from '../services/ticketsApi';

export interface TicketsProps {}

export function Tickets(props: TicketsProps) {
  const { data: tickets, error, isLoading } = useGetTicketsQuery();

  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      {isLoading && <span>Loading...</span>}
      {!isLoading && tickets ? (
        <TicketsList tickets={tickets} />
      ) : (
        <span>No tickets added yet...</span>
      )}
    </div>
  );
}

export default Tickets;
