import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={`${styles.spinner} ${styles.center}`}>
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className={styles['spinner-blade']}></div>
      ))}
    </div>
  );
};

export default Loader;
