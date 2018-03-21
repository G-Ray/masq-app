/**
 * This contenet script aim is to be a bridge
 * between the web application and the Masq Store.
 * In order to communicate postMessage is used by end points.
 * web app <---> bridge <-----> background
 */

let clientId = ''
var port = chrome.runtime.connect()

window.addEventListener('message', function (event) {
  // We only accept messages from ourselves
  if (event.source !== window) { return }

  if (event.data.method === 'set') {
    console.log('set request received')
    // return { data: 'ok' }
    return setItem()
  }
  /**
 *  Receive messages from webpage.
 *  Transfer them to background.
 */
  console.log(event.data)

  if (event.data.to && (event.data.to === 'background')) {
    console.log('Content script : ')
    console.log(`\tReceive a ${event.data.type} request.`)
    switch (event.data.type) {
      case 'handshake':
        //   console.log("Content script sends this message to backgound: " + event.data)
        // port.postMessage(event.data)
        break
      case 'initDB':
        // port.postMessage(event.data)
        break
      case 'set':
        console.log(event.data)
        // port.postMessage(event.data)
        break
      case 'get':
        console.log(event.data)
        // port.postMessage(event.data)
        break

      default:
        break
    }
    // console.log("Content script received: " + event.data.text);
  }
}, false)

/**
 *  Receive messages from background.
 *  Transfer them to webpage.
 */
port.onMessage.addListener(function (event) {
  console.log('Content script : ')
  console.log(`\t${event.from} sends a ${event.type} request to ${event.to}`)
  if (event.to && (event.to == 'webpage')) {
    switch (event.type) {
      case 'handshake_ack':
        // port.postMessage(event);
        window.postMessage(
          event,
          '*')
        break
      case 'set_ack':
        // port.postMessage(event);
        window.postMessage(
          event,
          '*')
        break
      case 'get_ack':
        // port.postMessage(event);
        window.postMessage(
          event,
          '*')
        break

      default:
        break
    }
  }
  // console.log("Content script received :",msg)
  // console.log("Content script send the message to the webpage")
  // window.postMessage({ type: "TO_PAGE", text: msg }, "*");
})

console.log('je suis dans content script')
console.log(window.location.origin)

const setItem = () => {
  window.postMessage({data: 'ok'
  }, '*')
}
