import { createProductService } from "../../services/products/createProduct.service"
import { IProductRequest } from "../../interfaces/products"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const createProductController = async (req: Request, res: Response) => {

    try {

        const product: IProductRequest = req.body

        const new_product = await createProductService(product)

        return res.status(201).json(new_product)
    
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { createProductController }
