import React from 'react'
import { nanoid } from 'nanoid';

const RecognitionItemTitle = (  {items, count} ) => {
    let item = items.items;
    return (
        <div key={nanoid()} id ={items.type}>
                <div className="concept-type__title">
                    <p className="concept-count-badge">{count}</p>
                    <p className="RecognitionInfo__typeList">{items.type}</p>
                </div>
                
        </div>
    );
    
}

export default RecognitionItemTitle;