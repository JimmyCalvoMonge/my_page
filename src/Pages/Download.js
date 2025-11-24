import React, { Component } from 'react';

class Download extends Component {

  render() {

    const { Pdf, Message} = this.props;

    return (
        <div className = "download-pdf">
          <a href = {Pdf} target = "_blank"> {Message} </a>
        </div>
    );

  }
}

export default Download;