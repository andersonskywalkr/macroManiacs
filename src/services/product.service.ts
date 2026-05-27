import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapProduct, unwrap } from "@/api/mappers";
import type { ApiEnvelope, ApiProduct } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockProduct } from "@/mocks/product.mock";
import type { Product } from "@/types/product";

const mockProductService = {
  getByBarcode: async (_barcode: string): Promise<Product> => mockProduct,
  createManual: async (product: Product): Promise<Product> => ({
    ...product,
    source: "manual",
  }),
};

const apiProductService = {
  getByBarcode: async (barcode: string): Promise<Product> => {
    const response = await api.get<ApiEnvelope<ApiProduct>>(endpoints.products.barcode(barcode));
    return mapProduct(unwrap(response.data));
  },
  createManual: async (product: Product): Promise<Product> => {
    const response = await api.post<ApiEnvelope<ApiProduct>>(endpoints.products.manual, product);
    return mapProduct(unwrap(response.data));
  },
};

export const productService = USE_MOCKS ? mockProductService : apiProductService;
