import showError from './functions/showError.js';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    //most of this functionality will be later on the server so security is not a concern rn
    const [cookies, setCookie] = useCookies(['name']);
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.username){
            navigate('/');
        }// eslint-disable-next-line
    }, []);

    function login(){
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;
    
        if(login === ''){
            showError('Login cannot be empty!');
        }else if(password === ''){
            showError('Password cannot be empty!');
        }else{
            fetch("http://localhost:8000/users").then(function(res){
                if(!res.ok){
                    throw Error('Could not fetch data from the server');
                }
                return res.json()
            }).then(function(data){
                    data.forEach(function(data){
                        if(data.login === login){
                            if(data.password === password){
                                setCookie('username', data.login, {path: '/'});
                                navigate('/');
                            }else{
                                showError('Invalid username or password');
                            }
                        }else{
                            showError('Invalid username or password');
                        }
                    });
            }).catch(function(err){
                showError(err.message);
            });
        }
    
    }

    return (
        <div className="login">
            <div className="login-box">
                <div className="error"></div>
                <label htmlFor="login">Login:</label>
                <input type="text" id="login" autoComplete='off'/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" />
                <button onClick={() => login()}>Login</button>
            </div>
        </div>
    );
}
 
export default Login;