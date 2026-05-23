import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";

export function useShopifyProducts(query?: string) {
  return useQuery({
    queryKey: ["shopify-products", query],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20, query: query || null });
      const edges: ShopifyProduct[] = data?.data?.products?.edges || [];
      return edges;
    },
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const product = data?.data?.product;
      if (!product) return null;
      return { node: product } as ShopifyProduct;
    },
    enabled: !!handle,
  });
}
