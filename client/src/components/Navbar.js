import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // import the jwt-decode library

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }

    let decodedToken = null; // initialize decodedToken to null
    if (cookies.access_token) {
        decodedToken = jwt_decode(cookies.access_token); // decode the token
    }

    return (
        <div className="navbar">
          <Link to="/">Home Feed</Link>
          {!cookies.access_token ? (
            <Link to="/auth">Login / Register</Link>
          ) : (
            <>
              {decodedToken.isAdmin && <Link to="/admin">Admin</Link>}
              {!decodedToken.isAdmin && (
                <>
                
                  <Link to="/saved-recipes">Saved Recipes</Link>
                  <Link to="/my-recipes">My Recipes</Link>
                  <Link to="/create-recipe">Create Recipe</Link>
                </>
              )}
      
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      );
    
}
