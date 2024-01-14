import React from 'react';
import './FaceRecognition.css';
import { nanoid } from 'nanoid';
const FaceRecognition = ( { imageUrl, faces, searchField, slideValue }) => {
    {if(imageUrl === ''){
        return null;
    }
    }
     
    return (
        <div className='center ma'>
            <div className='relative mt3'>
        <img className='shadow-5' id='inputImage' alt='' src = { imageUrl} width='900px' height='900px'/>
        {
            faces.map((user,id) =>{
                try {
                    if(!user.type.toLowerCase().includes(searchField.toLowerCase()))
                        return null;
                    if(user.value < slideValue)
                        return null;
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
