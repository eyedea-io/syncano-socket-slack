import axios from 'axios'
import Syncano from '@syncano/core'
<<<<<<< HEAD
import Validator from '@syncano/validate'

export default async (ctx) => {
  const {response} = new Syncano(ctx)
  const validator = new Validator(ctx)

  try {
    await validator.validateRequest()
  } catch (err) {
    return response.json(err.messages, 400)
  }

  const slackUrl = `https://slack.com/api/users.admin.invite?token=${ctx.args.token}&email=${ctx.args.email}`

  try {
    const resp = await axios.get(slackUrl)

    if (resp.data && resp.data.error) {
      return response.json({message: resp.data.error}, 400)
    }
    return response.json({message: 'Successfuly invited!'})
=======

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
>>>>>>> 5bfb563e2b0644c6292318c94fe5bd60ef1916bf
  } catch (err) {
    return response.json({message: err.message}, 400)
  }
}
