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
    return userInfo;
  }

  checkToken() {
    return this.accessToken;
  }
}
