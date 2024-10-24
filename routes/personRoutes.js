const express=require('express')
const router=express.Router();
const Person=require('./../models/person');


router.post('/',async (req,res)=>{
    try{
        const data=req.body

        const newPerson=new Person(data);

        const response=await newPerson.save();

        console.log('sata saved')
        res.status(200).json(response);

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})


router.get('/',async(req,res)=>{
    try{
        const data =await Person.find();
        console.log("data fetched")
        res.status(200).json(data)

    }catch(error){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }

})


router.get('/:worktype',async(req,res)=>{
    try{
        const worktype=req.params.worktype;
        if(worktype=='chef'|| worktype=='manager'|| worktype=='waiter'){
            const response=await Person.find({work:worktype});
        console.log('data fetched')
        res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work type'});
        }
    }catch(err){
        console.log(err)
        res.status(404).json('internal server error')
    }
    })


    router.put('/:id',async (req,res)=>{
        try{
            const personID=req.params.id;
            const data=req.body;

            const response= await Person.findByIdAndUpdate(personID,data,{
                new:true,
                runValidators:true,
            })

            if(!response){
                return res.status(404).json({error:'person not found'})
            }


            console.log('data updated')
            res.status(200).json(response)

        }catch(err){
            console.log(err)
            res.status(500).json({error:'person not found'})

        }
    })

    module.exports=router;
