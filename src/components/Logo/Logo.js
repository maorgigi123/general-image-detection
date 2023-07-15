import React from 'react'
import Tilt from 'react-parallax-tilt';
const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt perspective={500} style={{ height: '150px',width:'150px' }}>
                <img alt='Logo' src='Logo.png' />
            </Tilt>
        </div>
    );
}

export default Logo;
