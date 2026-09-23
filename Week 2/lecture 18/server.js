
const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    try{
        throw new Error("something went wrong");
    }catch(error){
        res.status(500).json({success:false, message:"something went wrong"});
    }
})



app.get("/:id",(req , res)=>{
    const id = req.params.id;
    try{
        if (id ==="1234"){
            res.send("valid id ")
        }else{
            throw new Error("Invalid id")
        }
    }catch(error){
        res.status(400).json({ success: false, message: "Invalid ID" });
    }
})

app.use((req,res)=>{
    res.status(404).json({success:false, message:"Pafe not found"})
})


app.listen(PORT,()=> console.log('server is running'));
