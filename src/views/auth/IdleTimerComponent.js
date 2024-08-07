import React, { useState, useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';

const IdleTimerComponent = ({ timeout = 300000 }) => { // 5 minutes
    // { timeout = 1000 * 60 * 15 } //15 minutes timeout
    const navigate = useNavigate();
    const [isIdle, setIsIdle] = useState(false);
    const idleTimerRef = useRef(null);
    const onIdle = () => {
        setIsIdle(true);
        alert('You have been logged out due to inactivity.');
        // Perform logout logic here
        localStorage.removeItem('email'); // Example of clearing the auth token
        navigate('/login'); // Redirect to login page
    };

    const onActive = () => {
        setIsIdle(false);
    };

    useIdleTimer({
        ref: idleTimerRef,
        timeout,
        onIdle,
        onActive,
        debounce: 500
    });
    return (
        <div>
            {isIdle && <p>You have been logged out due to inactivity.</p>}
        </div>
    )
}

export default IdleTimerComponent