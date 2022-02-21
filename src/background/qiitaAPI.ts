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
    let userInfo: Qiita.User
    const userDetailEndpoint = `${QIITA_API_ENDPOINT}/users/${userID}`;
    try {
      const response = await fetch(userDetailEndpoint);
      userInfo = await response.json();
    } catch(err) {
      console.log(err);
    }
    return userInfo;
  }

  checkToken() {
    return this.accessToken;
  }
}
