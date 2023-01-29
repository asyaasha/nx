import { useParams } from "react-router-dom";
import { Ticket } from '@acme/shared-models';

import styles from './ticket-details.module.css';
import {useGetTicketByIdQuery  } from '../services/ticketsApi';
/* eslint-disable-next-line */
export interface TicketDetailsProps {
}

export function TicketDetails(props: TicketDetailsProps) {
  const { id: ticketId } = useParams<{id: string}>();
  const {data: ticket, isLoading} = useGetTicketByIdQuery(ticketId!);

  if (isLoading) return <div>Loading...</div>
  if (!isLoading && !ticket) return <div>No ticket found</div>

  const {id, description, assigneeId, completed} = ticket!;
  
  const status = completed ? 'Completed' : 'Open';

  return (
    <div className={styles['container']}>
      <h2>Ticket Details</h2>
      <div className={styles['ticket-detail']} key={id}>
        <div>ID: {id}</div>
        <div>Description: {description}</div>
        <div>Assigned To: {assigneeId}</div>
        <div>Status: {status}</div>
      </div>
    </div>
  );
}

export default TicketDetails;
