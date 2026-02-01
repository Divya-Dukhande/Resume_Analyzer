// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import SideBar from './component/SideBar/SideBar'
// import { Routes, Route } from 'react-router-dom'
// import Dashboard from './component/Dashboard/Dashboard'
// import History from './component/History/History'
// import Admin from './component/Admin/Admin'

// function App() {
//   const [count, setCount] = useState(0)

//     return (
//     <div className='App'>
//       <SideBar />
//       <Routes>
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path='/History' element={<History />} />
//         <Route path='/Admin' element={<Admin />} />
//       </Routes>
//     </div>
//   )
// }

// export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import SideBar from './component/SideBar/SideBar'
import Dashboard from './component/Dashboard/Dashboard'
import History from './component/History/History'
import Admin from './component/Admin/Admin'

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>

      {/* Sidebar */}
      <SideBar />

      {/* Right Content */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin" element={<Admin />} />

          {/* default */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>

    </div>
  )
}

export default App;


