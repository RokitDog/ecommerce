import styles from './styles.module.scss';
import {BiRightArrowAlt} from 'react-icons/bi';

type Props = {
  type: 'button' | 'submit' | 'reset';
  text: string;
  icon?: string;
};

function CircledIconBtn({type, text, icon}: Props) {
  return (
    <button type={type} className={styles.button}>
      {text}
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </div>
    </button>
  );
}

export default CircledIconBtn;
