import styles from './WillayDog.module.css'

/**
 * Animación decorativa "perrito" — adaptada de Uiverse.io (autor: elijahgummer).
 * https://uiverse.io/elijahgummer
 * Puramente decorativa (aria-hidden), no aporta información.
 */
export default function WillayDog() {
  return (
    <div className={styles.main} aria-hidden="true">
      <div className={styles.dog}>
        <div className={styles.dog__paws}>
          <div className={`${styles['dog__bl-leg']} ${styles.leg}`}>
            <div className={`${styles['dog__bl-paw']} ${styles.paw}`}></div>
            <div className={`${styles['dog__bl-top']} ${styles.top}`}></div>
          </div>
          <div className={`${styles['dog__fl-leg']} ${styles.leg}`}>
            <div className={`${styles['dog__fl-paw']} ${styles.paw}`}></div>
            <div className={`${styles['dog__fl-top']} ${styles.top}`}></div>
          </div>
          <div className={`${styles['dog__fr-leg']} ${styles.leg}`}>
            <div className={`${styles['dog__fr-paw']} ${styles.paw}`}></div>
            <div className={`${styles['dog__fr-top']} ${styles.top}`}></div>
          </div>
        </div>

        <div className={styles.dog__body}>
          <div className={styles.dog__tail}></div>
        </div>

        <div className={styles.dog__head}>
          <div className={styles.dog__snout}>
            <div className={styles.dog__nose}></div>
            <div className={styles.dog__eyes}>
              <div className={styles['dog__eye-l']}></div>
              <div className={styles['dog__eye-r']}></div>
            </div>
          </div>
        </div>

        <div className={styles['dog__head-c']}>
          <div className={styles['dog__ear-l']}></div>
          <div className={styles['dog__ear-r']}></div>
        </div>
      </div>
    </div>
  )
}
