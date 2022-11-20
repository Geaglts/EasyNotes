import styles from '@styles/Components/skeletons/UserNote.module.scss';

const UserNote = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title} />
      <div className={styles.content} />
      <div className={styles.icons}>
        <div className={styles.icon} />
        <div className={styles.icon} />
        <div className={styles.icon} />
      </div>
    </div>
  );
};

export default UserNote;
