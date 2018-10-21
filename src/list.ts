import Syncano from '@syncano/core'
import Validator from '@syncano/validate'
import {default as slack} from 'slack'

export default async (ctx) => {
  const {response} = new Syncano(ctx)
  const validator = new Validator(ctx)

  try {
    await validator.validateRequest()
  } catch (err) {
    return response.json(err.messages, 400)
  }

  try {
    const data = await slack.users.list({token: ctx.args.token})
    const members = data.members.filter((member) => !member.is_bot)
    response.json({members})
  } catch (err) {
    response.json({message: err.message}, 400)
  }
}
