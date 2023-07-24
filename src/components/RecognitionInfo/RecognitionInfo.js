import React, { Children } from "react";
import './RecognitionInfo.css'
import { nanoid } from 'nanoid';
import { RecognitionItem } from './RecognitionItem';
import RecognitionItemTitle from './RecognitionItemTitle';
import SearchBox from '../SearchBox/SearchBox';
import Summary from '../Summary/Summary';
const RecognitionInfo = ({info_data, imageUrl, searchChange, searchField, onSettingClick,onSlideChange, slideValue,onClickSummary, cropImage}) => {    
    let all_items = [];
    let types = [];
    return(
        
            <div>
                <Summary onSettingClick ={onSettingClick} onSlideChange={onSlideChange} slideValue={slideValue} onClickSummary ={onClickSummary}/>
                <SearchBox searchChange ={searchChange} />
                <div className="RecognitionInfo shadow-5">
                    <div className="container_items">
                {
                    info_data.map( (data) => {
                        try{
                            if(data.type.length > 1)
                                all_items.push({type: data.type,
                                    value:data.value,
                                    bottomRow: data.bottomRow,
                                    leftCol:data.leftCol,
                                    rightCol:data.rightCol,
                                    topRow:data.topRow});
                                                            
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
                        if(data.value < slideValue)
                            return null;
                        if(types.includes(data.type))
                        {
                            const index = types.indexOf(data.type);
                            if (index > -1) { // only splice array when item is found
                                types.splice(index, 1); // 2nd parameter means remove one item only
                            }
                            let items = [];
                            for(let i =0; i< all_items.length; i++)
                            {
                                if(all_items[i].type === data.type)
                                {
                                    if(all_items[i].value > slideValue)
                                        items.push(all_items[i]);
                                }
                            }

                            return (
                                <div key= {nanoid()}>
                                    <RecognitionItemTitle items={data} count = {items.length.toString()}/>

                                    <RecognitionItem items={items} imageUrl={imageUrl}  cropImage = {cropImage}/>
                                </div>
                            );
                        }
                    })
                
                }
                </div>
            </div>
            </div>
    );
}

export default RecognitionInfo;