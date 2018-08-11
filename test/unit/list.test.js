/* global describe it expect jest */
import mockSlack from 'slack'
import {run} from '@syncano/test'

describe('list', function () {
  const args = {token: 'dummy token'}
  it('successful list', async () => {
    const members = [{
      id: 123,
      name: 'Maciej'
    }]

    mockSlack.users.list = jest.fn()
    mockSlack.users.list.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        members
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
    expect(result.data).toHaveProperty('members', members)
  })

  it('error', async () => {
    const message = 'Something went wrong!'
    mockSlack.users.list = jest.fn()
    mockSlack.users.list.mockImplementationOnce(() =>
      Promise.reject(new Error(message)
    ))

    const result = await run('list', {args})
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', message)
  })
})
