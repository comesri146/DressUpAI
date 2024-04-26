import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Auth';

const Login = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [isActive, setIsActive] = useState(false);
    const Route = useNavigate();

    onsubmit = (e) => {
        e.preventDefault();
        console.log('Submitted');
        setIsAuthenticated(true);
        Route('/api')
    }

    return (
    <>
        <div className='text-7xl text-white font-bold'>DressUPAI</div>
        <div className='flex items-center justify-center h-screen'>
            <div className='justify-center pt-2 h-[17vh] w-[50vh] bg-white rounded-lg'>
                <form className='flex flex-col items-center'>
                    <input type='text'
                        placeholder='Username'
                        autoComplete='off'
                        className='p-2 w-[95%] rounded-lg border border-gray-300' />
                    <input type='password'
                        autoComplete='off'
                        placeholder='Password'
                        className='m-4 p-2 w-[95%] rounded-lg border border-gray-300' />
                    <button className='text-blue-500'>Register</button>
                    <button className='block m-2 p-2 rounded-lg bg-blue-500 text-white' type='submit'>Login</button>
                </form>
            </div>
        </div>
    </>
    )
}

export default Login;