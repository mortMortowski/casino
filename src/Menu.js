import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Menu = () => {
    const [cookies] = useCookies(['name']);

    return (
        <div className="Menu">
            <span className="logo">Casino</span>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                {cookies.username && <div>Welcome {cookies.username}</div>}
                {!cookies.username && <li><Link to="/login">Login</Link></li>}
            </ul>
        </div>
    );
}
 
export default Menu;