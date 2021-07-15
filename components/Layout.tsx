import Header from './Header';
import styles from './Layout.module.css';

/**
 * @todo Layout for home and admin
 */
export default function Layout({ title, children }) {
  return (
    <div className={styles.container}>
      <Header title={title} />
      <main>{children}</main>
    </div>
  );
}
