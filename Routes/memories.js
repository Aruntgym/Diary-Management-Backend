import express from "express";
import { deleteMemory, editMemory, getAllMemories, getMemoriesId, postNewMemories } from "../Controllers/memories";
//Initillizing the router
const router = express.Router();

router.get("/all", async(req, res)=>{
  try{
    const datadb= await getAllMemories(req);
    if(datadb.length === 0){
      return res
      .status(400)
      .json({messge:"No data available"})
    }
    res
    .status(200)
    .json({data: datadb})
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({message: "Internal server error"})
  }
})

router.get("/all/:id", async (req, res)=>{
  try {
    const {id} = req.params;
    const memodb = await getMemoriesId(id);
    if(!memodb){
      return res.status(400).json({message: "No data available"})
    }
    return res.status(200).json({data: memodb})
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({message: "Internal server error"})
  }
})
 
//adding new memory
router.post("/add", async(req, res)=> {
  try {
    const newMemory = req.body
    console.log(newMemory);
    if(!newMemory){
      return res.status(400).json({message:"No data provided"})
    }
    const result = await postNewMemories(newMemory);
    if(!result.acknowledged){
      return res.status(400).json({message: "Error posting data"})
    }
    res.status(201).json({data:result})
  } catch (error) {
    console.log(error);
    res
    .status(500)
    .json({message: "Internal server error"});
  }
})

router.put("/edit/:id", async(req, res)=>{
  try{
    const {id} = req.params;
    const updatedMemory = req.body
    if(id || !updatedMemory){
      return res.status(400).json({message:"Wrong Request"})
    }
    const result = await editMemory(id, updatedMemory);
    if(!result.lastErrorObject.updatedExisting){
      return res.status(400).json({message: "Error editing data"})
    }
    return res.status(200).json({data:updatedMemory, status:result})
  }catch(error){
    console.log(error);
    res
    .status(500)
    .json({message:"Internal server error"});
  }
})

router.delete("/delete/:id", async(req, res)=>{
  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).json({message: "Wrong Request"})
    }

    const result = await deleteMemory(id);
    if(!result.deletedCount<=0){
      return res.status(400).json({message:"Error deleting data"})
    }
    return res.status(200).json({data:result})
  } catch (error) {
    console.log(error);
    res
    .status(500)
    .json({message:"Internal server error"});
  }
})

export const memoryRouter = router;
