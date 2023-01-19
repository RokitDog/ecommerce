import {BiLeftArrowAlt} from 'react-icons/bi';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import styles from '../../../styles/forgot.module.scss';
import Link from 'next/link';
import CircledIconBtn from '../../../components/buttons/circledIconBtn';
import {Form, Formik} from 'formik';
import LoginInput from '../../../components/inputs/loginInput';
import {useState} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import DotLoader from '../../../components/loaders/dotLoader';
import {GetServerSideProps} from 'next';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {getSession, signIn} from 'next-auth/react';
import Router from 'next/router';

type Props = {
  user_id?: string;
  message?: string;
};

function Reset({user_id, message}: Props) {
  console.log(user_id);
  const [password, setPassword] = useState('');
  const [conf_password, setConf_Password] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required('Please enter your new password.')
      .min(6, 'Password must be atleast 6 characters long.')
      .max(36, 'Password cant be more than 36 characters long'),
    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const {data} = await axios.put('/api/auth/reset', {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };

      await signIn('credentials', options);
      setError('');
      setLoading(false);
      Router.push('/');
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setPassword('');
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
        throw error.response?.data.message;
      }
    }
  };

  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header country={{name: 'serbia', flag: '/test'}} />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password? <Link href="/"> Login instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => resetHandler()}
          >
            {form => (
              <Form>
                <LoginInput
                  icon="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
                <LoginInput
                  icon="password"
                  name="conf_password"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={e => setConf_Password(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Submit" />
              </Form>
            )}
          </Formik>
          <div style={{marginTop: '10px'}}>
            {error && <span className={styles.error}>{error}</span>}
            {success && <span className={styles.success}>{success}</span>}
          </div>
        </div>
      </div>
      <Footer country={{name: 'serbia', flag: '/test'}} />
    </>
  );
}

export default Reset;

export const getServerSideProps: GetServerSideProps = async context => {
  const {query, req} = context;
  const session = await getSession({req});
  if (session) {
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    };
  }
  const token = query.token;
  if (token) {
    const tokenString = token.toString();
    const user_id = jwt.verify(tokenString, process.env.RESET_TOKEN_SECRET!) as JwtPayload;

    return {
      props: {
        user_id: user_id.id,
        message: 'All Good',
      },
    };
  }
  return {props: {message: 'Token Not Detected'}};
};
