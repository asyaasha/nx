import { Routes, Route } from 'react-router-dom';

import styles from './app.module.css';
import Layout from './components/layout/layout';
import Tickets from './pages/tickets/tickets';
import TicketDetails from './pages/ticket-details/ticket-details';
import {useGetUsersQuery} from './services/usersApi';

const App = () => {
  const { data: users = [] } = useGetUsersQuery();

  return (
    <div className={styles['app']}>
      <Routes>
        <Route path="/" element={<Layout><Tickets users={users} /></Layout>} />
        <Route path="/:id" element={<Layout><TicketDetails users={users} /></Layout>} />
      </Routes>
    </div>
  );
};

export default App;
