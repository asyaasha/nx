import { useNavigate } from 'react-router-dom';

import styles from './tickets-list.module.css';

import type { Ticket, User } from '@acme/shared-models';

/* eslint-disable-next-line */
export interface TicketsListProps {
  tickets: Ticket[],
  users: User[],
}

export function TicketsList({tickets, users}: TicketsListProps) {
  const navigate = useNavigate();

  const mappedUsers = users?.reduce((current: any, next) => {
    return {
      ...current,
      [next.id]: next.name
    };
  }, {})

  // open ticket details page
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
              <div className={styles['grid-item']}><span>ID:</span> {t.id}</div>
              <div className={styles['grid-item']}>{t.description}</div>
              <div className={styles['grid-item']}>Assignee: {t.assigneeId ? mappedUsers[t.assigneeId] : 'not assigned'}</div>
              <div className={styles['grid-item']}><span className={( t.completed ?  styles['completed'] : styles['open'] )}>{t.completed ? 'Completed' : 'Open'}</span></div>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default TicketsList;
