interface IProductRequest {
  title: string;
  description?: string;
  price: number;
  category: string;
}

interface IProductUpdateRequest {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
}

export { IProductRequest, IProductUpdateRequest };
