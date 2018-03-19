let curUser = null
/*
 * User interface :
 * Event and button : only for demo purpose
 */

document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('connect')
  if (el) {
    el.addEventListener('click', function (e) {
      connect()
    })
  }

  el = document.getElementById('register')
  if (el) {
    el.addEventListener('click', function (e) {
      register()
    })
  }
  el = document.getElementById('login')
  if (el) {
    el.addEventListener('click', function (e) {
      login()
    })
  }
  el = document.getElementById('logout')
  if (el) {
    el.addEventListener('click', function (e) {
      logout()
    })
  }
  el = document.getElementById('addData')
  if (el) {
    el.addEventListener('click', function (e) {
      addData()
    })
  }
  el = document.getElementById('getData')
  if (el) {
    el.addEventListener('click', function (e) {
      register()
    })
  }
})

let key = null

const connect = () => {
  console.log('connect please wait ...')
  let pass = document.getElementById('password').value
  let pseudo = document.getElementById('pseudo').value
  curUser = pseudo
  console.log(pass)
  derive(pass)
    .then(derivedKey => {
      console.log('Derived Key : ', derivedKey)
      key = derivedKey
    })
    .catch(err => console.log(err))
}
const register = () => {
  console.log('register please wait ...')
  let pseudo = document.getElementById('pseudo').value
  addUser(pseudo).then(res => {
    console.log(`Successfully stored ${pseudo}`)
  })
    .catch(err => console.log(err))
}
const login = () => {
  let pseudo = document.getElementById('pseudoLogin').value
  document.getElementById('pseudoLogout').value = pseudo
  setCurrentUser(pseudo, true)
  console.log(`Welcome ${pseudo}, you are now logged.`)
  // getUserId('pseudo', pseudo)
  // .then(res => c)
  // .catch(err => console.log(err))
}
const logout = () => {
  let pseudo = document.getElementById('pseudoLogout').value
  setCurrentUser(pseudo, false)
  console.log(`See you later ${pseudo}.`)
  // getUserId('pseudo', pseudo)
  // .then(res => console.log(`Welcome ${pseudo}, you are now logged.`))
  // .catch(err => console.log(err))
}
const addData = () => {
  let data = document.getElementById('inputSetData').value
  let appName = document.getElementById('appNameSetData').value
  let toStore = { score: data }
  console.log(`We are adding the item ${data} with the key data into the app ${appName}`)

  addItemByAppName(appName, toStore).then(res => {
    console.log('done')
    // getItemByKey('data')
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
  })
    .catch(err => console.log(err))
}

const derive = (passPhrase) => {
  let iterations = 10000
  return MasqCrypto.utils.deriveKey(passPhrase, MasqCrypto.utils.toArray('theSalt'), iterations)
}