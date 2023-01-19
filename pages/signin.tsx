import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import {GetServerSideProps} from 'next';
import {countryProps} from '../typings';
import styles from '../styles/signin.module.scss';
import {BiLeftArrowAlt} from 'react-icons/bi';
import Link from 'next/link';
import {Formik, Form} from 'formik';
import LoginInput from '../components/inputs/loginInput';
import {ChangeEvent, useState} from 'react';
import * as Yup from 'yup';
import CircledIconBtn from '../components/buttons/circledIconBtn';
import {getCsrfToken, getProviders, getSession, signIn} from 'next-auth/react';
import Image from 'next/image';
import DotLoader from '../components/loaders/dotLoader';
import Router from 'next/router';

const initialValues = {
  login_email: '',
  login_password: '',
  name: '',
  email: '',
  password: '',
  conf_password: '',
  success: '',
  errors: '',
  login_error: '',
};

interface Props extends countryProps {
  providers: {
    provider: {
      id: string;
      name: string;
      type: string;
      signinUrl: string;
      callbackUrl: string;
    };
  };
  callBackUrl: string;
  csrfToken: string;
}

export default function SignIn({country, providers, callBackUrl, csrfToken}: Props) {
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    errors,
    login_error,
  } = user;
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email address'),
    login_password: Yup.string().required('Please enter a password'),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required('What is your name?')
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed'),
    email: Yup.string()
      .required('Email Address is required')
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required('Enter a combination of at least six numbers, letters and puncuation marks.')
      .min(6, 'Password must be atleast 6 characters long.')
      .max(36, 'Password cant be more than 36 characters long'),
    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const {data} = await axios.post('/api/auth/signup', {name, email, password});
      setUser({...user, errors: '', success: data.message});
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };

        const res = await signIn('credentials', options);
        Router.push('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setUser({...user, success: '', errors: error.response?.data.message});
        throw error.response?.data.message;
      }
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };

    const res = await signIn('credentials', options);
    setUser({...user, success: '', errors: ''});
    setLoading(false);

    if (res?.error) {
      setLoading(false);
      setUser({...user, login_error: res?.error});
    } else {
      return Router.push(callBackUrl || '/');
    }
  };

  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header country={country} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&apos;d be happy to join us! <Link href="/"> Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to one of the best Eshopping services in the world.</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => signInHandler()}
            >
              {form => (
                <Form method="post" action="/api/auth/signin/email">
                  <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
                  <LoginInput
                    icon="email"
                    name="login_email"
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    icon="password"
                    name="login_password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  <div className={styles.forgot}>
                    <Link href="/forget">Forgot password?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            {login_error && <span className={styles.error}>{login_error}</span>}
            <div className={styles.login__socials}>
              <span className={styles.or}>Or Continue with</span>
              <div className={styles.login__socials_wrap}>
                {Object.values(providers).map(provider => {
                  if (provider.name === 'Credentials') {
                    return;
                  }
                  return (
                    <div key={provider.id}>
                      <button className={styles.social__btn} onClick={() => signIn(provider.id)}>
                        <Image
                          src={`/icons/${provider.name}.png`}
                          alt="icon"
                          width={36}
                          height={36}
                          style={{objectFit: 'contain'}}
                        />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>Get access to one of the best Eshopping services in the world.</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {form => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    icon="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    icon="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    icon="password"
                    name="conf_password"
                    type="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>{success && <span className={styles.success}>{success}</span>}</div>
            <div>{errors && <span className={styles.error}>{errors}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.IPREGISTRY_KEY}`)
    .then(res => res.data.location.country)
    .catch(error => console.log(error));

  const providers = await getProviders();

  const {req, query} = context;

  const {callbackUrl} = query;
  const callBackUrl = callbackUrl;
  const session = await getSession({req});

  if (session) {
    return {
      redirect: {
        destination: callBackUrl,
      },
      props: {
        country: {name: data.name, flag: data.flag.emojitwo},
        providers,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      country: {name: data.name, flag: data.flag.emojitwo},
      providers,
      csrfToken,
      callBackUrl,
    },
  };
};
