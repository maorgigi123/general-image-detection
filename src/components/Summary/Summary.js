import React from "react";
import './Summary.css'
import Model from './model'
const Summary = ({onSettingClick, onSlideChange, slideValue,onClickSummary}) => {
    return (
        <div>
            <div className="summary pointer">
                <p>Summary </p>
                <div className="summary__svg">
                <svg onClick={()=>onSettingClick()} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="workflow-settings-icon" strokeWidth="2" color="currentColor"><path d="M20 7H11" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14 17H5" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <svg className = "summary_Arrow" onClick = {() => onClickSummary()} width="12" height="12" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="expand-down"><path d="M1 1L7 7L13 1" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
                <Model onSlideChange ={onSlideChange} slideValue={slideValue}/>
            </div>
        </div>
    );
}
export default Summary;