import { useState } from 'react'
import './App.css'

function App() {
  
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTask, setEditTask] = useState('');  
  const [editIndex,setEditIndex] = useState(null)
  
  
  function handleClick() {
    const taskObj = {
      task,
      isComplete: false,
      isUpdated:false
     }    
    setTodos([...todos, taskObj]) 
    setTask('')
  }

  function onDelete(id) {
    const filteredArray = todos.filter(function (todo,index) {
      return index !== id
    })
    setTodos(filteredArray)
  }

  function onIsComplete(id) {    
    const updatedTodo = todos.map((todo, index) => {
      if (index === id) {
        return { ...todo, isComplete: !todo.isComplete }
      }
      return todo
    })    
    setTodos(updatedTodo)    
  }

  function toggleButton(id) {
    const updatedTodo = todos.map((todo, index) => {
      if (index === id) {
        return { ...todo, isUpdated: !todo.isUpdated }
      }
      return todo
    })    
    setTodos(updatedTodo)
  }
  function onUpdate(id) {   
      setEditIndex(id)
      setEditTask(todos[id].task)
      toggleButton(id)    
  }  

  function onSave(id) {    
    const updatedTodo = todos.map(function (todo,index) {
      if (index === id) {
        return {...todo,task:editTask}
      }
      return todo
    })
    
    setEditTask('')
    setEditIndex(null)
    toggleButton(id)
    setTodos(updatedTodo)
    
  }
  return (
    <>
      <div className='container'>
        <h1>TODO-LIST</h1>
        <div className='container-flex'>
        <input className="input-one" type="text" onChange={e=>setTask(e.target.value)} value={task} placeholder='Enter Task...' />
        <button onClick={handleClick} className='add-btn'>Add Task</button>
        </div>
        <div className='main-todos'>
          {todos.map(function (todo,index) {
            return <div key={index} className='todos' >
              <input type="checkbox" onChange={() => onIsComplete(index)} checked={todo.isComplete} />
              {todo.isUpdated && editIndex === index ?
                <input className="input-two" type="text"  value={editTask} onChange={e=>setEditTask(e.target.value)} /> :
                <span style={todo.isComplete ? { textDecoration: 'line-through', color: '#4FFFB0' } : { textDecoration: null }} >{todo.task}</span>
              }
              {todo.isComplete ? <button style={{ opacity:0}}></button> :
              <button onClick={todo.isUpdated && editIndex === index ? () => onSave(index) : () => onUpdate(index)} className='update-btn' >{todo.isUpdated && editIndex === index? 'Save':'Update'}</button>
             
             }
              <button onClick={()=>onDelete(index)} className='delete-btn'>Delete</button>
              </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
