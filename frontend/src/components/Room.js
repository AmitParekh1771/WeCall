import React from 'react'

const Room = () => {
  return (
    <>
      <div className='section room-section'>
        <div className='outer-container-1360'>
          <div className='videos-container'>
            <div className='video-block'>
              <div>Video user 1</div>
            </div>
            <div className='video-block'>
              <div>Video user 2</div>
            </div>
          </div>
          <div className='operate-container'>
            <div className='feature-btn'>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn feature-active'>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn'>
              <div className='fa-solid'></div>
            </div>
            <div className='feature-btn feature-active'>
              <div className='fa-solid'></div>
            </div>
            <div className='end-btn'>
              <div className='fa-solid rotate'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Room
