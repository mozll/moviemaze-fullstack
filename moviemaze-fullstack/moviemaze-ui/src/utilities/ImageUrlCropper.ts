// Billederne der hentes fra det her api, hentes i en enorm stor fil størrelse
// Api'et tilader crop direkte i url'en for at gøre billederne mindre
// Det gøres på denne side

const getCroppedImageUrl_500 = (url: string) => {
  return "w500/" + url; //index repræsenterer start indexet for media parametret
};

export default getCroppedImageUrl_500;
