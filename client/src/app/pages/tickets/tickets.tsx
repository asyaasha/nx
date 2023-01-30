import {useCallback, useState, useMemo} from 'react';

import styles from './tickets.module.css';

import Select from '../../components/select/select';
import TicketsList from './tickets-list/tickets-list';
import AddTicket from './add-ticket/add-ticket';
import { useGetTicketsQuery } from '../../services/ticketsApi';
import {matchesStatus} from '../../utils';
import {STATUS_FILTER_OPTIONS} from '../../constants';

import type { User } from '@acme/shared-models';
import type { SelectProps } from '../../components/select/select';

export function Tickets({users}: {users: User[]}) {
  const [selectedStatus, setOption] = useState("");
  const onItemChanged = useCallback((id:string) => setOption(id), [setOption]);

  const { data: tickets = [], error, isLoading, isSuccess } = useGetTicketsQuery();

  const filteredTickets = useMemo(
    () => matchesStatus(tickets, selectedStatus),
    [tickets, selectedStatus],
  );

  // status filter props
  const selectProps: SelectProps = {
    options: STATUS_FILTER_OPTIONS,
    name: 'Status',
    value: selectedStatus,
    updateValue: onItemChanged,
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error message goes here...</div>;
  if (isSuccess && !tickets.length) return <div>No tickets added yet...</div>;

  return (
    <div className={styles['tickets']}>
      <div className='flex between'>
        <h2>Tickets</h2>
        <AddTicket />
      </div>
      <Select {...selectProps} />
      <TicketsList users={users} tickets={filteredTickets} />
    </div>
  );
}

export default Tickets;
