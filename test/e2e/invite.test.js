/* global describe it expect */
import {run} from '@syncano/test'

describe('invite', function () {
  it('already invited', async () => {
    const args = {email: 'm@kucharz.net', token: process.env.E2E_SLACK_API_KEY}
    const result = await run('invite', {args})
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', 'already_invited')
  })

  it('wrong API key', async () => {
    const result = await run('invite', {args: {email: 'test@test.pl', token: 'dummy token'}})

    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', 'invalid_auth')
  })
})
