import styles from './styles.module.scss';
import DotLoaders from 'react-spinners/DotLoader';

type Props = {
  loading: boolean;
};

function DotLoader({loading}: Props) {
  return (
    <div className={styles.loader}>
      <DotLoaders color="#2f82ff" loading={loading} />
    </div>
  );
}

export default DotLoader;
