import React, {Component} from 'react';
import Player from './Player';
import Search from './Search';
import '../css/main.css';

const API = 'useyourown'
const qry = 'karaoke'
const result = 5
var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&q=${qry}&part=snippet&maxResults=${result}`



class Youtube extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      isLoading: true,
      videos: []
      
    };
    
    // this.fetchData = this.fetchData.bind(this);
    this.delCurrentSong = this.delCurrentSong.bind(this);
    this.insertSongToFirst = this.insertSongToFirst.bind(this);
    this.insertSongToQueue = this.insertSongToQueue.bind(this);
  }
  
  
  delCurrentSong(id) {
    const newVideos = this.state.videos.filter(i => {
      return i.id !== id;
    })
    
    this.setState({
      videos: [ ...newVideos]
    })
    // this.refs.Player ? this.refs.Player.goNext() : null
  }
  


  componentWillMount() {
    console.log('componentWillMount')
      localStorage.getItem('videos') && this.setState({
          videos: JSON.parse(localStorage.getItem('videos')),
          isLoading: false
      })
  }
  

  componentDidMount(){
  
    console.log('componentDidMount')
      const date = localStorage.getItem('videosDate');
      const videosDate = date && new Date(parseInt(date, 10));
      const now = new Date();
  
      const dataAge = Math.round((now - videosDate) / (1000 * 60)); // in minutes
      const tooOld = dataAge >= 10;
  
      if(tooOld){
          this.fetchData();            
      } else {
          console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
      }
  
  }
  

  
  
  fetchData(){
    console.log('Fetching data...')
    
    this.setState({
      isLoading: true,
      videos: []
    })
        
    fetch(finalURL)
    .then((response) => response.json())
    .then(parsedJson => parsedJson.items.map(vid => (
      {
        title: `${vid.snippet.title}`,
        id: `${vid.id.videoId}`,
        thumbnail: `${vid.snippet.thumbnails.default.url}`
      }
    )))
    .then(videos => this.setState({
      videos,
      isLoading: false
    }))
    .catch((error) => {
      console.error(error);
    })
  }
  
  
  componentWillUpdate(nextProps, nextState) {
      localStorage.setItem('videos', JSON.stringify(nextState.videos));
      localStorage.setItem('videosDate', Date.now());
  }

  insertSongToFirst(vid){
    const newVideos = this.state.videos.filter(i => {
      return i !== vid;
    })
    this.setState({
      videos: [vid, ...newVideos]
    })
  }
  
  insertSongToQueue(vid){
    console.log(vid);
    this.setState({
      videos: [...this.state.videos, vid]
    })
    console.log(this.state.videos)
  }

  
  render() {
    console.log('rendering...')
    const {videos} = this.state;
    

    return(
      <div>
        
        <div className="row">
          <div className="col-md-10">
            {
              
              videos.length > 0 ? (
                <div>
                  <Player ref="Player" id={videos[0].id} title={videos[0].title}
                    delCurrentSong = {this.delCurrentSong}/>
                
                </div>
              ): null
            }
            
            <div>
              
              
              {/* <button className="btn btn-default" onClick={(e) => {this.fetchData();}}>Get youtube videos</button>
              
              {console.log(videos.length)}
              {
                videos.length > 0 ? (
                  <button className="btn btn-default" onClick={(e) => {this.delCurrentSong(videos[0].id);}}>Next Song</button>
                ): null
              } */}
              
            </div>
            <Search insertSongToQueue = {this.insertSongToQueue}/>
            
          </div>
          
          
          <div className="col-md-2">
            <div className="pre-scrollable">
              {
                videos.map(vid => {
                  return (
                    <div key={vid.id}>
                      <img style={{cursor: 'pointer'}} src={`${vid.thumbnail}`} alt={vid.id} onClick={e => this.insertSongToFirst(vid)}/>
                      <div>
                        <button className="btn btn-default btn-xs"
                          // onClick={(e) => {this.playNow(vid.id)}}
                          onClick={(e) => {this.refs.Player.playThis(vid.id)}}
                          >Play Now</button>
                        
                        <button className="btn btn-default btn-xs"
                          onClick={(e) => {this.delCurrentSong(vid.id)}}
                          >Delete</button>
                      </div>
                      <p>{vid.title}</p>
                    </div>
                    
                  )
                })
              }
              
              
            </div>
          </div>
          
        </div>
        

        

        
      </div>
    )
  }
}

export default Youtube;

