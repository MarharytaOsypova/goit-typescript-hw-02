import styles from './LoadMoreBtn.module.css';

interface onClickProp{
onClick: () => void  
}


const LoadMoreBtn = ({ onClick}:onClickProp) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;