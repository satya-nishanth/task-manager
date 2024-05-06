import React, { FC, useContext, useEffect } from 'react';
import AppBar from './AppBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import { UserContext } from '../context/userContext';

type Props = {};

const Container: FC<Props> = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
    useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/tasks');
    }
  }, [user,navigate]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar />
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Container;
