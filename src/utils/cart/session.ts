export const storeSession = (session: string)=> {
  if (!session) {
    return null;
  }
  localStorage.setItem('x-wc-session', session);
};

export const getSession = (): string | null => {
  return localStorage.getItem('x-wc-session');
};
