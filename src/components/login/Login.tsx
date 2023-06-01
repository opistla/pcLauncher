import React from 'react';
import { Input } from '@/components';

const Login = () => {
  return (
    <>
      <Input
        autoFocus
        margin='dense'
        id='email'
        label='이메일'
        // type='text'
        fullWidth
        variant='standard'
      />
      <br />
      <Input
        margin='dense'
        id='pw'
        label='비밀번호'
        type='passwrod'
        fullWidth
        variant='standard'
        error={false}
        helperText='비밀번호를 입력해주세요'
      />
    </>
  );
};

export default Login;