
export const getCustomerDataQuery= /* GraphQL */ `
query getCustomerData($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken) {
    id
    email
  }
}`
