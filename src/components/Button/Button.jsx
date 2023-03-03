import styles from 'styles.module.css'

export const Button = (onClick) => {
    return (
        <button  type="submit" className={styles.Button}>
            <span className="button-label">Load more</span>
          </button>
    )
}

// onClick={onClick}