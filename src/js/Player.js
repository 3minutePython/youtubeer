import React, {Component} from 'react';

let loadYT
var player

class Player extends Component{
  constructor(props){
    super(props);
    
  
  }
  
  
  componentDidMount () {
    console.log('Player componentDidMount')
    if (!loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        window.onYouTubeIframeAPIReady = () => resolve(window.YT)
      })
    }
    loadYT.then((YT) => {
      // this.player = new YT.Player(this.youtubePlayerAnchor, {
      player = new YT.Player(this.youtubePlayerAnchor, {

        // height: this.props.height || 390,
        // width: this.props.width || 640,
        // videoId: this.props.YTid,
        // videoId: 'QQucPUfXUQQ',
        videoId: this.props.id,
        events: {
          onStateChange: this.onPlayerStateChange
        }
      })
    })
  }
  
  goNext() {
    console.log('goNext');
  	player.loadVideoById(this.props.id, 0, 'default');
  }
  
  playThis(id) {
  	player.loadVideoById(id, 0, 'default');
  }
  
  onPlayerStateChange = (e) => {
    console.log('Player state changed: ' + e.data)
    if(e.data === 0) {
      this.goNext();
      this.props.delCurrentSong(this.props.id);
    }
    if (typeof this.props.onStateChange === 'function') {
      this.props.onStateChange(e)
    }
  }
  
  
  render(){
    console.log(this.props.title);
    
    return (

      
      
      <div className="intrinsic-container intrinsic-container-16x9">
        {/* <section className='youtubeComponent-wrapper'> */}
          <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
        {/* </section> */}
        
      </div>
    ) 
  }
}

// YouTube.propTypes = {
//   YTid: PropTypes.string.required,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   onStateChange: PropTypes.func
// }

export default Player;