import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { auth } from '../../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (checked) {
            console.log('Déconnexion')
            signOut(auth).then(() => {
                console.log('Déconnexion réussie')
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }
                    , 1500);
            }).catch((error) => {
                console.log('Erreur de déconnexion')
            });
        }
    }, [checked, navigate])

    const handleChecked = (e) => {
        setChecked(e.target.checked);
    }


    return (
        <div className='logoutContainer'>
            <span className='switch-text' style={{ margin: "10px" }}>Déconnexion</span>

            <label className='switch'>
                <input type="checkbox"
                    checked={checked}
                    onChange={handleChecked}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Logout


