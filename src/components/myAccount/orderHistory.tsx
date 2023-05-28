import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { IOrders } from '@/src/interfaces/apollo/historyPage.interface';
import { IRefreshJwtAuthToken } from '@/src/interfaces/apollo/login.interface';
import { REFRESH_JWT_AUTH_TOKEN } from '@/src/utils/apollo/mutationsConst';
import { GET_ORDERS } from '@/src/utils/apollo/queriesConst';
import {
  IAuthorizationHeader,
  getAuthorizationHeaderWithAuthToken,
  getToken,
  setTokensInLocalStorage,
} from '@/src/utils/helpers/localStorageHelpers';
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { formattedDate } from '@/src/utils/helpers/dataHelpers';
import { formatBelarusianCurrency, getStatusLabel } from '@/src/utils/helpers';
import Image from 'next/image';
import StatusLabel from './statusLabel';

function OrderHistory() {
  const [stop, setStop] = useState(false);
  const { data: session } = useSession();
  const {
    loading: getOrdersLoading,
    data: getOrdersData,
    error: getOrdersError,
    refetch: getOrdersRefetch,
  } = useQuery<IOrders>(GET_ORDERS, {
    errorPolicy: 'all',
    // fetchPolicy: 'network-only',
    pollInterval: 60000,
    context: {
      headers: getAuthorizationHeaderWithAuthToken(),
    },
  });
  const [
    refreshJwtAuthToken,
    {
      data: refreshJwtAuthTokenData,
      error: refreshJwtAuthTokenError,
      loading: refreshJwtAuthTokenLoading,
    },
  ] = useMutation<IRefreshJwtAuthToken>(REFRESH_JWT_AUTH_TOKEN, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const refreshAuth = async () => {
    console.log('refreshAuth start');
    const refreshToken = getToken('refreshToken');
    await refreshJwtAuthToken({
      variables: {
        jwtRefreshToken: refreshToken
          ? refreshToken
          : session?.user.tokens.refreshToken,
      },
    }).then(({ data }) => {
      const authToken = data?.refreshJwtAuthToken.authToken;
      console.log(authToken);
      setTokensInLocalStorage(authToken);
    });
    console.log('refreshAuth end');
  };

  const refetchQueryTest = async (headers: IAuthorizationHeader) => {
    await getOrdersRefetch({
      context: {
        headers,
      },
    }).then((data) => {
      console.log('data refetch', data);
    });
  };

  const refetchQuery = async () => {
    await refreshAuth();
    const headers = getAuthorizationHeaderWithAuthToken();
    console.log(headers);
    await refetchQueryTest(headers);
    setStop(false);
  };

  if (getOrdersLoading) {
    console.log('Loading');
  }

  if (getOrdersData) {
    console.log(
      'getOrdersData',
      getOrdersData,
      getOrdersData.orders?.edges[0]?.node.status
    );
  }

  if (getOrdersError && !stop) {
    setStop(true);
    console.log('getOrdersError', getOrdersError, stop);
    refetchQuery();
  }

  return (
    <div className="w-full px-4 ">
      <div className="mx-auto w-full  rounded-2xl bg-white p-2">
        {getOrdersLoading && <span>Синхронизация истории...</span>}
        {getOrdersData &&
          getOrdersData?.orders?.edges?.map((order, index) => (
            <Disclosure key={index} as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="grid w-full grid-cols-3 rounded-md bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                    <div>
                      Заказ №{order.node.orderNumber} от{' '}
                      {formattedDate(order.node.date)}
                    </div>
                    <div></div>
                    <div className="grid grid-cols-3 justify-items-end">
                      <div className="justify-self-center">
                        <StatusLabel status={order.node.status} />
                      </div>
                      <div>{formatBelarusianCurrency(order.node.total)}р.</div>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-indigo-500`}
                      />
                    </div>
                  </Disclosure.Button>
                  {order?.node?.lineItems?.edges?.map((product, index) => (
                    <Disclosure.Panel
                      key={index}
                      className="flex justify-between px-4 pb-2 pt-4 text-sm text-gray-500"
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product?.node?.product?.node?.image?.sourceUrl}
                          alt=""
                          width={50}
                          height={50}
                        ></Image>
                        <p>{product?.node?.product?.node?.name}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <p>{product?.node?.quantity}шт.</p>
                        <p>
                          {formatBelarusianCurrency(
                            product?.node?.product?.node?.price
                          )}
                          р.
                        </p>
                      </div>
                    </Disclosure.Panel>
                  ))}
                </>
              )}
            </Disclosure>
          ))}
      </div>
    </div>
  );
}

export default OrderHistory;
