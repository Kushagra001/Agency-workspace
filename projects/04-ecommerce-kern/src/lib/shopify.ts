// src/lib/shopify.ts
// For portfolio: exports mock data from products.ts
// For production: replace with real Storefront API client
//
// Production: uncomment and add env vars to connect real Shopify store.
// import { createStorefrontApiClient } from '@shopify/storefront-api-client'
// const client = createStorefrontApiClient({
//   storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
//   apiVersion: '2024-01',
//   publicAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN!,
// })
// Then use: client.request(PRODUCTS_QUERY) instead of the mock array

export { products, formatPrice } from "./products";
export type { Product } from "./products";
