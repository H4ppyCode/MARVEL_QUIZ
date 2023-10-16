import React, { useEffect } from 'react'
import Logout from '../Logout'
import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { user } from '../../Firebase/firebaseConfig';
import { getDoc } from 'firebase/firestore';
import Quiz from '../Quiz';

function Welcome(props) {

    const [userSession, setUserSession] = useState(null);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});


    useEffect(() => {
        const listener = onAuthStateChanged
            (auth, user => {
                user ? setUserSession(user) : navigate('/');
                console.log(user);
            })

        if (!!userSession) {

            const colRef = user(userSession.uid);

            getDoc(colRef)
                .then(snapshot => {
                    if (snapshot.exists()) {
                        const docData = snapshot.data(); // objet
                        console.log(docData);
                        console.log(snapshot.id);
                        setUserData(docData);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

        return listener;
    }, [userSession])

    return userSession === null ? (
        <>
            <div className='loader'>
            </div>
        </>
    ) : (
        <>
            <div className='quiz-bg'>
                <div className='container'>
                    <Logout />
                    Welcome {userData.pseudo}
                    <Quiz />
                </div>
            </div>
        </>
    )


}

export default Welcome


