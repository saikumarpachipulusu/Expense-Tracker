const mongoose=require("mongoose");

const dbConnect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://pvrsaikumar2003:saikumarpachipulusu@myprojects.7c8bwco.mongodb.net/?retryWrites=true&w=majority");
        console.log("Db connected Successfully");
    } catch (error){
        console.log(error.message);
        process.exit(1);
    }
}

dbConnect();