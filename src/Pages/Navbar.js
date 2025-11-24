/// Navbar components
import favicon from '../assets/favicon.png';

const Navbar = () =>{
    return (

        <div>
            <nav className="navbar my-navbar">
                <a className="nav-link" href="/"><img src={favicon} alt="Favicon" width="30%"/></a>
            </nav>
        </div>

        
    );
}

export default Navbar;