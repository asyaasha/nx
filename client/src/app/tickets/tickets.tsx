import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';

import TicketsList from '../tickets-list/tickets-list';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      {props.tickets ? (
        <TicketsList tickets={props.tickets} />
      ) : (
        <span>No tickets added yet...</span>
      )}
    </div>
  );
}

export default Tickets;
