import { Ticket } from '@acme/shared-models';

import styles from './ticket-details.module.css';

/* eslint-disable-next-line */
export interface TicketDetailsProps {
}

export function TicketDetails(props: TicketDetailsProps) {
  const ticket = {id: 1, description: 'description', assigneeId: 2, completed: false} as Ticket; // mock
  const status = ticket.completed ? 'Completed' : 'Open';

  return (
    <div className={styles['container']}>
      <h2>Ticket Details</h2>
      <div className={styles['ticket-detail']} key={ticket.id}>
        <div>ID: {ticket.id}</div>
        <div>Description: {ticket.description}</div>
        <div>Assigned To: {ticket.assigneeId}</div>
        <div>Status: {status}</div>
      </div>
    </div>
  );
}

export default TicketDetails;
