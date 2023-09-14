import {Container, AppBar, Toolbar, Typography, Stack, TextField, Button} from '@mui/material'
import TodoItem from './components/TodoItem'
import { useEffect, useState } from 'react'
import Test from './components/Test';
import { getTodos, saveTodos } from './utils/features';

const App = () => {

  const [todos, setTodos]=useState<TodoItemType[]>(getTodos());
  const [title, setTitle]=useState<TodoItemType["title"]>("");

  const completeHandler=(id: TodoItemType["id"]):void=>{
    const newTodos:TodoItemType[]=todos.map((i)=>{
      if(i.id===id) i.isCompleted=!i.isCompleted;
      return i;
    })
    setTodos(newTodos);

  };
  const deleteHandler=(id: TodoItemType["id"]):void=>{
    const newTodos:TodoItemType[]=todos.filter((i)=>i.id!==id);
    setTodos(newTodos);

  };

  const editHandler=(id: TodoItemType["id"], newTitle:TodoItemType["title"]):void=>{
    const newTodos:TodoItemType[]=todos.map((i)=>{
      if(i.id===id) i.title=newTitle;
      return i;
    })
    setTodos(newTodos);

  };

  const submitHandler=():void=>{
    const newTodo:TodoItemType={
      title,
      isCompleted:false,
      id: String(Math.random()*1000)
    };
    setTodos(prev=>([...prev, newTodo]))
    setTitle("");

  };
  useEffect(()=>{
    saveTodos(todos)
  }, [todos])
  return (
    <Container maxWidth="sm" sx={{height:"100vh"}}>
      <AppBar position='static'>
      <Toolbar>
      <Typography>Todo App</Typography>
      </Toolbar>
      </AppBar>
      <Stack height={'80%'} direction={'column'} spacing={'1rem'} p={'1rem'}>
         {
          todos.map((i)=>(
            <TodoItem key={i.id} todo={i} deleteHandler={deleteHandler} completeHandler={completeHandler} editHandler={editHandler}/>
            
          ))
          
        } 
        

      </Stack>
      <TextField fullWidth label={"New Task"} value={title} onChange={(e)=>setTitle(e.target.value)} onKeyDown={(e)=>{
        if(e.key==="Enter" && title!="") submitHandler();
      }}/>
      <Button sx={{margin:"1rem 0", padding:"0.75rem 0"}} variant='contained' fullWidth onClick={submitHandler} disabled={title===""}>Add</Button>
    </Container>
  )
}

export default App