import React, { useState, useRef } from 'react';
import compileValidityClasses from '../hooks/useCompileClassValidity';
const Register = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setPassword(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setEmail(value);
  };

  const handleSubmit = () => {
    let errorWasFound = false;
    if (nameRef.current!.value.trim() === '') {
      nameRef.current!.classList.add('input-error');
      errorWasFound = true;
    }

    if (lastNameRef.current!.value.trim() === '') {
      lastNameRef.current!.classList.add('input-error');
      errorWasFound = true;
    }
    if (password.length < 8) {
      passwordRef.current!.classList.add('input-error');
      errorWasFound = true;
    }
    if (!email.includes('@')) {
      emailRef.current!.classList.add('input-error');
      errorWasFound = true;
    }
    if (errorWasFound) {
      return;
    } else {
      //handle register
    }
  };

  return (
    <>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col '>
          <div className='text-center lg:text-left'>
            <h1 className='text-6xl font-bold w-full text-center mb-12'>
              Register{' '}
            </h1>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <div className='card-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  placeholder='Your name'
                  maxLength={15}
                  ref={nameRef}
                  className='input input-bordered focus:input-secondary'
                  onChange={(e) => e.target.classList.remove('input-error')}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Last name</span>
                </label>
                <input
                  type='text'
                  maxLength={20}
                  ref={lastNameRef}
                  placeholder='Your last name'
                  className='input input-bordered focus:input-secondary'
                  onChange={(e) => e.target.classList.remove('input-error')}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='text'
                  value={email}
                  ref={emailRef}
                  placeholder="Must include '@'"
                  className={`input input-bordered  ${compileValidityClasses(
                    'email',
                    undefined,
                    email
                  )}`}
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='text'
                  placeholder='At least 8 characters'
                  value={password}
                  ref={passwordRef}
                  className={`input input-bordered  ${compileValidityClasses(
                    'password',
                    password,
                    undefined
                  )}`}
                  onChange={(e) => handlePasswordChange(e)}
                />
              </div>
              <div className='form-control mt-6'>
                <button
                  className='btn btn-outline btn-primary'
                  onClick={handleSubmit}
                >
                  Register!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
