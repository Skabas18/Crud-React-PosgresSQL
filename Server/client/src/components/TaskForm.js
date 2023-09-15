import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm() {

  const [task, setTaks] = useState({
    title: '',
    description: ''
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (editing) {
      const apiUrl = `http://localhost:4000/task/${params.id}`;
      axios.put(apiUrl, task)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.error('Error al guardar los cambios:', error);
        });
    } else {
      const postUrl = 'http://localhost:4000/task';
      await axios.post(postUrl, task)
        .then(function (response) {
          // Manipula la respuesta exitosa aquí
          console.log('Respuesta exitosa:', response.data);
          setLoading(false)
          navigate('/');
        })
        .catch(function (error) {
          // Maneja errores aquí
          console.error('Error al hacer la solicitud:', error);
        });
    }

  }

  const handleChange = e =>
    setTaks({ ...task, [e.target.name]: e.target.value })


  const loadTask = async (id) => {
    const apiUrl = `http://localhost:4000/task/${id}`;
    await axios.get(apiUrl)
      .then(function (response) {
        setTaks({title:response.data.title, description: response.data.description})
        setEditing(true)
      })
      .catch(function (error) {
        console.error('Error al obtener el elemento por ID:', error);
      });

  }
  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  },[params.id])
  return (
    <Grid container direction={'column'} alignItems='center' justifyContent={'center'}>
      <Grid item xd={3}>
        <Card sx={{ mt: 5 }} style={{ background: '#1e272e', padding: '1rem' }}>
          <Typography variant='5' textAlign={'center'} color='white'>
            Create Task
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField name='title' value={task.title} onChange={handleChange} variant='filled' label='Write  your title' sx={{ display: 'block', margin: '.5rem 0' }} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "white" } }} />
              <TextField name='description' value={task.description} onChange={handleChange} variant='filled' label='Write  your description' multiline rows={4} sx={{ display: 'block', margin: '.5rem 0' }} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "white" } }} />
              <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description}>{loading ? <CircularProgress color='inherit' size={24} /> : ("Save")}</Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
