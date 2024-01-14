
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
import { toHaveFocus } from "@testing-library/jest-dom/matchers";

const returnRequestOptions =  (imageUrl ) => {
   // Your PAT (Personal Access Token) can be found in the portal under Authentification
   const PAT = 'e0af9ed0c676465f8a627476e3911d43';
   // Specify the correct user_id/app_id pairings
   // Since you're making inferences outside your app's scope
   const USER_ID = 'maorgigi';       
   const APP_ID = 'faceRecognition';
   // Change these to whatever model and image URL you want to use
  //  const MODEL_ID = 'general-image-detection';
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

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      faces: [],
      searchField : '',
      route: 'signin',
      isSignIn: false,
      slideValue: 0,
      recognitionInfo: [],
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component{
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = ( data ) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})

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

    fetch('http://localhost:3000/imageApi',{
            method:'post',
            headers : {'content-Type':'application/json'},
            body:JSON.stringify({
                input: this.state.input
      })
    })
    .then(response =>response.json())
    .then(result => {
      console.log(result)
      if(result)
      {
        fetch('http://localhost:3000/image',{
            method:'put',
            headers : {'content-Type':'application/json'},
            body:JSON.stringify({
                id: this.state.user.id
              })
        }).then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)

      }

        for(var i =0; i < result.outputs[0].data.regions.length; i++)
        {
          this.displayFaceBox(this.calculateFaceLocation(result.outputs[0].data.regions[i]))
        }
      }
    )
    .catch(error => console.log('error', error));


  }
  onRouteChange = (route) =>{
    if(route ==='signout') {
      this.setState(initialState)
    }
    else  if(route==='home'){
      this.setState({isSignIn:true})
    }
    
    this.setState({route:route});
  }

cropImage = (recognitionInfo , imageUrl)  => {
  
    // if(this.state.recognitionInfo.includes(recognitionInfo[0].type))
    //   return null

    // var joined = this.state.recognitionInfo.push(recognitionInfo[0].type);

    //   this.setState({
    //     recognitionInfo: [...this.state.recognitionInfo, joined]
    // });


    //let parent = document.getElementsByClassName('RecognitionInfo')[0].children[0].children[this.state.recognitionInfo.length-1];
    var image = new Image();
    image.src = imageUrl;

    //var  canvas  = parent.children[0].children[0].children[0].children[0].children[2].children[0];
    image.onload = function(){
      for(var i=0; i < recognitionInfo.length; i++)
      {
        try{
            const canvas =document.getElementById(recognitionInfo[0].type+' '+i).children[0].children[0].children[0].children[2];
              document.getElementById(recognitionInfo[0].type+' '+i).children[0].children[0].children[0].appendChild(canvas)
              canvas.height = 50;
              canvas.width = 50;
              canvas.style = "border: 2px solid #CCC;";
              const ctx = canvas.getContext("2d");
              console.log(canvas)
              //console.log(this.state.box); /// no read box
              // console.log('left: '+this.state.box[i].leftCol +
              //   'right: ' + this.state.box[i].rightCol
              //   +'bottom ' + this.state.box[i].bottomRow+
              //   'top ' + this.state.box[i].topRow)


              //ctx.drawImage(image,0, 0, 400, 400,900,900
                const _width = 900;
                const _height = 900;
                const _leftCol =  recognitionInfo[i].leftCol * _width;
                const _topRow = recognitionInfo[i].topRow * _height;
                const _right_col = _width - (recognitionInfo[i].rightCol* _width);
                const _bottomRow =  _height - (recognitionInfo[i].bottomRow* _height);    
                // draw cropped image
                const w = _leftCol * _right_col /  2;
                const h = _topRow * _bottomRow /  2;

                ctx.drawImage(image,604,400, 2500,2500,0,50,900,900);
        }
        catch{
          console.log('a')
        }
              
      }
  }
}




  render() {
    const { isSignIn, imageUrl, route, faces, searchField,slideValue, user} = this.state; 
    return (

      <div className="App">

        <ParticlesBg color="#ffffff" num={200} type="cobweb" bg={true} />

        <Navigation isSignIn ={isSignIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home' 
        ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
              <div className='FaceRecognition_div'>
                  <div className='FaceRecognition_img'>
                  <FaceRecognition faces = {faces} imageUrl ={imageUrl} searchField ={searchField} slideValue ={slideValue}/>
                  </div>
                   <RecognitionInfo info_data = {faces} imageUrl={imageUrl} searchChange = {this.searchChange} searchField ={searchField} onSettingClick ={this.onSettingClick} onSlideChange ={this.onSlideChange} slideValue ={slideValue} onClickSummary={this.onClickSummary} cropImage={this.cropImage}/>
                  
                  
              </div>
          </div>
        : ( route === 'signin') ? 
          <Signin loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/>:
          <Register loadUser= {this.loadUser} onRouteChange={this.onRouteChange} />
        }
        
      </div>
      
    );
    
  }
}

export default App;
