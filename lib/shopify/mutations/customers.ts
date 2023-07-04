import { Customer } from "@/types/Customer";
import { shopifyFetch } from "..";
type CustomerUserMutationError = {
    field: string[];
    message: string;
    code: string;
};

/**
 * Create new customers
 */
type ShopifyCreateNewCustomer = {
    data: {
        customerCreate: {
            customer: Customer;
            customerUserErrors: CustomerUserMutationError[];
        };
    };
    variables: { input: Customer };
    errors?: [{ message: string }];
};


const createNewCustomerMutation = /* GraphQL */ `
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer {
                firstName
                lastName
                email
                phone
                acceptsMarketing
            }
            customerUserErrors {
                field
                message
                code
            }
        }
    }
`;

export async function createNewCustomer(input: Customer) {
    return shopifyFetch<ShopifyCreateNewCustomer>({
        query: createNewCustomerMutation,
        variables: {
            input,
        },
    });
}

/**
 * Create New Access TOKEN
 */
type ShopifyCreateNewAccessToken = {
    data: {
        customerAccessTokenCreate: {
            customerAccessToken: {
                accessToken: string;
                expiresAt:string;
            };
            customerUserErrors: CustomerUserMutationError;
        };
    };
    variables: {
        input: {
            email: string;
            password: string;
        };
    };
    errors?: [{ message: string }];
};
const createNewAccessTokenMutation = /* GraphQL */ `
    mutation customerAccessTokenCreate(
        $input: CustomerAccessTokenCreateInput!
    ) {
        customerAccessTokenCreate(input: $input) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                message
            }
        }
    }
`;

export async function createNewCustomerAccessToken(input: {
    email: string;
    password: string;
}) {
    return shopifyFetch<ShopifyCreateNewAccessToken>({
        query: createNewAccessTokenMutation,
        variables: {
            input,
        },
    });
}