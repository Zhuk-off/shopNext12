import { client } from './apolloClient';
import { LOGIN_AUTH } from './mutationsConst';

export async function login(username: string, password: string) {
  try {
    const response = await client.mutate({
      mutation: LOGIN_AUTH,
      variables: {
        username,
        password,
      },
    });

    // response.data содержит данные из серверного ответа

    const { authToken, refreshToken, sessionToken, user,customer } = response.data.login;

    return response.data.login
  } catch (error) {
    console.error('Error during login', error);
  }
}
