import axios from "axios";

export const submitForm = async (file, title, effect) => {
  const url =
    "https://us-east1-yugiohbot.cloudfunctions.net/yugiohbot_submission";

  const data = new FormData();
  data.append("title", title);
  data.append("effect", effect);
  data.append(file.name, file);

  try {
    const result = axios.post(url, data, {});
    console.log(result);
    return true;
  } catch (error) {
    console.log("Error : ", error);
    return false;
  }
};
