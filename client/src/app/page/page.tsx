import styles from './page.module.css';

/* eslint-disable-next-line */
export interface PageProps {}

export function Page(props: PageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Page!</h1>
    </div>
  );
}

export default Page;
