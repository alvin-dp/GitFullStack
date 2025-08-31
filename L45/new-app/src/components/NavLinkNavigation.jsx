import '../App.css';
import { NavLink } from "react-router";

function NavLinkNavigation() {
    return (
            <nav>
                <p>NavLinkNavigation</p>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active">Головна</NavLink> 
                    </li>
                    <li>
                        <NavLink to="/about" activeClassName="active">Про нас</NavLink> 
                        <ul>
                            <li>
                            <NavLink to="about/about1" activeClassName="active">Про мене</NavLink>
                            </li>
                            <li>
                            <NavLink to="about/about2" activeClassName="active">Про компанію</NavLink>
                            </li>                            
                         </ul>   
                    </li>
                    <li> Товари
                        <ul> 
                            <li>
                            <NavLink to="/products/1" activeClassName="active">Товар1</NavLink>
                            </li>
                            <li>
                            <NavLink to="/products/2" activeClassName="active">Товар2</NavLink>
                            </li>  
                            <li>
                            <NavLink to="/products/3" activeClassName="active">Товар3</NavLink>
                            </li>                                                        
                         </ul>
                    </li>                    
                    <li>
                        <NavLink to="/contact" activeClassName="active">Контакти</NavLink>
                    </li>
                </ul>
            </nav>
    );
}
export default NavLinkNavigation;