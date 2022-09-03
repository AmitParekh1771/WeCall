import React from 'react'

const Join = (props) => {
  return (
    <>
      <div className='section meet-join-section'>
        <div className='outer-container-1360'>
          <div className='meet-join-container'>
            <div className='large-title-text'>Hi &lt;username&gt;!</div>
            <div className='medium-title-text'>
              Connect anyone, anywhere, anytime. Simple &amp; easy to use video
              calling service absolutely free.
            </div>
            <div className='hr'></div>
            <div className='medium-title-text'>
              Create a new meeting / Join existing meeting with code or link.
            </div>
            <div className='user-action-container medium-title-text'>
              <div className='new-meet-btn large-btn'>
                <div className='fa-solid'></div>
                <div>Create meet</div>
              </div>
              <div className='join-meet-container'>
                <form
                  id='email-form'
                  name='email-form'
                  className='meet-join-form'
                >
                  <input
                    type='text'
                    className='join-input w-input'
                    maxlength='256'
                    name='code'
                    data-name='code'
                    placeholder='code or link'
                    autocomplete='off'
                    id='code-2'
                  />
                  <button
                    type='submit'
                    data-wait='Please wait...'
                    className='join-btn large-btn medium-title-text w-button'
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Join
