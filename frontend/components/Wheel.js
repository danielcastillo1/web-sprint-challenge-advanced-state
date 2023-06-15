import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel({ index, moveClockwise, moveCounterClockwise }) {

  const handleClockWise = () => {
    moveClockwise((index + 1) % 6);
  }

  const handleCounterClockWise = () => {
    moveCounterClockwise((index + 5) % 6 )
  }


  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={index === 0 ? "cog active": "cog"} style={{ "--i": 0 }}>{index === 0 ? "B": ""}</div>
        <div className={index === 1 ? "cog active": "cog"} style={{ "--i": 1 }}>{index === 1 ? "B": ""}</div>
        <div className={index === 2 ? "cog active": "cog"} style={{ "--i": 2 }}>{index === 2 ? "B": ""}</div>
        <div className={index === 3 ? "cog active": "cog"} style={{ "--i": 3 }}>{index === 3 ? "B": ""}</div>
        <div className={index === 4 ? "cog active": "cog"} style={{ "--i": 4 }}>{index === 4 ? "B": ""}</div>
        <div className={index === 5 ? "cog active": "cog"} style={{ "--i": 5 }}>{index === 5 ? "B": ""}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={handleCounterClockWise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={handleClockWise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    index: state.wheel.index
  };
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);
