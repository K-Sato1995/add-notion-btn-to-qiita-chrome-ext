import { QIITA_CONTENT_WRAPPER_CLASS_NAME, QIITA_BASE_URL } from '../consts'
import type { Qiita, UserProfileResponse } from '../types'

// https://stackoverflow.com/questions/36798005/append-multiple-items-in-javascripts
export const insertUserProfile = (userData: Partial<Qiita.User>) => {
  // The class name of the box I wanna access to is dinamically defined. Thereore, I'm getting the wrapper first.
  const mainBody = document.getElementsByClassName(QIITA_CONTENT_WRAPPER_CLASS_NAME)[0].firstChild

  const userContainer = document.createElement('div') 
  userContainer.setAttribute('id', 'user-profile-container')
  // userContainer.innerText = description;
  // Construct user's profile.
  appendChildren(userContainer,createChildren(userData))

  mainBody.appendChild(userContainer) 
}

const createChildren = (userData: Partial<Qiita.User>) => {
  const { id, name, description, profile_image_url: userProfileImgUrl } = userData
  // UserProfileTop
  const userProfileTop = document.createElement('div')
  const userName = document.createElement('div')
  const userDescription = document.createElement('div')
  const userID = document.createElement('a')
  const userImg = document.createElement('img') 
  
 
  // Set Attributes
  userProfileTop.setAttribute('id', 'user-profile-top')
  userImg.setAttribute('id', 'user-img')
  userName.setAttribute('id', 'user-name')
  userDescription.setAttribute('id', 'user-description')
  userID.setAttribute('id', 'user-id')

  // Set Values
  userImg.src = userProfileImgUrl
  userName.innerText = name
  userDescription.innerText = description
  userID.innerText = `@${id}`
  userID.href = `${QIITA_BASE_URL}/${id}`

  appendChildren(userProfileTop, [userImg, userName, userDescription, userID])

  return [userProfileTop]
}

const appendChildren = (parentNode: HTMLElement, domNodes: HTMLElement[]) => {
  domNodes.forEach(ele => {
    parentNode.appendChild(ele)
  })
}

export const handleUserProfileResponse = (response: UserProfileResponse) => {
  if (response.type == 'OK') {
    const { userData } = response
    insertUserProfile(userData)
  } else {
    alert(response.msg)
  }
}
