import { QiitaAPIClient } from '../qiitaAPI'

const token = 'token1234';
const client = new QiitaAPIClient(token);

test('Initialization', () => {
  expect(client.accessToken).toBe(token);
});

test('CheckToken()', () => {
  expect(client.checkToken()).toBe(token);
});
