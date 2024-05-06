import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { loginUser, registerUser } from '../api/query';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import { useSnackbar } from '../context/SnackBarContext';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const { openSnackbar } = useSnackbar();

  const submit = async (email: string, password: string) => {
    try {
      const user =
        mode === 'login'
          ? await loginUser(email, password)
          : await registerUser(email, password);
      setUser(user);
      const successMsg = mode === 'login' ? 'User login' : 'User registration';
      openSnackbar(`${successMsg} success`, 'success');
    } catch (error: any) {
      openSnackbar(error?.message, 'error');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(email, password);
  };
  let redirect = mode === 'login' ? 'Register' : 'Login';
  return (
    <Paper style={{ padding: 16, maxWidth: 400, margin: '50px auto' }}>
      <Typography variant='h6'>
        {mode === 'login' ? 'Login' : 'Register'}
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <TextField
          label='Email'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type='submit' variant='contained' color='primary'>
          {mode === 'login' ? 'Login' : 'Register'}
        </Button>
        <Typography>
          {mode === 'login' ? 'Not an user? ' : 'Already a user? '}
          <Link to={`/${redirect}`}>{redirect}</Link>
        </Typography>
      </form>
    </Paper>
  );
};

export default AuthForm;
