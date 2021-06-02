export const handleResponseToUser = (msg) => {
    if (!msg.type) { return false }
    console.log(msg.type)
    if (msg.status == 1) {
        alert(`Dein ${msg.type} war erfolgreich`)
    } else {
        alert(`Dein ${msg.type} hat leider nicht geklappt`)
    }
    msg = null
  }