import { useState } from 'react'
import './App.css'
import Todo from './Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='text-3xl '>
      {/* <Counter/> */}
      <Todo/>
    </div>
    </>
  )
}

export default App
