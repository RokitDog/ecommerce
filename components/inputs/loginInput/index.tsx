import styles from './styles.module.scss';
import {BiUser} from 'react-icons/bi';
import {SiMinutemailer} from 'react-icons/si';
import {IoKeyOutline} from 'react-icons/io5';
import {useField, ErrorMessage} from 'formik';
import {ChangeEvent} from 'react';

type Props = {
  icon: string;
  placeholder: string;
  type: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function LoginInput(props: Props) {
  const [field, meta] = useField(props);
  console.log(field);
  return (
    <div className={`${styles.input} ${meta.touched && meta.error ? styles.error : ''}`}>
      {props.icon === 'user' ? (
        <BiUser />
      ) : props.icon === 'email' ? (
        <SiMinutemailer />
      ) : props.icon === 'password' ? (
        <IoKeyOutline />
      ) : (
        ''
      )}
      <input {...field} {...props} />
      {meta.touched && meta.error && (
        <div className={styles.error__popup}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}

export default LoginInput;
