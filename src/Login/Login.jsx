import React, { useState } from 'react';


const Login = () => {
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    return (
        <>
            <div className='grid grid-cols-2'>
                <div className='temp'>rer</div>
                <div className='bg-white h-[50vh] rounded-lg m-4'>
                    <form>
                        <input type='text' placeholder='Username' className='block m-4 p-2 w-[90%] rounded-lg border border-gray-300' />
                        <input type='password' placeholder='Password' className='block m-4 p-2 w-[90%] rounded-lg border border-gray-300' />
                        <button className='block m-4 p-2 w-[90%] rounded-lg bg-blue-500 text-white' type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;