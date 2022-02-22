import { QIITA_OPTIONS_CLASS_NAME } from '../consts'
import type { UserProfileResponse } from '../types'

// https://stackoverflow.com/questions/36798005/append-multiple-items-in-javascripts
export const insertUserProfile = (desc) => {
  const mainBody = document.getElementsByClassName(QIITA_OPTIONS_CLASS_NAME)[0]

  const userContainer = document.createElement("div"); 
  userContainer.setAttribute("id", "user-profile-container");
  userContainer.innerText=desc;
  // Construct user's profile.
  appendChildren(userContainer,createChildren())
  mainBody.prepend(userContainer)
}

const createChildren = () => {
  // UserProfileTop
  const userProfileTop = document.createElement('div')
  userProfileTop.setAttribute("id", "user-profile-top");

  const userName = document.createElement('div')
  userName.setAttribute("id", "user-name");
  userName.innerText="UserNamee";

  userProfileTop.appendChild(userName)
  return [userProfileTop]
}

const appendChildren = (parentNode: HTMLElement, domNodes: HTMLElement[]) => {
  domNodes.forEach(ele => {
    parentNode.appendChild(ele)
  })
}

export const handleUserProfileResponse = (response: UserProfileResponse) => {
  if (response.type == 'OK') {
    const { userData } = response;
    insertUserProfile(userData.description)
  } else {
    alert(response.msg)
  }
}