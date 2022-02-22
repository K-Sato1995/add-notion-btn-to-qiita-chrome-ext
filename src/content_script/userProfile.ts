import { QIITA_OPTIONS_CLASS_NAME } from '../consts'
import type { Qiita, UserProfileResponse } from '../types'

// https://stackoverflow.com/questions/36798005/append-multiple-items-in-javascripts
export const insertUserProfile = (userData: Partial<Qiita.User>) => {
  const mainBody = document.getElementsByClassName(QIITA_OPTIONS_CLASS_NAME)[0]

  const userContainer = document.createElement('div') 
  userContainer.setAttribute('id', 'user-profile-container')
  // userContainer.innerText = description;
  // Construct user's profile.
  appendChildren(userContainer,createChildren(userData))
  mainBody.prepend(userContainer)
}

const createChildren = (userData: Partial<Qiita.User>) => {
  const { id, name, description } = userData
  // UserProfileTop
  const userProfileTop = document.createElement('div')
  userProfileTop.setAttribute('id', 'user-profile-top')

  // Create doms
  const userName = document.createElement('div')
  const userDescription = document.createElement('div')
 
  // Set Attributes
  userName.setAttribute('id', 'user-name')
  userDescription.setAttribute('id', 'user-description')

  // Set Values
  userName.innerText = name
  userDescription.innerText = description

  appendChildren(userProfileTop, [userName, userDescription])

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
