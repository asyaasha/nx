import { useNavigate } from 'react-router-dom';
import { Ticket } from '@acme/shared-models';

import styles from './tickets-list.module.css';

/* eslint-disable-next-line */
export interface TicketsListProps {
  tickets: Ticket[]
}

export function TicketsList({tickets}: TicketsListProps) {
  const navigate = useNavigate();

  function handleTicketClick(ticketId: number) {
    navigate(`/${ticketId}`)
  }

  return (
    <div className={styles['container']}>
        <ul>
          {tickets.map((t) => (
            <li
              className={styles['ticket']}
              key={t.id}
              onClick={() => handleTicketClick(t.id)}
            >
              Ticket: {t.id}, {t.description}, {t.assigneeId}, {t.completed ? 'Completed' : 'Open'}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default TicketsList;
