/* global describe it expect jest */
import mockAxios from 'axios'
import {run} from '@syncano/test'

describe('invite', function () {
  it('successful invitation', async () => {
    mockAxios.get = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({status: 200})
    )

    const result = await run('invite', {args: {email: 'test@test.pl'}})
    expect(result).toHaveProperty('code', 200)
  })

  it('general error', async () => {
    mockAxios.get = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error({
        status: 400,
        message: 'Network error!'
      }))
    )

    const result = await run('invite', {args: {email: 'test@test.pl'}})
    expect(result).toHaveProperty('code', 400)
  })

  it('wrong API key', async () => {
    mockAxios.get = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          ok: false,
          error: 'invalid_auth'
        },
        status: 200,
        statusText: 'OK'
      })
    )
    const result = await run('invite', {args: {email: 'test@test.pl'}})

    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', 'invalid_auth')
  })
})
