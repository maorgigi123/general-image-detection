import React from "react";
import './Summary.css'
const Model = ({ onSlideChange , slideValue}) => {
    return (
        <div className="model">
            <div className="sy9d5sa">Model Settings</div>
        <hr></hr>
            <div className="sibrmv4">
                <h4 className="slider-title">Prediction Threshold</h4>
                <div className="sliderInput iida6s1 a19swlei j1kc3cgv">
                    <input onChange={(value => (onSlideChange(value)))} type="range" data-testid="threshold-slider" min="0" max="1" step="0.02" className="slider s18tths5" name="threshold" defaultValue="0"/>
                        <div className="value_model">{slideValue}</div>
                </div>
            </div>
        </div>
    );
}
export default Model;