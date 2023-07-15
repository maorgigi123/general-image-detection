import React from 'react';
import './FaceRecognition.css';
import { nanoid } from 'nanoid';
const FaceRecognition = ( { imageUrl, faces }) => {
    {if(imageUrl === ''){
        return null;
    }
    }
     
    return (
        <div className='center ma'>
            <div className='relative mt3'>
        <img className='shadow-5' id='inputImage' alt='' src = { imageUrl} width='900px' height='auto'/>
        {
            faces.map((user,id) =>{
                try {
                    return [
                        <div  key={nanoid()}>
                                <div className='bounding-box' 
                                key={nanoid()}
                                style={{
                                    top: user.topRow,
                                    right: user.rightCol,
                                    bottom: user.bottomRow,
                                    left: user.leftCol}} >
                                </div>
                                
                                <div className='bounding-box__info' 
                                key={nanoid()}
                                style={{
                                    top: user.topRow,
                                    right: user.rightCol}} >
                                        <p key={nanoid()} className='bounding-box__info-text'> {user.type} </p>
                                </div>
                        </div>
                        
                        ];
                }
                catch {
                    return null;
                }
            })
        }
                
            </div>
        </div>
    );


    
}

export default FaceRecognition;
