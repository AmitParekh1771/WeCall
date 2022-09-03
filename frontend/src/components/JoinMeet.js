import React from 'react'

const JoinMeet = () => {
  return (
    <>
      <div class='section meet-join-section'>
        <div class='outer-container-1360'>
          <div class='meet-join-container'>
            <div class='large-title-text'>Hi &lt;username&gt;!</div>
            <div class='medium-title-text'>
              Connect anyone, anywhere, anytime. Simple &amp; easy to use video
              calling service absolutely free.
            </div>
            <div class='hr'></div>
            <div class='medium-title-text'>
              Create a new meeting / Join existing meeting with code or link.
            </div>
            <div class='user-action-container medium-title-text'>
              <div class='new-meet-btn large-btn'>
                <div class='fa-solid'></div>
                <div>Create meet</div>
              </div>
              <div class='join-meet-container'>
                <form id='email-form' name='email-form' class='meet-join-form'>
                  <input
                    type='text'
                    class='join-input w-input'
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
                    class='join-btn large-btn medium-title-text w-button'
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

export default JoinMeet
