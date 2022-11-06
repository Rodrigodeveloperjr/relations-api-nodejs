import { updateProductService } from "../../services/products/updateProduct.service"
import { IProductUpdateRequest } from "../../interfaces/products"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const updateProductController = async (req: Request, res: Response) => {

    try {

        const id: string = req.params.id

        const product: IProductUpdateRequest = req.body

        const updated_product = await updateProductService(product, id)

        return res.json(updated_product)

    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { updateProductController }
