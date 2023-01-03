import { BrowserRouter, Route, Switch } from 'react-router-dom'

//Pages component
import Home from './pages/home/Home'
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';
import Create from './pages/create/Create';
import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector';


//CSS
import './App.css'
import { useTheme } from './hooks/useTheme';

function App() {
  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
        <BrowserRouter>
          <Navbar/>
          <ThemeSelector/>
          <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/create">
                <Create />
              </Route>

              <Route path="/search">
                <Search />
              </Route>

              <Route path="/recipes/:id">
                <Recipe />
              </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App