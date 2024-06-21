import Home from "./components/Home"
import Login from "./components/Login"
import Head from "./components/Head"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Signup"

function App() {
  return (
    <div className="App">
      <Head />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
