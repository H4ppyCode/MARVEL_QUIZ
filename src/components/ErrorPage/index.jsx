import React from 'react'
import batman from '../../images/batman.png'
import { Link } from 'react-router-dom'
function ErrorPage() {
    return (
        <div className='quiz-bg' >
            <div className="container" style={{ display: 'flex', alignItems: 'center', }}>
                <h2>Oups, cette page n'existe pas !</h2>
                <h3>Retourner au <Link to="/">menu princiapal</Link></h3>

                <img src={batman} alt="error page" width={'40%'} />
            </div>
        </div>
    )
}

export default ErrorPage