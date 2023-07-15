import React, { Children } from "react";
import './RecognitionInfo.css'
import { nanoid } from 'nanoid';
import { RecognitionItem } from './RecognitionItem';
import RecognitionItemTitle from './RecognitionItemTitle';
import SearchBox from '../SearchBox/SearchBox';

const RecognitionInfo = ({info_data, imageUrl, searchChange, searchField}) => {
    let all_items = [];
    let types = [];
    return(
        
            <div>
                <SearchBox searchChange ={searchChange} />
                <div className="RecognitionInfo shadow-5">
                {
                    info_data.map( (data,i) => {
                        try{
                            if(data.type.length > 1)
                                all_items.push({type: data.type,value:data.value});
                            if(!types.includes(data.type))
                                types.push(data.type);
                        }   
                        catch {
                            return null;
                        }
                    })
                    
                }
                {
                    all_items.sort().map( (data, i) => {
                        if(!data.type.toLowerCase().includes(searchField.toLowerCase()))
                            return null;
                        if(types.includes(data.type))
                        {
                            const index = types.indexOf(data.type);
                            if (index > -1) { // only splice array when item is found
                                types.splice(index, 1); // 2nd parameter means remove one item only
                            }
                            let items = [];
                            for(var i =0; i< all_items.length; i++)
                            {
                                if(all_items[i].type == data.type)
                                {
                                    items.push(all_items[i]);
                                }
                            }
                            return (
                                <div key= {nanoid()}>
                                
                                    <RecognitionItemTitle items={data} count = {items.length.toString()}/>
                                    <RecognitionItem items={items} imageUrl={imageUrl} />
                                </div>
                                
                            );
                        }
                    })
                
                }
            </div>
            </div>
    );
}

export default RecognitionInfo;