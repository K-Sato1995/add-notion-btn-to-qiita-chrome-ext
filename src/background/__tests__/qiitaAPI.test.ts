import { QiitaAPIClient } from '../qiitaAPI'

const token = 'token1234'
const client = new QiitaAPIClient(token)
const userInfo = { ok: true, name: 'k-sato', description: 'k-sato' }

// https://benjaminjohnson.me/mocking-fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(userInfo),
  })
) as jest.Mock


test('Initialization', () => {
  expect(client.accessToken).toBe(token)
})

test('CheckToken()', () => {
  expect(client.checkToken()).toBe(token)
})

test('fetchUserInfo()', async () => {
  const result = await client.fetchUser('randomId')
  expect(result).toBe(userInfo)
  expect(fetch).toHaveBeenCalledTimes(1)
})
