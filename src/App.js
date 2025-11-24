import Navbar from '../src/Pages/Navbar';
import Home from './Pages/Home';
import Aboutme from '../src/Pages/Aboutme';
import BlogDetails from './Pages/BlogDetails';
import Blogs from './Pages/Blogs';
import Notes from './Pages/Notes';
import FunFractals from './Pages/FunFractals';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {

  return (<Router>
      <div>
      <Navbar/>
      <Switch>
      <Route exact path ="/" component={Home}/>
      <Route exact path ="/aboutme" component={Aboutme}/>
      <Route exact path ="/notes" component={Notes}/>
      <Route exact path ="/blogs" component={Blogs}/>
      <Route exact path ="/blogs/:id" component={BlogDetails}/>
      <Route exact path ="/funfractals" component={FunFractals}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
