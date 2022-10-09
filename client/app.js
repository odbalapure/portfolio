/**
 * @desc        Function to send a message
 * @method      POST
 * @visibility  Public
 * @param {*}   event
 */
async function sendMessage(event) {
  event.preventDefault();

  const nameIp = document.getElementById("name").value;
  const emailIp = document.getElementById("email").value;
  const msgIp = document.getElementById("msg").value;

  // Check for valid inputs
  if (
    nameIp === undefined ||
    nameIp === "" ||
    emailIp === undefined ||
    emailIp === "" ||
    msgIp === undefined ||
    msgIp === ""
  ) {
    // Display a warning if all/any of the fields is/are not filled
    document.getElementById(
      "success"
    ).innerHTML = `<p style="color: azure;" class="lead">Seems like you missed out some fields...<span style="font-size: 1.7rem">🙂</span></p>`;

    // Remove warning
    setTimeout(() => (document.getElementById("success").innerHTML = ""), 3000);
    return;
  }

  // Check if the message is too short...
  if (msgIp.length < 10) {
    document.getElementById(
      "success"
    ).innerHTML = `<p style="color: azure;" class="lead">Hey ${
      nameIp.split(" ")[0]
    }, your message is too short!<span style="font-size: 1.7rem">🧐</span></p>`;

    // Remove warning
    setTimeout(() => (document.getElementById("success").innerHTML = ""), 3000);
    return;
  }

  // Construct the message object
  const msgObj = {
    name: nameIp,
    email: emailIp,
    msg: msgIp,
  };

  // Send the message object
  fetch("https://portfolio-ombalapure.herokuapp.com/message", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msgObj),
  })
    .then((response) => {
      // Clear all input fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("msg").value = "";

      // Display success message
      document.getElementById(
        "success"
      ).innerHTML = `<p style = "color: azure;">Hi ${
        nameIp.split(" ")[0]
      }, thanks for reaching out! I will get back to you soon. <span style="font-size: 1.7rem;">🤗</span></p>`;

      // Remove success message
      setTimeout(
        () => (document.getElementById("success").innerHTML = ""),
        3000
      );
    })
    .catch((error) => {
      // Display server error
      console.log("Error while sending message: ", error);
      document.getElementById("success").innerHTML = `<p>Hi ${
        nameIp.split(" ")[0]
      }, your message couldn't be sent, please try again later! <span style="font-size: 1.7rem">🥲</span></p>`;
    });
}
