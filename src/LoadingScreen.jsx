import { Progress, Stack, Text } from "@chakra-ui/react";

export default function LoadingScreen({
  processing = true,
  uploading,
}) {
  return (
    <Stack
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="rgba(0,0,0,0.5)"
      _dark={{ bg: "rgba(255,255,255,0.5)" }}
      zIndex="99999"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        p="4"
        bg="white"
        borderRadius="md"
        shadow="md"
        spacing="4"
        color="black"
      >
        {processing && !uploading && (
          <Text fontSize="sm" fontWeight="bold">
            Sedang Memproses...
          </Text>
        )}
        {uploading > 0 && (
          <>
            <Text fontSize="sm" fontWeight="bold">
              Sedang Mengunggah Gambar... {uploading}%
            </Text>
            <Progress value={uploading} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
