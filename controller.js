import schema from './task.model.js'

export async function addTask(req,res){
    const {task,date,completed}=req.body
 
  schema.create({task,date,completed}).then(()=>{
    res.status(201).send({msg:"created"});
  })
   
}

export async function getTask(req,res){
  let task=await schema.find()
  res.status(200).send(task)
}

export function delTask(req,res)
{
    const{id}=req.params;
    const data=schema.deleteOne({_id:id})
    data.then((resp)=>{
        res.status(200).send(resp)
    }).catch((error)=>{
        res.status(404).send(error)
    })
}

export async function getfullDetails(req,res){
  const{id}=req.params;
  // console.log(id);
  let task=await schema.findOne({_id:id})
  console.log(task);
  res.status(200).send(task)
}

export async function editTask(req, res) {
  const { id } = req.params;
  try {
      const updatedData = req.body;
      const value = await schema.updateOne({ _id: id }, { $set: updatedData });
      res.status(200).send(value);
  } catch (error) {
      res.status(404).send(error);
  }
}

// export async function UpdateTask(req, res) {
//   const { id } = req.params;
//   try {
//       const updatedData = req.body;
//       const value = await schema.updateOne({ _id: id }, { $set: updatedData });
//       res.status(200).send(value);
//   } catch (error) {
//       res.status(404).send(error);
//   }
// }