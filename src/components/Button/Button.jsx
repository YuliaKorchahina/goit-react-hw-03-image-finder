import styles from 'styles.module.css';

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className={styles.Button}>
      <span className="button-label">Load more</span>
    </button>
  );
};
