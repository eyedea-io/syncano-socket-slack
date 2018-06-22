import slack from 'slack'
import Syncano from '@syncano/core'
import Validator from '@syncano/validate'

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
    response.json({members: data.members})
  } catch (err) {
    response.json({message: err.message}, 400)
  }
}
