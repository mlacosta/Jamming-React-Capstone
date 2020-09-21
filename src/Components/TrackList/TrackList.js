import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class Tracklist extends React.Component{
    
    render(){
        return (
            <div className="TrackList"> 
                {/*this is making trouble*/

                    this.props.tracks.map(
                    (track) =>{
                        return <Track track={track} onAdd = {this.props.onAdd} onRemove = {this.props.onRemove} isRemoval  = {this.props.isRemoval}/>
                    })
                }
            </div>
        )
    }

}

export default Tracklist;