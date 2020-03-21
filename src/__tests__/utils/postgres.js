import models from '../../entities/models'

export const truncate = async () => {
  await models.User.destroy({ truncate: { cascade: true }, force: true })
}
