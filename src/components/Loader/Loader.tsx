 import ClipLoader from "react-spinners/ClipLoader";
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <ClipLoader color="#00BFFF"  size={80} />
  </div>
);

export default Loader;