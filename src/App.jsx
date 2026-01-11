import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { useAuth } from './contexts/UserContext'
import LoginForm from './components/LoginForm' // Assuming you created this

function App() {
  const [todos, setTodos] = useState([])
  const { user, logout } = useAuth() 

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }


  useEffect(() => {
    if (user) {
      const savedTodos = JSON.parse(localStorage.getItem(`todos_${user.email}`))
      if (savedTodos) {
        setTodos(savedTodos)
      } else {
        setTodos([])
      }
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user.email}`, JSON.stringify(todos))
    }
  }, [todos, user])

  if (!user) {
    return <LoginForm />
  }

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">

          {/* User Profile Bar */}
          <div className="flex justify-between items-center mb-6 bg-[#2a3b52] p-3 rounded-lg">
            <div>
              <span className="text-gray-400">Logged in as:</span>
              <span className="ml-2 font-bold text-blue-400">{user.username}</span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
            >
              Logout
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>

          <div className="mb-4">
            <TodoForm />
          </div>

          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App