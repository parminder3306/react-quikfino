import { initializeApp, credential as _credential, messaging } from "firebase-admin";

// Initialize Firebase Admin SDK
import serviceAccount from "../quikfino.json";

initializeApp({
  credential: _credential.cert(serviceAccount),
});

// Get Access Token
_credential
  .cert(serviceAccount)
  .getAccessToken()
  .then((token) => {
    console.log("Access Token:", token.access_token);

    // Token for the target device
    const registrationToken =
      "fe26mTypSta6bLYvfJSI1M:APA91bG7cAAc8iLvX60kUiq0L5FkkNBBWxTacsUJq8cFRne47jVKmfnV0cCCXT3p2CkzI2sxjb11dp7Wm7NgVu7rnVH_rivhaFw-fy8ZqqVv7kLrrPSPV2g";

    // Notification details
    const message = {
      notification: {
        title: "dwdwd",
        body: "Message",
      },
      token: registrationToken,
    };

    // Send notification
    messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  })
  .catch((error) => {
    console.error("Error getting access token:", error);
  });
