import { NavLink } from 'react-router-dom';

import styles from './layout.module.css';

/* eslint-disable-next-line */
export interface LayoutProps {
  children: React.ReactNode
}

function Layout({children}: LayoutProps) {
  return (
    <div className={styles['layout']}>
      <div>
        <nav className={styles["navbar"]}>
          <h1>
            TCKTNG
          </h1>
          <div className={styles["navbar-links"]}>
            <NavLink  to="/" className={styles["nav-link"]}>
              TICKETS
            </NavLink>
          </div>
        </nav>
      </div>
      <main className={styles['layout-container']}>
        {children}
      </main>
    </div>
  )
}

export default Layout;
