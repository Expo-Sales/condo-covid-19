import app from '../initialize'

export const sendToDevice = async (device, payload) => {
  const message = await app()
    .messaging()
    .sendToDevice(device, payload)

  return message
}
