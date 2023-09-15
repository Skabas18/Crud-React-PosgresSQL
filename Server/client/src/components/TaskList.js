import { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Card, CardContent, Typography} from  '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function TaskList() {
const [tasks, setTasks] = useState([]);
const navigate = useNavigate();

  const loadTasks = async () => {
    const apiUrl = 'http://localhost:4000/task';
    await axios.get(apiUrl)
      .then(function (response) {
        // Actualiza el estado con los datos recibidos de la API
        setTasks(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const handleDelete =  async (id) =>{
    const apiUrl = `http://localhost:4000/task/${id}`;

    // Realiza una solicitud DELETE a la API utilizando Axios
    await axios.delete(apiUrl)
      .then(function (response) {
        // Llama a la función onDelete para notificar que el elemento se ha eliminado
        setTasks(tasks.filter(task =>task.id !==id));
      })
      .catch(function (error) {
        // Maneja errores aquí
        console.error('Error al eliminar el elemento:', error);
      });
  }

  useEffect(() => {
    loadTasks();
  })
  return (
    <>
      <h1>Task List</h1>
      {
        tasks.map((task) =>(
            <Card style={
              {marginBottom: ".7rem",
              backgroundColor: '#1e272e'}
            }key={task.id}>
              <CardContent style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <div style={{color: "white"}}>
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
                </div>
                <div>
                <Button variant='contained' color='inherit' onClick={()=> navigate(`/task/${task.id}/edit`)}>Edit</Button>
                <Button variant='contained' color='warning' onClick={()=> handleDelete(task.id)} style={{marginLeft: '.5rem'}}>Delete</Button>
                </div>
              </CardContent>
            </Card>
        ))
      }
    </>
  )
}
