// для мутации fillCart Apollo
export interface FillCartMutationData {
  productId: number;
  quantity: number;
}


export interface IGetRefreshJwtAuthToken {
  refreshJwtAuthToken: RefreshJwtAuthToken;
}

export interface RefreshJwtAuthToken {
  authToken:  string;
  __typename: string;
}