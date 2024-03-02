import { Router,Request,Response } from "express";
const userRouter = Router();
userRouter.get("/user/name",(req:Request,res:Response)=>{
    res.json({"User":"SAYMON"})
});
export default userRouter;