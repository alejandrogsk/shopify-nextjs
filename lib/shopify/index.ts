import { isShopifyError } from "../type-guards";


type ExtractVariables<T> = T extends { variables: object }
    ? T["variables"]
    : never;

const key: string = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
export const endpoint = `${process.env.SHOPIFY_STORE_DOMAIN!}`;
export async function shopifyFetch<T>({
    query,
    variables,
    headers,
    cache = 'force-cache'
}: 
{
    query: string;
    variables?: ExtractVariables<T>;
    headers?: HeadersInit;
    cache?: RequestCache;
}): Promise<{ status: number; body: T } | never> {
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": key,
                ...headers,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables }),
            }),
            cache
        });

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (e) {
        if (isShopifyError(e)) {
            throw {
                status: e.status || 500,
                message: e.message,
                query,
            };
        }

        throw {
            error: e,
            query,
        };
    }
}







