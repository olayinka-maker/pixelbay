import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "x9k2nhcf",
  dataset: "production",
  apiVersion: "2023-08-30",
  token: process.env.REACT_APP_TOKEN,
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export const createUser = async (data) => {
  const _doc = {
    _id: data.uid,
    _type: "users",
    uid: data.uid,
    displayName: data.displayName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    photoURL: data.photoURL,
  };

  await client.createIfNotExists(_doc).then((res) => {
    return res;
  });
};
