
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./component/Auth/Login"
import Register from "./component/Auth/Register"
import Dashboard from "./component/Dashboard/Dashboard"
import History from "./component/History/History"
import Admin from "./component/Admin/Admin"
import SideBar from "./component/SideBar/SideBar"

const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true"
}

function ProtectedLayout({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedLayout>
            <History />
          </ProtectedLayout>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedLayout>
            <Admin />
          </ProtectedLayout>
        }
      />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
