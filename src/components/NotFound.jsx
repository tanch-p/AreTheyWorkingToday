import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
  
    return (
      <div>
        <h2>Not Found - 404</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

export default NotFound