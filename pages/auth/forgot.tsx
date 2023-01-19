import {BiLeftArrowAlt} from 'react-icons/bi';
import Footer from '../../components/footer';
import Header from '../../components/header';
import styles from '../../styles/forgot.module.scss';
import Link from 'next/link';
import CircledIconBtn from '../../components/buttons/circledIconBtn';
import {Form, Formik} from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import {useState} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import DotLoader from '../../components/loaders/dotLoader';

function Forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const emailValidation = Yup.object({
    email: Yup.string()
      .required('Email Address is required')
      .email('Enter a valid email address.'),
  });

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const {data} = await axios.post('/api/auth/forgot', {
        email,
      });
      setSuccess(data.message);
      setError('');
      setLoading(false);
      setEmail('');
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setEmail('');
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
              Forgot your password? <Link href="/"> Login instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => forgotHandler()}
          >
            {form => (
              <Form>
                <LoginInput
                  icon="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={e => setEmail(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Send link" />
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

export default Forgot;
