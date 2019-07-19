import React from 'react';
import './Track.css';

export class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{/* Track name */}</h3>
          <p>{/* Track artist */} | {/* Track album */}</p>
        </div>
        <button className="Track-action">{/* + or - */}</button>
      </div>
    )
  }
}