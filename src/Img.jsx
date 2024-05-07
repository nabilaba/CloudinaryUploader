import { Icon, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { NotAllowedIcon } from "@chakra-ui/icons";

export default function Img({ src, alt, circle, preview, ...otherProps }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src) {
    return <Text>Gambar tidak ditemukan</Text>;
  }

  if (src instanceof File) {
    src = URL.createObjectURL(src);
  } else if (src instanceof String) {
    src = URL.createObjectURL(new Blob([src]));
  }

  return (
    <>
      <Skeleton
        isLoaded={!loading}
        borderRadius={circle ? "full" : "none"}
      >
        <Image
          src={src}
          alt={alt}
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          display={error ? "none" : "block"}
          {...otherProps}
        />
      </Skeleton>
      {error && !loading && (
        <Stack
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          h="full"
          w="full"
          py="4"
          border="1px dashed"
        >
          <Icon as={NotAllowedIcon} w={10} h={10} />
          <Text fontSize="sm" fontWeight="bold">
            Gagal memuat gambar
          </Text>
        </Stack>
      )}
    </>
  );
}
