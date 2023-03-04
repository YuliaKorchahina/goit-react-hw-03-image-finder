import styles from 'styles.module.css'

export const Button = ({handleLoad}) => {
    return (
        <button   onClick={handleLoad} type="submit" className={styles.Button}>
            <span className="button-label">Load more</span>
          </button>
    )
}

