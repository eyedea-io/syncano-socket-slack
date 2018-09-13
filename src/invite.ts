import Syncano from '@syncano/core'
import Validator from '@syncano/validate'
import axios from 'axios'

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
  } catch (err) {
    return response.json({message: err.message}, 400)
  }
}
