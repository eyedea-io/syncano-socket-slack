/* global describe it expect jest */
import mockSlack from 'slack'
import {run} from '@syncano/test'

describe('list', function () {
  const args = {token: 'dummy token'}
  it('successful list', async () => {
    mockSlack.users.list = jest.fn()
    mockSlack.users.list.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        members: [{
          id: 123,
          name: 'Maciej'
        }]
      })
    )

    mockSlack.users.profile.get = jest.fn()
    mockSlack.users.profile.get.mockImplementationOnce(() =>
      Promise.resolve({
        id: 123,
        name: 'Maciej'
      })
    )

    const result = await run('list', {args})
    expect(result).toHaveProperty('code', 200)
  })

  it('error', async () => {
    mockSlack.users.list = jest.fn()
    mockSlack.users.list.mockImplementationOnce(() =>
      Promise.reject(new Error({
        message: 'Something went wrong!'
      })
    ))

    const result = await run('list', {args})
    expect(result).toHaveProperty('code', 400)
  })
})
