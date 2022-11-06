import { deleteProductService } from "../../services/products/deleteProduct.service"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const deleteProductController = async (req: Request, res: Response) => {

    try {

        const id: string = req.params.id

        await deleteProductService(id)

        return res.status(204).json()

    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { deleteProductController }
