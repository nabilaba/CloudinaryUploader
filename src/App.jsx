import {
  Button,
  Text,
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import LoadingScreen from "./LoadingScreen";
import swal from "sweetalert";
import Img from "./Img";
import Masonry from "react-responsive-masonry";
import Measure from "react-measure";
import { uploadCloudinary, getImages, makeToast } from "./utils";

function App() {
  const toast = useToast();
  const [images, setImages] = useState([]);

  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getImages(setImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      return makeToast(toast, "Error", "Thumbnail tidak boleh kosong", "error");
    }

    setProcessing(true);

    let thumbnailUrl = thumbnail;
    if (thumbnail instanceof File) {
      thumbnailUrl = await uploadCloudinary(thumbnail, (progress) => {
        setUploadProgress(progress);
      })
        .then((res) => {
          setImages((prev) => [res, ...prev]);
          setThumbnail("");
          return makeToast(
            toast,
            "Success",
            "Thumbnail berhasil diunggah",
            "success"
          );
        })
        .catch((err) => {
          swal("Error", err.response.data.message, "error");
        })
        .finally(() => {
          setUploadProgress(0);
          setProcessing(false);
        });
    }

    setProcessing(false);
  };

  return (
    <Stack
      align="center"
      justify="center"
      py="4"
      px={{ base: 4, md: 20 }}
      spacing="4"
      bg="#333"
      minH="100vh"
    >
      <Stack p="4" bg="white" borderRadius="lg" shadow="lg" w="full">
        <Text fontSize="xl" fontWeight="bold">
          <Text as="span" color="blue.300">
            UPLOAD
          </Text>{" "}
          IMAGE
        </Text>
        <Stack as="form" onSubmit={handleSubmit} autoComplete="off">
          <UploadImage img={thumbnail} setImg={setThumbnail} />
          {thumbnail && (
            <Button colorScheme="green" type="submit" size="sm">
              Unggah Gambar
            </Button>
          )}
        </Stack>
      </Stack>
      <Masonry
        columnsCount={useBreakpointValue({
          base: 2,
          lg: 3,
        })}
        gutter="2px"
      >
        {images.map((image, index) => (
          <Measure key={index}>
            {({ measureRef }) => (
              <div ref={measureRef}>
                <Img
                  key={index}
                  src={image}
                  alt={`image-${index}`}
                  onClick={
                    // salin url
                    () => {
                      navigator.clipboard.writeText(image);
                      makeToast(
                        toast,
                        "Success",
                        "URL berhasil disalin",
                        "success"
                      );
                    }
                  }
                />
              </div>
            )}
          </Measure>
        ))}
      </Masonry>
      <Text fontSize="sm" color="gray.500">
        Created by{" "}
        <Text as="span" fontWeight="bold" color="blue.300">
          Nabil Aba
        </Text>
      </Text>
      {processing && (
        <LoadingScreen processing={processing} uploading={uploadProgress} />
      )}
    </Stack>
  );
}

export default App;
