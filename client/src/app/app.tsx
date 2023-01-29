import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import styles from './app.module.css';
import Layout from './layout/layout';
import Tickets from './tickets/tickets';
import TicketDetails from './ticket-details/ticket-details';

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();
      setTickets(await data.json());
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      setUsers(await data.json());
    }

    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className={styles['app']}>
      <Routes>
        <Route path="/" element={<Layout><Tickets tickets={tickets} /></Layout>} />
        <Route path="/:id" element={<Layout><TicketDetails /></Layout>} />
      </Routes>
    </div>
  );
};

export default App;
