import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient( import.meta.env.VITE_SUPABASE_URL , import.meta.env.VITE_SUPABASE_KEY);

const Login = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({ email: username, password });
        if (error) {
            console.log('Error: ', error.message);
        } else {
            setIsAuthenticated(true);
            navigate('/api');
        }
    }

    return (
        <>
            <div className='text-7xl text-white font-bold'>DressUPAI</div>
            <div className='flex items-center justify-center h-screen'>
                <div className='justify-center pt-2 h-[17vh] w-[50vh] bg-white rounded-lg'>
                    <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                        <input type='text'
                            placeholder='Username'
                            autoComplete='off'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='p-2 w-[95%] rounded-lg border border-gray-300' />
                        <input type='password'
                            autoComplete='off'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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