const paginationFragment = /* GraphQL */ `
  fragment pageInfo on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
  }
`
export default paginationFragment