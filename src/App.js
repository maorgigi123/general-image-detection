
import React, { Component } from "react";
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
   const PAT = 'ea1aac5d1423495982117339e065caed';
   // Specify the correct user_id/app_id pairings
   // Since you're making inferences outside your app's scope
   const USER_ID = 'gigigames';       
   const APP_ID = 'faceRecognition';
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


  render() {
    const { isSignIn, imageUrl, route, box, faces, searchField} = this.state; 
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
                  <FaceRecognition faces = {faces} imageUrl ={imageUrl} />
                  </div>
                  <RecognitionInfo info_data = {faces} imageUrl={imageUrl} searchChange = {this.searchChange} searchField ={searchField}/>
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
