import { Request, Response, NextFunction, Express } from "express"
import { AppError } from "../errors"


const errorMiddleware = (app: Express) => {

    app.use((err: AppError, req: Request, res: Response, _: NextFunction) => {

        if(err instanceof AppError) {
    
            return res.status(err.statusCode).json({
                status: "error",
                message: err.message
            })
        }
    
        console.log(err)
    
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    })
}

export default errorMiddleware
