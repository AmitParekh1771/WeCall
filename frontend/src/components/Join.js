import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const Join = () => {
  const navigate = useNavigate()
  function handleJoinThruCode(event) {
    event.preventDefault()
    const roomId = event.target.elements.code.value
    navigate(`/lobby/${roomId}`)
  }

  function handleNewMeetButton() {
    const uniqueId = uuidv4()
    console.log(uniqueId)
    navigate(`/room/${uniqueId}?attribute=host`)
  }
  let name,picture,email
  if(localStorage.getItem('name') != null)
  {
    name = localStorage.getItem('name')
    picture = localStorage.getItem('picture')
    email = localStorage.getItem('email')
    var noQuotes = name.split('"').join('')
  }
  name = noQuotes
  console.log(name)
  console.log(picture)
  console.log(email)
  return (
    <>
      <div className='section meet-join-section'>
        <div className='outer-container-1360'>
          <div className='meet-join-container'>
            <div className='large-title-text'>Hi {name}!</div>
            <div className='medium-title-text'>
              Connect anyone, anywhere, anytime. Simple &amp; easy to use video
              calling service absolutely free.
            </div>
            <div className='hr'></div>
            <div className='medium-title-text'>
              Create a new meeting / Join existing meeting with code or link.
            </div>
            <div className='user-action-container medium-title-text'>
              <div className='new-meet-btn large-btn' onClick={handleNewMeetButton}>
                <div className='fa-solid'></div>
                <div>Create meet</div>
              </div>
              <div className='join-meet-container'>
                <form
                  id='email-form'
                  name='email-form'
                  className='meet-join-form'
                  onSubmit={handleJoinThruCode}
                >
                  <input
                    type='text'
                    className='join-input w-input'
                    maxLength={256}
                    name='code'
                    data-name='code'
                    placeholder='code or link'
                    autoComplete='off'
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