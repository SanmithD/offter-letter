
function ProtectedRoute({ children }) {
    const isAuthorized = localStorage.getItem("token");

  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute