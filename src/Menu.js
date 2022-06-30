import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="Menu">
            <span className="logo">Casino</span>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                
            </ul>
        </div>
    );
}
 
export default Menu;