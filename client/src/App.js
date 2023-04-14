import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipes } from './pages/saved-recipes';
import { Navbar } from './components/Navbar'
import { MyRecipes } from './pages/my-recipes';
import { Admin } from './pages/admin';

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} /> 
          <Route path="/create-recipe" element={<CreateRecipe />} /> 
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
