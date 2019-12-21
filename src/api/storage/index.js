import axios from "axios";

export const submitText = async (title, effect) => {
  const url = new URL("https://some-url.com"); //TODO: Replace this with real API address
  const params = { title, effect };
  url.search = new URLSearchParams(params).toString();

  return await fetch(url)
    .then(e => {
      console.log("Success: ", e);
    })
    .catch(e => {
      console.log("Error: ", e);
    });
};

export const submitImage = async file => {
  const url =
    "https://us-east1-yugiohbot.cloudfunctions.net/yugiohbot_signed-url";

  await axios
    .post(url, {
      bucket: "yugiohbot-images/pending",
      filename: file.name,
      contentType: file.type
    })
    .then(response => {
      console.log(response)
      axios
        .put(response.data.signed_url, file, {
          headers: {
            "Content-Type": file.type
          }
        })
        .then(response => {
          console.log("success : ", response);
        })
        .catch(error => {
          console.log("errorSubmitImage : ", error);
        });
    })
    .catch(error => {
      console.log("errorSignedURL : ", error);
      return "";
    });
};

// const getSignedURL = async filename => {
//   const url =
//     "https://us-east1-yugiohbot.cloudfunctions.net/yugiohbot_signed-url";

//   await axios
//     .post(url, {
//       bucket: "yugiohbot-images/pending",
//       filename,
//       contentType: "image/jpeg"
//     })
//     .then(response => {
//       return response.data.signed_url;
//     })
//     .catch(error => {
//       console.log("errorSignedURL : ", error);
//       return "";
//     });
// };
