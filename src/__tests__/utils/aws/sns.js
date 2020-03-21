import AWS from 'aws-sdk'

export const createTopic = async topicName => {
  const params = {
    Name: topicName + '-' + process.env.STAGE
  }

  const SNS = getSNSConfig()
  return await SNS.createTopic(params).promise()
}

export const deleteTopic = async topicName => {
  const params = {
    TopicArn: `arn:aws:sns:${process.env.REGION}:${process.env.AWS_ACCOUNT_ID}:${topicName}-${process.env.STAGE}`
  }

  const SNS = getSNSConfig()
  return await SNS.deleteTopic(params).promise()
}

const getSNSConfig = () => {
  AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
  })

  return new AWS.SNS({ endpoint: process.env.AWS_SNS_ENDPOINT })
}
