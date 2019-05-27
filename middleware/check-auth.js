import Cookies from 'universal-cookie';

export default async function ({ store, req }) {
  if (!req) return

  const cookies = new Cookies(req.headers.cookie);
  let tokenFromCookies = cookies.get('auth')

  if (process.server && tokenFromCookies !== null) {
    store.commit('user/setAuth', tokenFromCookies)
    const getAccount = store.dispatch('getAccountDetailsFromServer', tokenFromCookies)
    await getAccount
  }
}
