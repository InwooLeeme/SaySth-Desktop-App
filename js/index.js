const user_input = document.querySelector(".user_input");
const micIcon = document.querySelector(".mic-icon");
const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("audioBtn");

let onRecording = false;
let audioChunk = [];

const AudioType = "audio/wav";

/* 
사용자 입력
*/
user_input.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && user_input.value.trim() !== "") {
    const userMessage = user_input.value.trim();
    console.log(userMessage);
  }
});

let mediaRecoder;

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  mediaRecoder = new MediaRecorder(stream);

  mediaRecoder.addEventListener("dataavailable", (e) => {
    if (e.data && e.data.size > 0) {
      audioChunk.push(e.data);
      console.log(`수집 완료`);
    }
  });

  mediaRecoder.addEventListener("stop", () => {
    const audioBlob = new Blob([audioChunk], { type: AudioType });
    console.log(audioChunk.length);
    console.log(audioBlob);

    // audio chuck 초기화

    /* Test */
    const audioURL = URL.createObjectURL(audioBlob);
    console.log(audioURL);

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = function () {
      const base64data = reader.result;
      try {
        localStorage.setItem("recorded file", base64data);
        console.log(`저장 완료`, base64data);
      } catch (e) {
        console.log(`저장 실패`, e);
      }
    };
    audioChunk = [];
    // file 전송
  });
});

/* 
마이크 아이콘 선택 시
*/
micIcon.addEventListener("click", (e) => {
  if (onRecording === false) {
    // 마이크 버튼을 처음 눌렀을 시
    onRecording = true;
    mediaRecoder.start();
    console.log(`녹음 시작`);
  } else {
    /* 녹음 중 일 때 */
    mediaRecoder.stop();
    onRecording = false;
    console.log(`녹음 중지 및 오디오 청크 초기화 후 전송 시작`);
  }
});

playBtn.addEventListener("click", () => {
  const storedAudio = localStorage.getItem("recorded file");
  console.log(storedAudio);

  if (storedAudio) {
    const source = document.getElementById("audioSource");
    source.src = storedAudio;
    audioPlayer.play();
  } else {
    console.log(`음성 파일 없음`);
  }
});
