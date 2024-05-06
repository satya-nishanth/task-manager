import React, { useContext, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTask, fetchTasks } from "../api/query";
import { UserContext } from "../context/userContext";
import { useSnackbar } from "../context/SnackBarContext";

interface CreateTaskProps {
  
}

const CreateTaskButton: React.FC<CreateTaskProps> = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
    const [status, setStatus] = useState('to_do');
    const { setTasks } = useContext(UserContext)
    const { openSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
    const onCreate = async (title: string, description: string, status: string) => {
        try {
            await createTask(title, description, status);
            const tasks = await fetchTasks();
            openSnackbar("Task created","success")
            setTasks(tasks);
        } catch (error:any) {
            openSnackbar(error?.message, 'error');
        }
        
    };
    
    

  const handleCreate = () => {
    onCreate(title, description, status);
    handleClose();
    setTitle('');
    setDescription('');
    setStatus('to_do');
  };

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={handleClickOpen}
        style={{ position: 'fixed', right: 20, bottom: 20 }}
      >
        <AddIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Title'
            type='text'
            fullWidth
            variant='outlined'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin='dense'
            label='Description'
            type='text'
            fullWidth
            multiline
            rows={4}
            variant='outlined'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            select
            label='Status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value='to_do'>To Do</MenuItem>
            <MenuItem value='in_progress'>In Progress</MenuItem>
            <MenuItem value='done'>Done</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTaskButton
