import {useCallback, useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import styles from './ticket-details.module.css';
import Select from '../select/select';
import {useGetTicketByIdQuery, useAssignTicketMutation } from '../services/ticketsApi';

import type {User} from '@acme/shared-models';
import type { Option, SelectProps } from '../select/select';

/* eslint-disable-next-line */
export interface TicketDetailsProps {
  users: User[];
}

export function TicketDetails({users = []}: TicketDetailsProps) {
  const { id: paramId } = useParams<{id: string}>();
  const [selectedUser, setOption] = useState("");
  const onItemChanged = useCallback((id:string) => setOption(id), [setOption]);

  // redefining id because param returns string | undefined type
  const ticketId = paramId as string;
  const {data: ticket, isLoading} = useGetTicketByIdQuery(ticketId);
  const [assignTicket, {isLoading: isAssigning}] = useAssignTicketMutation();

  useEffect(() => {
    if (selectedUser) {
      assignTicket(
        {userId: selectedUser, ticketId},
      );
    }
  }, [selectedUser]);

  // handle loading state
  if (isLoading) return <div>Loading...</div>
  if (!ticket) return <div>No ticket found</div>

  const {id, description, assigneeId, completed} = ticket;
  const status = completed ? 'Completed' : 'Open';

  const selectProps: SelectProps = {
    options: [
      { id: '', name: 'select..' },
      ...users as Option[],
    ],
    name: 'Assign To',
    value: selectedUser,
    updateValue: onItemChanged,
  };

  return (
    <div className={styles['container']}>
      <h2>Ticket Details</h2>
      <Select {...selectProps} />
      <div className={styles['ticket-detail']} key={id}>
        <div>ID: {id}</div>
        <div>Description: {description}</div>
        <div>Assigned To: {assigneeId}</div>
        <div>Status: {status}</div>
      </div>
      {isAssigning && <div>Assigning...</div>}
    </div>
  );
}

export default TicketDetails;
