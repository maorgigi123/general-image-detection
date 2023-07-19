
import React, { Component, useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import RecognitionInfo from "./components/RecognitionInfo/RecognitionInfo";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg'

const returnRequestOptions =  (imageUrl ) => {
   // Your PAT (Personal Access Token) can be found in the portal under Authentification
   const PAT = [YOUR_API_KEY_HERE];
   // Specify the correct user_id/app_id pairings
   // Since you're making inferences outside your app's scope
   const USER_ID = [YOUR_API_USER_ID];       
   const APP_ID = [UOUR_API_APP_ID];
   // Change these to whatever model and image URL you want to use
   const MODEL_ID = 'general-image-detection';
   const IMAGE_URL = imageUrl;

   const raw = JSON.stringify({
     "user_app_id": {
         "user_id": USER_ID,
         "app_id": APP_ID
     },
     "inputs": [
         {
             "data": {
                 "image": {
                     "url": IMAGE_URL
                 }
             }
         }
     ]
 });

 const requestOptions = {
     method: 'POST',
     headers: {
         'Accept': 'application/json',
         'Authorization': 'Key ' + PAT
     },
     body: raw
 };
 return requestOptions;
}

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      faces: [],
      searchField : '',
      route: 'signin',
      isSignIn: false,
      slideValue: 0,
      recognitionInfo: []
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const type = data.data.concepts[0].name;
    const value = data.data.concepts[0].value;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      type:type,
      value:value,
    }
    
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });

    var joined = this.state.faces.push(box);

    this.setState({
      faces: [...this.state.faces, joined]
   });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  searchChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  onSettingClick = () => {
    const model = document.getElementsByClassName('model')[0];
    model.classList.toggle('show');

  }
  onSlideChange = (e) => {
    this.setState({slideValue: e.target.value});
  }

  onClickSummary() {
    const container_items = document.getElementsByClassName('container_items')[0];
    const hideArrow = document.getElementsByClassName('summary_Arrow')[0];
    container_items.classList.toggle('hide');
    hideArrow.classList.toggle('hideArrow');
    
  }

  onButtonSubmit = () => {
    this.setState({ faces: [{}] });
    this.setState({imageUrl:this.state.input });

    fetch("https://api.clarifai.com/v2/models/" + 'general-image-detection' + "/outputs", returnRequestOptions(this.state.input))
    .then(response => response.json())
    .then(result => {for(var i =0; i < result.outputs[0].data.regions.length; i++)
      {
        this.displayFaceBox(this.calculateFaceLocation(result.outputs[0].data.regions[i]))
      }
    }
    )
    .catch(error => console.log('error', error));


  }

  onRouteChange = (route) =>{
    if(route ==='signout') {
      this.setState({isSignIn:false})
    }
    else  if(route==='home'){
      this.setState({isSignIn:true})
    }
    
    this.setState({route:route});
  }

  
cropImage = (recognitionInfo , imageUrl)  => {
    if(this.state.recognitionInfo.includes(recognitionInfo[0].type))
      return null

    var joined = this.state.recognitionInfo.push(recognitionInfo[0].type);

      this.setState({
        recognitionInfo: [...this.state.recognitionInfo, joined]
    });
    let parent = document.getElementsByClassName('RecognitionInfo')[0].children[0].children[this.state.recognitionInfo.length-1];
    parent = parent.children[1];  
    var image = new Image();
    image.src = imageUrl;

    // var  canvas  = parent.children[0].children[0].children[0].children[0].children[2].children[0];
    image.onload = function(){
    for(var i=0; i < recognitionInfo.length; i++)
    {
            const canvas = document.createElement("canvas");
            document.getElementById(recognitionInfo[0].type+' '+i).children[0].children[0].children[0].appendChild(canvas)
            canvas.height = 50;
            canvas.width = 50;
            canvas.style = "border: 2px solid #CCC;";
            const ctx = canvas.getContext("2d");

            
            console.log('left: '+recognitionInfo[i].leftCol +'   right: ' + recognitionInfo[i].rightCol+'   bottom ' + recognitionInfo[i].bottomRow+'   top ' + recognitionInfo[i].topRow)
            ctx.drawImage(image,21,20,50,1400, 0, 0, canvas.width, canvas.height);
    }
  }
}




  render() {
    const { isSignIn, imageUrl, route, box, faces, searchField,slideValue} = this.state; 
    return (

      <div className="App">

        <ParticlesBg color="#ffffff" num={200} type="cobweb" bg={true} />

        <Navigation isSignIn ={isSignIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home' 
        ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
              <div className='FaceRecognition_div'>
                  <div className='FaceRecognition_img'>
                  <FaceRecognition faces = {faces} imageUrl ={imageUrl} searchField ={searchField} slideValue ={slideValue}/>
                  </div>
                  <RecognitionInfo info_data = {faces} imageUrl={imageUrl} searchChange = {this.searchChange} searchField ={searchField} onSettingClick ={this.onSettingClick} onSlideChange ={this.onSlideChange} slideValue ={slideValue} onClickSummary={this.onClickSummary} cropImage={this.cropImage} />
              </div>
          </div>
        : ( route === 'signin') ? 
          <Signin onRouteChange = {this.onRouteChange}/>:
          <Register onRouteChange={this.onRouteChange} />
        }
        
      </div>
      
    );
    
  }
}

export default App;
