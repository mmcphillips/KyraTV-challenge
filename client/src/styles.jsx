// main content
const SContainer = {
  backgroundColor: '#000',
  color: '#FFBA00',
  fontFamily: 'Sans-Serif',
  textAlign: 'center',
};
// chart container to avoid mobile view issue..
const CContainer = {
  height: '50%',
  width: '100%',
  marginBottom: '20px',
};
// card media styling
const SCardMedia = {
  marginBottom: '-10px',
};
// For Large screens
const SCardL = {
  flexDirection: 'row',
  textAlign: 'center',
  width: '20%',
  margin: '10px',
  backgroundColor: '#000',
};
// For Medium Screens
const SCardM = {
  flexDirection: 'row',
  textAlign: 'center',
  width: '30%',
  margin: '10px',
  backgroundColor: '#000',
};
// card contents
const SCardContent = {
  padding: '5px',
  backgroundColor: '#000',
  color: 'FFBA00',
};
// card contents, small screens
const SCardContentS = {
  padding: '5px',
  backgroundColor: '#000',
  color: 'FFBA00',
};
// small screens.
const SCardS = {
  flexDirection: 'row',
  textAlign: 'center',
  width: '45%',
  margin: '10px',
  backgroundColor: '#000',
};
// For Mobile Devices
const SCardMobile = {
  flexDirection: 'row',
  textAlign: 'center',
  width: '100%',
  margin: '10px',
  backgroundColor: '#000',
};
// typography style base
const SP = {
  padding: 0,
  marginTop: '-7px',
  textAlign: 'right',
  fontSize: '.7em',
};
// typography style for small screens
const SPS = {
  padding: 0,
  marginTop: '-7px',
  textAlign: 'right',
  fontSize: '5vw',
};
// card font style
const SPT = {
  fontFamily: 'Caslon',
};
// h3 style
const SPH = {
  width: '100%',
};

export {
  SContainer,
  CContainer,
  SP,
  SPH,
  SPS,
  SPT,
  SCardContent,
  SCardMedia,
  SCardL,
  SCardM,
  SCardS,
  SCardContentS,
  SCardMobile,
};
