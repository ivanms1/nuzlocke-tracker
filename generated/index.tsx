import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

/** Create nuzlocke input */
export type CreateNuzlockeInput = {
  description?: InputMaybe<Scalars["String"]>;
  gameId: Scalars["Int"];
  title: Scalars["String"];
  type: NuzlockeType;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Create a nuzlocke */
  createNuzlocke: Nuzlocke;
  /** Delete nuzlockes */
  deleteNuzlockes: Array<Scalars["String"]>;
  signUp: User;
  /** Update nuzlocke */
  updateNuzlocke: Nuzlocke;
};

export type MutationCreateNuzlockeArgs = {
  input: CreateNuzlockeInput;
};

export type MutationDeleteNuzlockesArgs = {
  ids: Array<Scalars["String"]>;
};

export type MutationSignUpArgs = {
  avatar: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUpdateNuzlockeArgs = {
  id: Scalars["String"];
  input: CreateNuzlockeInput;
};

export type Nuzlocke = {
  __typename?: "Nuzlocke";
  createdAt: Scalars["Date"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  pokemons: Array<NuzlockePokemon>;
  title: Scalars["String"];
  type: NuzlockeType;
  updatedAt: Scalars["Date"];
  user: User;
};

export type NuzlockePokemon = {
  __typename?: "NuzlockePokemon";
  createdAt: Scalars["Date"];
  id: Scalars["ID"];
  locationId: Scalars["Int"];
  nickname: Scalars["String"];
  nuzlocke: Nuzlocke;
  pokemonId: Scalars["Int"];
  status: Status;
  types: Array<Scalars["Int"]>;
  updatedAt: Scalars["Date"];
};

/** Paginated list of articles */
export type NuzlockeResponse = {
  __typename?: "NuzlockeResponse";
  nextCursor?: Maybe<Scalars["String"]>;
  prevCursor?: Maybe<Scalars["String"]>;
  results: Array<Nuzlocke>;
  totalCount?: Maybe<Scalars["Int"]>;
};

/** Nuzlocke type */
export enum NuzlockeType {
  Cagelocke = "CAGELOCKE",
  Custom = "CUSTOM",
  Normal = "NORMAL",
  SoulLink = "SOUL_LINK",
}

export type Query = {
  __typename?: "Query";
  getNuzlocke: Nuzlocke;
  /** Get a nuzlocke pokemon by id */
  getNuzlockePokemon: NuzlockePokemon;
  /** Get a list of pokemons from a nuzlocke */
  getNuzlockePokemons: Array<NuzlockePokemon>;
  getUser: User;
  /** Search for nuzlockes */
  searchNuzlockes: NuzlockeResponse;
};

export type QueryGetNuzlockeArgs = {
  id: Scalars["String"];
};

export type QueryGetNuzlockePokemonArgs = {
  id: Scalars["String"];
};

export type QueryGetNuzlockePokemonsArgs = {
  nuzlockeId: Scalars["String"];
};

export type QueryGetUserArgs = {
  userId: Scalars["String"];
};

export type QuerySearchNuzlockesArgs = {
  input?: InputMaybe<SearchInput>;
};

/** Pokemon status */
export enum Status {
  Dead = "DEAD",
  Encountered = "ENCOUNTERED",
  InPc = "IN_PC",
  InTeam = "IN_TEAM",
}

/** Search query input */
export type SearchInput = {
  cursor?: InputMaybe<Scalars["String"]>;
  order?: InputMaybe<SearchOrder>;
  orderBy?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
};

/** Search order */
export enum SearchOrder {
  Asc = "asc",
  Desc = "desc",
}

export type User = {
  __typename?: "User";
  avatar?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  nuzlockes: Array<Nuzlocke>;
};

export type CreateNuzlockeMutationVariables = Exact<{
  input: CreateNuzlockeInput;
}>;

export type CreateNuzlockeMutation = {
  __typename?: "Mutation";
  createNuzlocke: {
    __typename?: "Nuzlocke";
    id: string;
    title: string;
    type: NuzlockeType;
    description?: string | null;
    createdAt: any;
  };
};

export type SearchNuzlockesQueryVariables = Exact<{
  input?: InputMaybe<SearchInput>;
}>;

export type SearchNuzlockesQuery = {
  __typename?: "Query";
  searchNuzlockes: {
    __typename?: "NuzlockeResponse";
    results: Array<{ __typename?: "Nuzlocke"; id: string; title: string }>;
  };
};

export type GetNuzlockeQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetNuzlockeQuery = {
  __typename?: "Query";
  getNuzlocke: {
    __typename?: "Nuzlocke";
    id: string;
    title: string;
    type: NuzlockeType;
    description?: string | null;
    createdAt: any;
  };
};

export const CreateNuzlockeDocument = gql`
  mutation CreateNuzlocke($input: CreateNuzlockeInput!) {
    createNuzlocke(input: $input) {
      id
      title
      type
      description
      createdAt
    }
  }
`;
export type CreateNuzlockeMutationFn = Apollo.MutationFunction<
  CreateNuzlockeMutation,
  CreateNuzlockeMutationVariables
>;

/**
 * __useCreateNuzlockeMutation__
 *
 * To run a mutation, you first call `useCreateNuzlockeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNuzlockeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNuzlockeMutation, { data, loading, error }] = useCreateNuzlockeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNuzlockeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNuzlockeMutation,
    CreateNuzlockeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNuzlockeMutation,
    CreateNuzlockeMutationVariables
  >(CreateNuzlockeDocument, options);
}
export type CreateNuzlockeMutationHookResult = ReturnType<
  typeof useCreateNuzlockeMutation
>;
export type CreateNuzlockeMutationResult =
  Apollo.MutationResult<CreateNuzlockeMutation>;
export type CreateNuzlockeMutationOptions = Apollo.BaseMutationOptions<
  CreateNuzlockeMutation,
  CreateNuzlockeMutationVariables
>;
export const SearchNuzlockesDocument = gql`
  query SearchNuzlockes($input: SearchInput) {
    searchNuzlockes(input: $input) {
      results {
        id
        title
      }
    }
  }
`;

/**
 * __useSearchNuzlockesQuery__
 *
 * To run a query within a React component, call `useSearchNuzlockesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchNuzlockesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchNuzlockesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchNuzlockesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SearchNuzlockesQuery,
    SearchNuzlockesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchNuzlockesQuery, SearchNuzlockesQueryVariables>(
    SearchNuzlockesDocument,
    options
  );
}
export function useSearchNuzlockesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchNuzlockesQuery,
    SearchNuzlockesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SearchNuzlockesQuery,
    SearchNuzlockesQueryVariables
  >(SearchNuzlockesDocument, options);
}
export type SearchNuzlockesQueryHookResult = ReturnType<
  typeof useSearchNuzlockesQuery
>;
export type SearchNuzlockesLazyQueryHookResult = ReturnType<
  typeof useSearchNuzlockesLazyQuery
>;
export type SearchNuzlockesQueryResult = Apollo.QueryResult<
  SearchNuzlockesQuery,
  SearchNuzlockesQueryVariables
>;
export const GetNuzlockeDocument = gql`
  query GetNuzlocke($id: String!) {
    getNuzlocke(id: $id) {
      id
      title
      type
      description
      createdAt
    }
  }
`;

/**
 * __useGetNuzlockeQuery__
 *
 * To run a query within a React component, call `useGetNuzlockeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNuzlockeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNuzlockeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNuzlockeQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetNuzlockeQuery,
    GetNuzlockeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNuzlockeQuery, GetNuzlockeQueryVariables>(
    GetNuzlockeDocument,
    options
  );
}
export function useGetNuzlockeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNuzlockeQuery,
    GetNuzlockeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNuzlockeQuery, GetNuzlockeQueryVariables>(
    GetNuzlockeDocument,
    options
  );
}
export type GetNuzlockeQueryHookResult = ReturnType<typeof useGetNuzlockeQuery>;
export type GetNuzlockeLazyQueryHookResult = ReturnType<
  typeof useGetNuzlockeLazyQuery
>;
export type GetNuzlockeQueryResult = Apollo.QueryResult<
  GetNuzlockeQuery,
  GetNuzlockeQueryVariables
>;
