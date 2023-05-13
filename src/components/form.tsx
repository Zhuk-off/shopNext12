import { Box, Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

import dynamic from 'next/dynamic';

interface ISendData {
  email: string;
  info: string;
  name: string;
  phone: string;
  policy: boolean;
}

// The delay is needed for rebooting Recaptcha. Without delay, it gives out an error.
const sleep = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });

const FormContact = ({ type }: { type: 'contact' | 'order' }) => {
  // Dynamic import
  // const PacmanLoader = dynamic(() => import('react-spinners/PacmanLoader'), {
  //   ssr: false,
  // });
  const AddCardIcon = dynamic(() => import('@mui/icons-material/AddCard'), {
    ssr: false,
  });
  const CreateIcon = dynamic(() => import('@mui/icons-material/Create'), {
    ssr: false,
  });
  // const TextField = dynamic(() => import('@mui/material/TextField'), {
  //   ssr: false,
  // });
  // const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  //   ssr: false,
  // });

  let titleForm = {
    title: 'Заказать сайт',
    send: 'Оставить заявку',
    icon: <AddCardIcon />,
  };
  if (type === 'contact') {
    titleForm = {
      title: 'Напиши нам',
      send: 'Отправить',
      icon: <CreateIcon />,
    };
  }

  // The description is used in the switch to politics
  const label = {
    inputProps: { 'aria-label': 'Switch agree with privacy policy' },
  };

  // States
  const [sendData, setSendData] = useState<ISendData>({
    email: '',
    info: '',
    name: '',
    phone: '',
    policy: false,
  });
  let [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [reCaptureVerify, setReCaptureVerify] = useState(false);
  const [errorName, setErrorName] = useState({
    error: false,
  });
  const [errorPhone, setErrorPhone] = useState({
    error: false,
  });
  const [errorPolicy, setErrorPolicy] = useState({
    className: '',
  });

  // react-hook-form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // React-hook-form function, which works when sending a form
  const onSubmit = async (data) => {
    setSendData(data);
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current.execute();
  };

  // Processing error in the form, it is necessary to install and eliminate red fields in the form
  if (errors['name'] && !errorName.error) {
    setErrorName({
      error: true,
    });
  }
  if (!errors['name'] && errorName.error) {
    setErrorName({
      error: false,
    });
  }
  if (errors['phone'] && !errorPhone.error) {
    setErrorPhone({
      error: true,
    });
  }
  if (!errors['phone'] && errorPhone.error) {
    setErrorPhone({
      error: false,
    });
  }
  if (errors['policy'] && errorPolicy.className === '') {
    setErrorPolicy({
      className: 'ring-1 ring-primary ring-inset rounded',
    });
  }
  if (!errors['policy'] && errorPolicy.className !== '') {
    setErrorPolicy({
      className: '',
    });
  }

    // We use for invisible Recaptcha
    const recaptchaRef = useRef(null);

  // ReCapture
  const onReCAPTCHAChange = async (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ sendData, captcha: captchaCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setLoading(true);
        await sleep();
        recaptchaRef.current.reset();
        setSend(true);
        setLoading(false);
        // If the response is ok than show the success alert
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || 'Something went wrong');
      await sleep();
      recaptchaRef.current.reset();
    }
  };

  return (
    <Box
      component={'form'}
      className="screen-box-shadow-all grid gap-5 p-10 text-2xl text-black"
      action="/api/form"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {send ? (
        <>
          <p className="font-fira-medium text-2xl text-green">
            Ваше сообщение отправлено.
          </p>
          <p className="font-fira-medium text-xl text-black">Спасибо.</p>
          <p className="font-fira-medium text-xl text-black">
            Мы свяжемся с вами в ближайшее время.
          </p>
        </>
      ) : (
        <>
          <p className="text-black">{titleForm.title}</p>

          <TextField
            {...register('name', { required: true, minLength: 2 })}
            id="name"
            label="Имя"
            color="secondary"
            variant="outlined"
            required
            {...errorName}
          />
          <TextField
            {...register('email')}
            id="email"
            label="E-mail:"
            color="secondary"
            variant="outlined"
            type={'email'}
          />
          <TextField
            {...register('phone', {
              required: true,
              minLength: 7,
              pattern: /^[0-9+\-()\s]+$/,
            })}
            id="phone"
            label="Телефон:"
            color="secondary"
            variant="outlined"
            type={'tel'}
            required
            {...errorPhone}
          />
          <TextField
            {...register('info')}
            id="info"
            label="Сообщение"
            multiline
            color="secondary"
            rows={4}
          />
          <div {...errorPolicy}>
            <div className="flex items-center ">
              <Switch
                {...register('policy', { required: true })}
                id="policy"
                {...label}
                color="secondary"
                required
              />

              <p className="font-roboto-regular text-sm text-black ">
                Я согласен с{' '}
                <Link href={'/policy/'} className="underline" target={'_blank'}>
                  Политикой конфиденциальности
                </Link>
              </p>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="rounded-full px-8"
            endIcon={loading ? null : titleForm.icon}
            type={'submit'}
          >
            {loading ? (
              <PacmanLoader
                color={'#ffffff'}
                loading={loading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              titleForm.send
            )}
          </Button>
        </>
      )}
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
        className="invisible absolute z-30 lg:visible"
      />
    </Box>
  );
};

export default FormContact;
