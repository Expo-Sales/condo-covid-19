import AWS from 'aws-sdk'

export const clear = async (bucket, key) => {
  const s3 = getS3Config()
  const params = { Bucket: bucket, Key: key }
  await s3.deleteObject(params)
}

function getS3Config() {
  AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
  })

  return new AWS.S3({
    apiVersion: '2006-03-01',
    region: process.env.REGION,
    endpoint: process.env.AWS_S3_ENDPOINT,
    s3ForcePathStyle: true
  })
}
