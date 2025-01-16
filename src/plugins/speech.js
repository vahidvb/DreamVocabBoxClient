
const t2sSupported = 'speechSynthesis' in window;
const textToSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = localStorage.getItem('speechPitch') ? parseFloat(localStorage.getItem('speechPitch')) : 1;
    utterance.rate = localStorage.getItem('speechRate') ? parseFloat(localStorage.getItem('speechRate')) : 1;
    utterance.volume = localStorage.getItem('speechVolume') ? parseFloat(localStorage.getItem('speechVolume')) : 1;
    const voices = window.speechSynthesis.getVoices();
    const localVoice = voices.find(voice => voice.lang === 'en-US');

    if (localVoice)
        utterance.voice = localVoice;

    window.speechSynthesis.speak(utterance);

};
export default {
  textToSpeech,
  t2sSupported,
  install(app) {
    app.config.globalProperties.textToSpeech = textToSpeech;
    app.config.globalProperties.t2sSupported = t2sSupported;
  },
};