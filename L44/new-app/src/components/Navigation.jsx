import '../App.css';
import { Link } from "react-router";

function Navigation() {
    return (
            <nav>
                <p>LinkNavigation</p>
                <ul>
                    <li>
                        <Link to="/">Головна</Link> 
                    </li>
                    <li>
                        <Link to="/about">Про нас</Link> 
                        <ul>
                            <li>
                            <Link to="about/about1" >Про мене</Link>
                            </li>
                            <li>
                            <Link to="about/about2">Про компанію</Link>
                            </li>                            
                         </ul>                          
                    </li>
                    <li>
                        <Link to="/contact">Контакти</Link>
                    </li>
                </ul>
            </nav>
    );
}
export default Navigation;