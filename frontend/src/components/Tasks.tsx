import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import CreateTaskButton from './CreateTaskBtn';
import { UserContext } from '../context/userContext';
import TaskCard from './TaskCard';

type Props = {};

const Tasks = (props: Props) => {
  const { tasks } = useContext(UserContext);
  return (
    <Grid container margin={'20px auto'} width={'100%'}>
      <Grid item xs={12} justifyContent={'right'}>
        <CreateTaskButton />
      </Grid>
      <Grid
        container
        spacing={5}
        margin={'10px'}
        flexWrap={'wrap'}
        width={'100%'}
      >
        {tasks?.map((task) => (
          <TaskCard key={task._id} {...task} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Tasks;
