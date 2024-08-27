import CookieConsent from "react-cookie-consent";

const CookieConsentComponent = () => {
  return (
    <CookieConsent
      style={{ backgroundColor: "black" }}
      contentClasses="pl-8 py-3"
      buttonText="Accept Cookies"
      buttonStyle={{
        backgroundColor: "black",
        color: "white",
        border: "1px solid white",
        borderRadius: "4px",
        marginRight: "3rem",
      }}
      enableDeclineButton // Enable the decline button
      declineButtonText="Decline" // Set the text for the decline button
      declineButtonStyle={{
        marginLeft: "3rem",
      }}
      onAccept={() => {
        // Handle cookie acceptance here
      }}
      onDecline={() => {
        // Handle cookie decline here
      }}
    >
      Discover MovieMaze's flavor with a cookie nibble! 🍪🎬🍿 By clicking
      'Accept Cookies', you spice up your cinematic journey and help us enhance
      your experience.
    </CookieConsent>
  );
};

export default CookieConsentComponent;
