import { Error } from "mongoose"
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

export const handleMongooseError =(err:Error.ValidationError):TGenericErrorResponse=>{
    const statusCode = 400;
    
    const errorSources:TErrorSource = Object.values(err.errors).map((val) => 
    {return{
        path:val?.path,
        message:val?.message
    }});

    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    };
}
