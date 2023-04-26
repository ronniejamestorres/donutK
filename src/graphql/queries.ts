import { gql } from '@apollo/client';

export const GET_ALL_DONUTS = gql`
    query Query {
        donuts {
        id
        name
        img
        description
        price
        ingredients
        qty
        date
        thumbsUp
        thumbsDown
        }
    }
`;
