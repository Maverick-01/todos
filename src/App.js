import React, { useState, useEffect } from 'react'
import './App.css'
import { Form } from './components/Form/Form'
import { TodoList } from './components/TodoList/TodoList'

function App() {
  const [textInput, setTextInput] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    getLocalTodo()
  }, [])

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break

      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false))
        break

      default:
        setFilteredTodos(todos)
        break
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const getLocalTodo = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let localTodo = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodo)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Hola amigos!</h1>
      </header>
      <Form
        textInput={textInput}
        todos={todos}
        setTodos={setTodos}
        setTextInput={setTextInput}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  )
}

export default App
