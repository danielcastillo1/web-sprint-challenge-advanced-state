import React from 'react'
import { connect } from 'react-redux'

 function Message(props) {
  return <div id="message">Nice job!</div>
}

const mapStateToProps = () => {
  return {
    message: StaticRange.messsage
  }
}

export default connect(mapStateToProps, {})(Message)