import {useCallback, useState, useMemo} from 'react';

import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';

import TicketsList from '../tickets-list/tickets-list';
import AddTicket from '../add-ticket/add-ticket';
import Select from '../select/select';
import { useGetTicketsQuery } from '../services/ticketsApi';
import {matchesStatus} from '../utils';
import {STATUS_FILTER_OPTIONS} from '../constants';

import type { SelectProps } from '../select/select';

export function Tickets() {
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
      <TicketsList tickets={filteredTickets} />
    </div>
  );
}

export default Tickets;
