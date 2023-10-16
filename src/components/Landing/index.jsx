import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Landing() {


    const [btn, setBtn] = useState(false);

    const refWolverine = useRef(null);


    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1000);

    }, [])


    const setleftImage = () => {
        refWolverine.current.classList.add("leftImg");
    }
    const setrightImage = () => {
        refWolverine.current.classList.add("rightImg");
    }
    const clearImage = () => {
        if (refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg");
        } else if (refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg");
        }
    }

    const displayBtn = btn &&
        (
            <Fragment>
                <div className='leftBox' onMouseOver={setleftImage} onMouseOut={clearImage}>
                    <Link className='btn-welcome' to="/signup">Inscription</Link>
                </div>
                <div className='rightBox' onMouseOver={setrightImage} onMouseOut={clearImage}>
                    <Link className='btn-welcome' to="/login">Connexion</Link>
                </div>
                <div className='centerBox' >
                    <Link className='btn-welcome' to="/welcome">Welcome</Link>
                </div>

            </Fragment>

        )

    return (
        <main ref={refWolverine} className='welcomePage'>
            {displayBtn}
        </main >

    )
}

export default Landing