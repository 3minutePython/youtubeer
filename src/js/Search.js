import React from 'react';
import '../css/App.css';




class Search extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      isLoading: true,
      videosSearch: [],

    };
  }
  
  submitQuery(e){
    e.preventDefault();
    
    const API = 'AIzaSyDUl8uWs-HIm_EUGVJcZGatOrBXbxdLpDM'
    const result = 35
    var qry = 'superman'
    
    console.log(this.refs.qry.value);
    qry = this.refs.qry.value;
    var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&q=${qry}&part=snippet&maxResults=${result}`;
    this.fetchData(finalURL);
    
  }
  
  fetchData(finalURL){
    console.log('Fetching data...')
    
    this.setState({
      isLoading: true,
      videosSearch: []
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
    .then(videosSearch => this.setState({
      videosSearch,
      isLoading: false
    }))
    .catch((error) => {
      console.error(error);
    })
  }
  
  render() {
    return(
      <div>

        

        <form onSubmit={(e) => {this.submitQuery(e)}}>
            <div className="row padSearch">
                <div className="col-xs-5">
                    <div className="input-group">
                        <input ref="qry" type="text" className="form-control" placeholder="Search&hellip;" />
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-default"
                              onClick={(e) =>{this.submitQuery(e)}}>Go</button>
                        </span>
                    </div>
                </div>
            </div>
        </form>

        
        {/* search results */}
        <div className="pre">
          {
            this.state.videosSearch.map(vid => {
              return (
                  <img style={{cursor: 'pointer'}} src={`${vid.thumbnail}`} alt={vid.id} onClick={e => this.props.insertSongToQueue(vid)} />
                // {/* <div key={vid.id} >
                //   <img src={`${vid.thumbnail}`} alt={vid.id} onClick={e => this.props.insertSongToQueue(vid)} />
                //     <p>{vid.title}</p>
                // </div> */}
                
              )
            })
          }
          
        </div>
        {/* end search results */}

      </div>
    )
  }
}

export default Search;