import axios from 'axios'
import Syncano from '@syncano/core'

export default async (ctx) => {
  const {response} = new Syncano(ctx)
  const slackUrl = 'https://slack.com/api/users.admin.invite'

  try {
    const resp = await axios.get(slackUrl, {
      params: {
        token: ctx.config.SLACK_API_KEY,
        email: ctx.args.email,
        set_active: true
      }})

    if (!resp.data.ok) {
      return response.json({message: resp.data.error}, 400)
    }
    return response('', 204)
  } catch (err) {
    return response.json({message: err.message}, 400)
  }
}
