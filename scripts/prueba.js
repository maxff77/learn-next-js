const bcrypt = require("bcrypt")
const { v4 : uuidv4 } =  require("uuid")

const funcion = async ()=>{
    let uuid = uuidv4()
let password1 = "123456"
let hashpassword1 = await bcrypt.hash(password1,10)
let password2 = "123456"
let hashpassword2 = await bcrypt.hash(password2,10)
let passwordMatch = await bcrypt.compare('123456',hashpassword2)

console.log(uuid)
console.log(hashpassword1)
console.log(hashpassword2)
console.log(passwordMatch)
}

funcion()