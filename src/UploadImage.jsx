import { Stack, HStack, Input, IconButton, useToast } from "@chakra-ui/react";
import Img from "./Img";
import { useEffect, useState } from "react";
import { makeToast } from "./utils";
import { DeleteIcon } from "@chakra-ui/icons";

export default function UploadImage({ img, id = "upload", setImg }) {
  const toast = useToast();
  const [previewThumbnail, setPreviewThumbnail] = useState(img);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 1024 * 1024 * 1) {
      return makeToast(toast, "Error", "Ukuran gambar terlalu besar", "error");
    }

    if (
      !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      )
    ) {
      return makeToast(toast, "Error", "Format gambar tidak didukung", "error");
    }

    setImg(file);
    setPreviewThumbnail(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (img instanceof File) {
      setPreviewThumbnail(URL.createObjectURL(img));
    } else {
      setPreviewThumbnail(img);
    }
  }, [img]);

  return (
    <Stack spacing="0">
      {previewThumbnail && (
        <>
          <Stack position="relative" w="full">
            <Img src={previewThumbnail} alt="thumbnail" />
            {img && (
              <IconButton
                position="absolute"
                top="2"
                right="2"
                aria-label="hapus"
                icon={<DeleteIcon />}
                colorScheme="red"
                rounded="full"
                size="sm"
                onClick={() => {
                  setImg("");
                  setPreviewThumbnail("");
                }}
              />
            )}
          </Stack>
        </>
      )}
      {!img && (
        <Stack
          onClick={() => document.getElementById(id).click()}
          border="1px dashed"
          h="50vh"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          w="full"
        >
          <Img
            h="50px"
            w="50px"
            src="https://img.icons8.com/ios/452/upload.png"
            alt="upload"
          />
        </Stack>
      )}
      <Input
        type="file"
        accept="image/*"
        id={id}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </Stack>
  );
}
