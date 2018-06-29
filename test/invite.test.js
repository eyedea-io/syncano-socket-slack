/* global describe it */
import {assert} from 'chai'
import {run, generateMeta} from '@syncano/test'

describe('invite', function () {
  const meta = generateMeta()

  it('wrong API key', async () => {
    const res = await run('invite', {args: {email: 'test@test.pl'}, meta})
    assert.propertyVal(res, 'code', 400)
  })
})
