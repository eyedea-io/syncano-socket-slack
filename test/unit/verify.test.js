/* global describe it expect jest */
import mockSlack from 'slack'
import {run} from '@syncano/test'

describe('verify', function () {

  it('successful verify', async () => {

    mockSlack.oauth.access = jest.fn()
    mockSlack.oauth.access.mockImplementationOnce(() =>
      Promise.resolve({
        access_token: 'test',
        user_id: 1234
      })
    )

    mockSlack.users.profile.get = jest.fn()
    mockSlack.users.profile.get.mockImplementationOnce(() =>
      Promise.resolve({
        id: 123,
        name: 'Maciej'
      })
    )

    require('@syncano/core').__setMocks({
      endpoint: {
        post: jest.fn().mockImplementationOnce(() => {
          return Promise.resolve()
        })
      }
    })

    const args = {
      code: 124
    }

    const result = await run('verify', {args})
    expect(result).toHaveProperty('code', 301)
    // Check headers
  })
})
