const eraseCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-99999999;';
};

const handleLogIn = () => {
  if (process.env.NODE_ENV === 'production') {
    window.location.href = '/auth'
  }
  window.location.href = 'http://localhost:8080/auth'
}

const findCookie = (name: string) => document.cookie
  .split('; ')
  .find(row => row.startsWith(`${name}=`))
  .split('=')[1];

export {
  eraseCookie,
  handleLogIn,
  findCookie,
}
