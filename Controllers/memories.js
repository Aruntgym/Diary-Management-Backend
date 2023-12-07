import { ObjectId } from "bson";
import {client} from "../db.js";

export function getAllMemories(req){
    return client
    .db("memodb")
    .collection("memory")
    .find(req.query)
    .toArray();
}

export function getMemoriesId(id){
    return client
    .db("memodb")
    .collection("memory")
    .findOne({_id: new ObjectId(id)})
}

export function postNewMemories(){
    return client
    .db("memodb")
    .collection("memory")
    .insertOne(data)
}

export function editMemory(id, data){
    return client
    .db("memodb")
    .collection("memory")
    .findOneAndUpdate({_id: new ObjectId(id)},{$set:data})
}

export function deleteMemory(id){
    return client
    .db("memodb")
    .collection("memory")
    .deleteOne({_id: new ObjectId(id)})
}