import { client } from "../db.js";


export function addUser(userData){
    return client
    .db("memodb")
    .collection("memory")
    .insertOne(userData)
}

export function getUser(email){
    return client
    .db("memodb")
    .collection("memory")
    .findOne({email:email})
}

export function generateToken(id){
    return jwt.sing(
        {id},
        process.env.SECRET_KEY,
        {expiresIn:"30d"}
    )
}