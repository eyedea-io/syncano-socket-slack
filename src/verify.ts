import * as S from '@eyedea/syncano'
import * as crypto from 'crypto'
import {default as slack} from 'slack'

interface Args {
  code: string
  state: string
}

class Endpoint extends S.Endpoint {
  async run(
    {response, endpoint}: S.Core,
    {args, config}: S.Context<Args>
  ) {
    const result = await slack.oauth.access({
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      code: args.code,
      // redirect_uri: 'http://explorers-dev-qk.syncano.space/auth/verify/',
    })

    const slackUser = await slack.users.profile.get({
      token: result.access_token,
      user: result.user_id,
      scope: 'users.profile:read',
    })

    const userKey = await endpoint.post(config.USER_SIGNIN_ENDPOINT, slackUser)

    return response(' ', 301, 'plain/text', {
      Location: `${config.REDIRECT_URL}/?user_key=${userKey}`,
    })
  }
}

export default ctx => new Endpoint(ctx)
