import { QIITA_API_ENDPOINT } from '../consts'
import type { Qiita } from '../types'

export class QiitaAPIClient {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
  
  static initializeClient(token): QiitaAPIClient {
    return new QiitaAPIClient(token);
  }

  async fetchUser(userID: string): Promise<Partial<Qiita.User>> {
    const userDetailEndpoint = `${QIITA_API_ENDPOINT}/users/${userID}`;
    const response = await fetch(userDetailEndpoint);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const userInfo = await response.json();
    console.log(userInfo)
    return userInfo;
  }

  checkToken() {
    return this.accessToken;
  }
}

// set your token
// const client = new QiitaAPIClient('14f975282f1fd61e769f8feb607509c1a8a61b9c');

// Qiita.setEndpoint('https://qiita.com');

export const fetchUser = () => {

  // set your token
  const client = new QiitaAPIClient('14f975282f1fd61e769f8feb607509c1a8a61b9c');
}
