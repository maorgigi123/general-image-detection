import React from 'react'
import { nanoid } from 'nanoid';
export const RecognitionItem = (  {items, imageUrl, cropImage} ) => {
    return(
        <div key={nanoid()}>
            {
                items.map(( data,i) => {
                    return (
                        <div key={nanoid()} id ={data.type+' '+i}>
                                <ul className="RecognitionInfo__list">
                                    <li className="RecognitionInfo__list-item">
                                        <div className="RecognitionInfo__list-item-div">
                                            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
                                            <path d="M15.8333 5.83333V14.1667M4.16667 5.83333V14.1667M14.1667 4.16667L5.83333 4.16667M14.1667 15.8333H5.83333M3.83333 5.83333H4.5C4.96671 5.83333 5.20007 5.83333 5.37833 5.74251C5.53513 5.66261 5.66261 5.53513 5.74251 5.37833C5.83333 5.20007 5.83333 4.96671 5.83333 4.5V3.83333C5.83333 3.36662 5.83333 3.13327 5.74251 2.95501C5.66261 2.79821 5.53513 2.67072 5.37833 2.59083C5.20007 2.5 4.96671 2.5 4.5 2.5H3.83333C3.36662 2.5 3.13327 2.5 2.95501 2.59083C2.79821 2.67072 2.67072 2.79821 2.59083 2.95501C2.5 3.13327 2.5 3.36662 2.5 3.83333V4.5C2.5 4.96671 2.5 5.20007 2.59083 5.37833C2.67072 5.53513 2.79821 5.66261 2.95501 5.74251C3.13327 5.83333 3.36662 5.83333 3.83333 5.83333ZM3.83333 17.5H4.5C4.96671 17.5 5.20007 17.5 5.37833 17.4092C5.53513 17.3293 5.66261 17.2018 5.74251 17.045C5.83333 16.8667 5.83333 16.6334 5.83333 16.1667V15.5C5.83333 15.0333 5.83333 14.7999 5.74251 14.6217C5.66261 14.4649 5.53513 14.3374 5.37833 14.2575C5.20007 14.1667 4.96671 14.1667 4.5 14.1667H3.83333C3.36662 14.1667 3.13327 14.1667 2.95501 14.2575C2.79821 14.3374 2.67072 14.4649 2.59083 14.6217C2.5 14.7999 2.5 15.0333 2.5 15.5V16.1667C2.5 16.6334 2.5 16.8667 2.59083 17.045C2.67072 17.2018 2.79821 17.3293 2.95501 17.4092C3.13327 17.5 3.36662 17.5 3.83333 17.5ZM15.5 5.83333H16.1667C16.6334 5.83333 16.8667 5.83333 17.045 5.74251C17.2018 5.66261 17.3293 5.53513 17.4092 5.37833C17.5 5.20007 17.5 4.96671 17.5 4.5V3.83333C17.5 3.36662 17.5 3.13327 17.4092 2.95501C17.3293 2.79821 17.2018 2.67072 17.045 2.59083C16.8667 2.5 16.6334 2.5 16.1667 2.5H15.5C15.0333 2.5 14.7999 2.5 14.6217 2.59083C14.4649 2.67072 14.3374 2.79821 14.2575 2.95501C14.1667 3.13327 14.1667 3.36662 14.1667 3.83333V4.5C14.1667 4.96671 14.1667 5.20007 14.2575 5.37833C14.3374 5.53513 14.4649 5.66261 14.6217 5.74251C14.7999 5.83333 15.0333 5.83333 15.5 5.83333ZM15.5 17.5H16.1667C16.6334 17.5 16.8667 17.5 17.045 17.4092C17.2018 17.3293 17.3293 17.2018 17.4092 17.045C17.5 16.8667 17.5 16.6334 17.5 16.1667V15.5C17.5 15.0333 17.5 14.7999 17.4092 14.6217C17.3293 14.4649 17.2018 14.3374 17.045 14.2575C16.8667 14.1667 16.6334 14.1667 16.1667 14.1667H15.5C15.0333 14.1667 14.7999 14.1667 14.6217 14.2575C14.4649 14.3374 14.3374 14.4649 14.2575 14.6217C14.1667 14.7999 14.1667 15.0333 14.1667 15.5V16.1667C14.1667 16.6334 14.1667 16.8667 14.2575 17.045C14.3374 17.2018 14.4649 17.3293 14.6217 17.4092C14.7999 17.5 15.0333 17.5 15.5 17.5Z" stroke="#344054" strokeWidth="1.66" strokeLinecap="round" strokeLinejoin="round">
                                                </path>
                                            </svg>
                                            <img className="pointer img" src={imageUrl} width="20" height="20"/>
                                            {/*<canvas width="20" height="20"></canvas>*/}
                                        </div>
                                        <p className="RecognitionInfo__list-item-percent">{data.value.toFixed(3)}</p>
                                    </li> 
                                </ul>
                        </div>
                    );
                })
            }
        </div>
    );

    
    
}
  
