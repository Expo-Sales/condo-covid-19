import { GraphQLModule } from '@graphql-modules/core'

import { UserModule } from './user/module'
import { AuthModule } from './auth/module'
import { UserDeviceModule } from './user-device/module'

export const graphql = new GraphQLModule({
  imports: [UserModule, AuthModule, UserDeviceModule]
})

export default graphql
