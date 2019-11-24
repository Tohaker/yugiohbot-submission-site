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
  const signedUrl = await getSignedURL(file.name);
  const formData = new FormData();
  formData.append(file);

  return await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "image/png"
    },
    body: formData
  })
    .then(r => {
      console.log("success: ", r);
    })
    .catch(e => {
      console.log("error: ", e);
    });
};

const getSignedURL = async filename => {
  const url = "https://google-signed-url-function.com";
  await fetch(url, {
    method: "POST",
    body: {
      bucket: "yugiohbot-images/submitted",
      filename
    }
  })
    .then(r => {
      console.log("Signed URL: ", r);
      return r;
    })
    .catch(e => {
      console.log("Error: ", e);
      return null;
    });
};
