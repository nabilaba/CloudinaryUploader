import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER;
const TAGS = import.meta.env.VITE_CLOUDINARY_TAGS;

const uploadCloudinary = async (file, setProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", FOLDER);
  formData.append("tags", TAGS);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${"pusatngoding"}/image/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (setProgress) setProgress(progress);
      },
    }
  );

  return res.data.secure_url;
};

const getImages = (setImages) => {
  axios
    .get(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAGS}.json`)
    .then((res) => {
      Promise.all(
        res.data.resources.map(async (image) => {
          const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${image.version}/${image.public_id}.${image.format}`;
          return url;
        })
      ).then((urls) => {
        setImages(urls);
      });
    });
};

const makeToast = (toast, title, description, status) => {
  return toast({
    title,
    description,
    status,
    duration: 3000,
    isClosable: true,
    position: "top",
  });
};

export { uploadCloudinary, getImages, makeToast };
