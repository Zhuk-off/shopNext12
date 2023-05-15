import { IDataLogin } from '@/src/interfaces/apollo/login.interface';
import { client } from './apolloClient';
import { LOGIN_AUTH } from './mutationsConst';

export async function login(username: string, password: string) {
  try {
    const response = await client.mutate<IDataLogin>({
      mutation: LOGIN_AUTH,
      variables: {
        username,
        password,
      },
    });

    // response.data содержит данные из серверного ответа
    const login = response ? response.data?.login : null;
// console.log(login)
    return login;
  } catch (error) {
    console.error('Error during login', error);
  }
}
