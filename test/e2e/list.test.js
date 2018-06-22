/* global describe it expect */
import {run} from '@syncano/test'

describe('list', function () {
  it('successful list', async () => {
    const result = await run('list', {args: {token: process.env.E2E_SLACK_API_KEY}})
    expect(result).toHaveProperty('code', 200)
  })

  it('wrong API key', async () => {
    const result = await run('list', {args: {token: 'wrong token'}})
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', 'invalid_auth')
  })
})
