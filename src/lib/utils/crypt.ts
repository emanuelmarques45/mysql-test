import { AES, enc } from "crypto-js"

function encryptString(string: string) {
  return AES.encrypt(string, process.env.SECRET_KEY).toString()
}

function decryptString(string: string) {
  return AES.decrypt(string, process.env.SECRET_KEY).toString(enc.Utf8)
}

function encryptObject(object: object) {
  return AES.encrypt(JSON.stringify(object), process.env.SECRET_KEY).toString()
}

function decryptObject(object: string) {
  return JSON.parse(
    AES.decrypt(object, process.env.SECRET_KEY).toString(enc.Utf8)
  )
}

const secret = {
  encryptString,
  decryptString,
  encryptObject,
  decryptObject,
}

export default secret
