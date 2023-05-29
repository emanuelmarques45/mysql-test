import { AES, enc } from "crypto-js"

const SECRET_KEY = "process.env.SECRET_KEY"

function encryptString(string: string) {
  return AES.encrypt(string, SECRET_KEY).toString()
}

function decryptString(string: string) {
  return AES.decrypt(string, SECRET_KEY).toString(enc.Utf8)
}

function encryptObject(object: object) {
  return AES.encrypt(JSON.stringify(object), SECRET_KEY).toString()
}

function decryptObject(object: string) {
  return JSON.parse(AES.decrypt(object, SECRET_KEY).toString(enc.Utf8))
}

const secret = {
  encryptString,
  decryptString,
  encryptObject,
  decryptObject,
}

export default secret
