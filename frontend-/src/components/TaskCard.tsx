import React, { useContext, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  Chip,
  Grid,
} from '@mui/material';
import { fetchTasks, updateTask } from '../api/query';
import { UserContext } from '../context/userContext';
import { useSnackbar } from "../context/SnackBarContext";

interface TaskProps {
  _id: string;
  title: string;
  description: string;
  status: 'to_do' | 'in_progress' | 'done';
}

const statusMap = {
  to_do: ['To Do', 'secondary'],
  in_progress: ['In Progress', 'primary'],
  done: ['Done', 'success'],
};

const TaskCard: React.FC<TaskProps> = ({ _id, title, description, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editStatus, setEditStatus] = useState(status);
    const { setTasks } = useContext(UserContext);
    const { openSnackbar } = useSnackbar()

  const revertEdit = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditDescription(description);
    setEditStatus(status);
  };

    const handleSave = async () => {
      try {
         await updateTask(_id, editTitle, editDescription, editStatus);
          const tasks = await fetchTasks();
          openSnackbar("Task updated",'success')
         setTasks(tasks);
         setIsEditing(false);
      } catch (error:any) {
        openSnackbar(error?.message, 'error');
      }
   
  };

  return (
    <Box
      style={{
        margin: 5,

        width: 420,
        height: 300,
      }}
    >
      <Card variant='outlined'>
        <CardContent>
          {isEditing ? (
            <TextField
              select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as any)}
              fullWidth
            >
              <MenuItem value='to_do'>To Do</MenuItem>
              <MenuItem value='in_progress'>In Progress</MenuItem>
              <MenuItem value='done'>Done</MenuItem>
            </TextField>
          ) : (
            <Grid container alignItems={'center'} marginLeft={'-5px'}>
              <Chip
                label={statusMap[status][0]}
                color={statusMap[status][1] as any}
              />
            </Grid>
          )}
          {isEditing ? (
            <TextField
              fullWidth
              variant='standard'
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          ) : (
            <Typography
              variant='h5'
              component='div'
              onClick={() => setIsEditing(true)}
            >
              {title}
            </Typography>
          )}
          {isEditing ? (
            <TextField
              fullWidth
              variant='outlined'
              multiline
              rows={4}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              sx={{
                'marginBottom': 2,
                '& .MuiInputBase-input': {
                  height: '150px',
                  overflowY: 'auto',
                },
              }}
            />
          ) : (
            <Typography
              color='text.secondary'
              onClick={() => setIsEditing(true)}
              sx={{
                height: '150px',
                overflowY: 'auto',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          {isEditing ? (
            <>
              <Button size='small' onClick={revertEdit}>
                Cancel
              </Button>
              <Button size='small' onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <Button size='small' onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default TaskCard;
