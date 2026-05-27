import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapProduct } from "@/api/mappers";
import type { ApiProduct } from "@/api/dtos";
import { AppError } from "@/api/errors";
import { apiGet } from "@/lib/api";
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
    const response = await apiGet<ApiProduct>(endpoints.products.barcode(barcode));
    return mapProduct(response);
  },
  createManual: async (_product: Product): Promise<Product> => {
    throw new AppError(
      "Cadastro manual de produto ainda nao existe no backend. Use check-in manual de macros.",
      "not_found",
      404,
      { todo: "Criar endpoint de produto manual ou manter apenas POST /checkins type=manual_macros." },
    );
  },
};

export const productService = USE_MOCKS ? mockProductService : apiProductService;
