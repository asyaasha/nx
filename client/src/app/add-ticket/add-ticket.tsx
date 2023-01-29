import styles from './add-ticket.module.css';

/* eslint-disable-next-line */
export interface AddTicketProps {}

export function AddTicket(props: AddTicketProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AddTicket!</h1>
    </div>
  );
}

export default AddTicket;
