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
      const options = {
        headers: {"x-goog-resumable": "start"}
      };
      axios.post(response.data.signed_url, {}, options)
      .then(axiosResponse => {     // make sure axiosResponse.status = 201
          axios.put(axiosResponse.headers.location, "file", { headers: { "Content-Type": file.type, "Content-Length": file.length} }).then(postResponse => {
            console.log("success : ", postResponse);
          }).catch(error => {
            console.log("put : ", error);
          });
      }).catch(error => {
        console.log("post : ", error);
        return "";
      }).catch(err => console.warn(err));
    })
    .catch(error => {
      console.log("errorSignedURL : ", error);
      return "";
    });
};
