import { QiitaAPIClient } from '../qiitaAPI'

const token = 'token1234';

test('Initialization', () => {
  const client = new QiitaAPIClient(token);
  expect(client.accessToken).toBe(token);
});


test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});