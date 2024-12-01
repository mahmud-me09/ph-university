import {Response } from "express";

export const successResponse = <T>(res:Response, data:{
    statusCode:number,
    success:boolean,
    message:string,
    data: T
})=>{
    return res.status(data?.statusCode).json({
      message: data.message,
      success: data.success,
      data: data.data,
    });
}