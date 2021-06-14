# momentum_clone
chrome 확장 프로그램인 momentum clone coding입니다.
시연 영상 첨부했습니다.

과제의 내용은 모두 완수했습니다.
그리고 실제 momentum과 비슷하게 만들어보려고 몇가지를 추가해보았습니다.

먼저 날씨 modal button아래에 현재 온도를 추가했습니다.
그런데 api에서 제공하는 온도가 실제 온도랑 다른 것 같은데... 해결하고 싶습니다.

하단에 명언을 받아와서 추가하는 기능을 넣어보았습니다.
https://api.adviceslip.com/
위 사이트에서 명언까지는 아니고 조언(?)정도는 무작위로 받을 수 있는 api를 제공합니다.

그리고 왼쪽 상단에 setting 버튼을 만들고 24시간 버전 12시간 버전으로 타이머를 조정할 수 있는 toggle 버튼을 넣었습니다.
앞으로 더 많은 기능이 추가 될 경우 setting에 항목을 추가할 예정입니다.

Timer에서 초 부분은 정신 없어서 제거하였고 약간 자잘한 부분이지만 시간이나 분이 한자리 수로 나올 경우 앞에 0을 붙여주는 작업을 추가했습니다.

앞으로 추가하고 싶은 기능
1. search engine을 추가해보고 싶습니다. 호스팅을 하고 나면 google search api를 이용할 수 있을 것 같은데 빨리 호스팅을 처리해야겠습니다.
2. todo list 하단 오른쪽에 추가
3. 원래 momentum은 timer관련 setting은 timer위에 마우스를 hover시킬 경우 setting button이 옆에 생기던데... 이게 그 버튼이 추가되면 align이 변경되고 하는 부분이 있어서 우선 setting을 따로 뺐습니다. 이것도 조언을 받고 고치고 싶습니다.
4. 뒤에 배경이 흰색이 많을 경우 글자가 보이질 않아서 색감을 조정하거나 다른 어두운 계열의 배경으로 변경하는 뭐 그런 알고리즘을 넣을 수 없을까요?!

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
    integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous">
  </script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script defer src="./index.js"></script>
</head>

<body>
  <div class="main_container">
    <section>
      <!-- setting -->
      <div class="setting-part">
        <i class="fas fa-cog fs-2 setting-button"></i>
        <div class="setting-body setting-body-hide bg-dark my-2 p-3 rounded-3" >
          <div class="d-flex">
            <div style="margin: auto 0px;">24-hour clock</div>
            <span class="toggle-switch" style="margin-left: 15px;">
              <span class="toggle-knob"></span>
            </span>
          </div>
        </div>
      </div>

      <!-- Timer -->
      <div class="timer-part">
        <div class="timer-wrapper d-flex justify-content-center align-content-center">
          <div class="timer"></div>
        </div>
      </div>

      <!-- Greeting -->
      <div class="greeting-wrapper">
        <div class="d-flex justify-content-center">
          <div class="timer-content"></div>
          <div class="timer-content">, WOOK</div>
        </div>
      </div>

      <!-- Write memo -->
      <div class="m-3 d-flex justify-content-center">
        <input type="text" class="memo-input bg-transparent text-white" placeholder="오늘 할일을 입력하세요">
      </div>

      <!-- Show memo -->
      <div class="memo-wrapper">
        <div class="memo-title">TODAY</div>
        <div class="memo"></div>
      </div>

      <!-- Quote part -->
      <div class="quote-wrapper d-flex justify-content-center fixed-bottom mb-3 fs-5 text-center">
        <div class="quote"></div>
      </div>

      <!-- Modal part -->
      <!-- Button trigger weather modal -->
      <div class="modal-button-wrapper text-center">
        <div class="modal-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
        </div>
        <div class="modal-button-text">
        </div>
      </div>

      <!-- Weather Modal -->
      <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content bg-transparent border-0">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="exampleModalLabel">날씨</h5>
              <!-- btn-close-white 적용이 이상하게 된다. -->
              <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex">
              <div class="modal-footer border-0">
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</body>

</html>
```

```css
/* .css/style.css */
body {
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
}

section {
  padding: 10%;
}

.main-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
}

/* Setting */
.setting-part {
  position: absolute;
  top: 20px;
  left: 20px;
}

.setting-button {
  cursor: pointer;
}

.setting-body-hide {
  display: none;
}

/* Timer */
.timer {
  font-weight: 500;
  font-size: 168px;
  line-height: 168px;
  text-align: center;
}

.timer-content {
  font-weight: bold;
  font-size: 40px;
  text-align: center;
}

/* memo */
.memo-wrapper {
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.memo {
  font-size: 30px;
}

.memo-input:focus {
  outline: none;
}

/* modal */
.modal-button-wrapper {
  position: fixed;
  right: 20px;
  top: 20px;
}

.modal-button {
  background-image: url("../images/039-sun.png");
  width: 50px;
  height: 50px;
  background-size: cover;
  cursor: pointer;
}

.modal-button-text {
  font-size: 15px;
}

/* input style */
input {
  width: 50%;
  max-width: 450px;
  border: none;
  border-bottom: 3px solid white;
}

input::-webkit-input-placeholder {
  color: white;
}

/* Timer toggle button css */
/* 이건 어디서 긁어온 코드 반드시 분석할 것! */
/* 솔직히 나머지는 다 알겠지만 바로 아래에 transition이 들어간 부분은 아직 한눈에 파악이 어렵다. */
.toggle-switch,
.toggle-switch .toggle-knob {
  -moz-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.toggle-switch {
  height: 30px;
  width: 55px;
  display: inline-block;
  background-color: #ffffff;
  margin: 2px;
  margin-bottom: 5px;
  border-radius: 30px;
  cursor: pointer;
  border: solid 1px #d2d6de;
  box-shadow: inset 1px 1px 9px -3px rgba(4, 4, 4, 0.08), 1px 2px 6px -2px rgba(0, 0, 0, 0.01);
}

.toggle-switch .toggle-knob {
  width: 28px;
  height: 26px;
  display: inline-block;
  background-color: #ffffff;
  border: solid 1px rgba(126, 126, 126, 0.07);
  box-shadow: 0 1px 3px rgba(107, 106, 106, 0.26), 0 5px 1px rgba(107, 106, 106, 0.13);
  border-radius: 26px;
  margin: 1px 1px;
}

.toggle-switch.active {
  background-color: #77e189;
  border: solid 1px transparent;
}

.toggle-switch.active .toggle-knob {
  margin-left: 24px;
}
```

```js
// index.js
// Setting 관련 부분이라 전역으로 빼는 것이 좋을 것 같다.
let toggleOnOff = false;
const settingButton = document.querySelector(".setting-button");
const settingBody = document.querySelector(".setting-body");

settingButton.addEventListener("click", function() {
  settingBody.classList.toggle("setting-body-hide");
});

async function setRenderBackground() {
  // Binary large object
  const result = await axios.get("https://picsum.photos/1280/720", {
    responseType: "blob"
  });

  // img에 url로 src="url"
  const data = URL.createObjectURL(result.data);
  // console.log(data);
  document.querySelector("body").style.backgroundImage = `url(${data})`;
}

// 시계 설정 함수
function setTime() {
  const timer = document.querySelector(".timer");
  const ampm = document.querySelector(".timer-content");

  let toggler = document.querySelector('.toggle-switch');
  toggler.onclick = function () {
    toggler.classList.toggle('active');
    toggleOnOff = !toggleOnOff;
  }

  // am pm 시간 반환
  function makeAMPM(time) {
    if(!toggleOnOff) {
      if(time > 12) return time-12;
      else return time;
    } else {
      return time
    }
  }

  setInterval(() => {
    const date = new Date();
    const hour = date.getHours();
    timer.textContent = `${leadingZeros(makeAMPM(hour),2)}:${leadingZeros(date.getMinutes(),2)}`;

    // 시간대를 morning, afternoon, evening, night로 구분
    if (hour < 6) {
      ampm.textContent = 'Good Night';
    } else if (6 <= hour && hour < 12) {
      ampm.textContent = 'Good Morning';
    } else if (12 <= hour && hour < 17) {
      ampm.textContent = 'Good Afternoon';
    } else if (17 <= hour && hour < 22) {
      ampm.textContent = 'Goot Evening';
    } else {
      ampm.textContent = 'Good Night';
    }
  }, 1000);
}

// memo 불러오기
function getMemo() {
  const memo = document.querySelector(".memo");
  const memoValue = localStorage.getItem("todo");
  memo.textContent = memoValue;
}

// memo 저장
function setMemo() {
  const memoInput = document.querySelector(".memo-input");
  memoInput.addEventListener("keyup", function (e) {
    // console.log(e.code);
    // console.log(e.target.value);
    // null "" undefined 0 => false로 인지
    if (e.code === 'Enter' && e.target.value) {
      localStorage.setItem("todo", e.target.value);
      getMemo();
      memoInput.value = "";
    }
  })
}

// memo 삭제
function deleteMemo() {
  document.addEventListener("click", function (e) {
    // console.log(e.target)
    if (e.target.classList.contains("memo")) {
      // localStorage item 삭제
      localStorage.removeItem("todo");
      // memo html 비워주기
      e.target.textContent = ""
    }
  })
}

function memos() {
  setMemo();
  getMemo();
  deleteMemo();
}

// 위도 경도 가져오기 -> Promise화
function getPosition(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}

// 날씨 가져오기
async function getWeather(latitude, longitude) {
  // 위도와 경도가 있는 경우
  if (latitude && longitude) {
    const data = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=c84011fee0fe7d186b888527ef7cdfdf`)
    return data;
  }
  // 위도와 경도가 없는 경우
  const data = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=c84011fee0fe7d186b888527ef7cdfdf`)
  return data;
}

// 날씨 정보와 이미지 동기화
function matchIcon(weatherData) {
  if (weatherData === "Clear") return './images/039-sun.png'
  if (weatherData === "Clouds") return './images/001-cloud.png'
  if (weatherData === "Rain") return './images/003-rainy.png'
  if (weatherData === "Snow") return './images/006-snowy.png'
  if (weatherData === "Thunderstorm") return './images/008-storm.png'
  if (weatherData === "Drizzle") return './images/031-snowflake.png'
  if (weatherData === "Atmosphere") return './images/033-hurricane.png'
}

// 요일 구하는 알고리즘 적용
// 날짜를 직접 입력하는 것보다 요일을 입력하는것이 더 깔끔해 보인다.
const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
function weatherWrapperComponent(li) {
  const changeToCelsius = temp => (temp - 273.15).toFixed(1);

  return `
  <div class="card shadow-sm bg-transparent mb-3 m-2" style="border: 1px solid white">
  <div class="card-header text-center" style="border: 1px solid white">
  ${week[new Date(li.dt_txt.split(" ")[0]).getDay()]}
  </div>
  <div class="card-body d-flex text-center" style="border: 1px solid white">
  <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
    <div class="card-title text-center">
      ${li.weather[0].main}
    </div>
    <img src="${matchIcon(li.weather[0].main)}" class="w-50 m-2"/>
    <p class="card-text mt-3">${changeToCelsius(li.main.temp) + " °C"}</p>
  </div>
  </div>
  </div>
  `
}

// 위도와 경도를 받아서 데이터를 받아오기
async function renderWeather() {
  let latitude = '';
  let longitude = '';
  try {
    const position = await getPosition();
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  } catch (error) {
    console.log(error);
  } finally {
    const weatherResponse = await getWeather(latitude, longitude);
    const weatherData = weatherResponse.data;
    // console.log(weatherData)
    weatherWeekList = weatherData.list.reduce((acc, cur) => {
      // 15:00:00가 존재하면 acc에 저장
      if (cur.dt_txt.indexOf("15:00:00") > 0) {
        // console.log(cur);
        acc.push(cur);
      }
      return acc;
    }, [])

    const modalBody = document.querySelector(".modal-body");
    const modalButton = document.querySelector(".modal-button");
    const modalButtonText = document.querySelector(".modal-button-text");

    modalBody.innerHTML = weatherWeekList.map(li => {
      return weatherWrapperComponent(li);
    }).join("");

    // Date 객체를 받고 year, month, day를 따로 format에 맞게 YMD에 저장.
    const date = new Date();
    const YMD = date.getFullYear() + "-" + leadingZeros(date.getMonth() + 1, 2) + "-" + leadingZeros(date.getDate(), 2);

    // api를 통해 받아온 weatherData에서 YMD가 있는 부분만 weatherTodayList로 받음.
    weatherTodayList = weatherData.list.reduce((acc, cur) => {
      if (cur.dt_txt.indexOf(YMD) > -1) {
        acc.push(cur);
      }
      return acc;
    }, []);

    console.log(weatherTodayList)

    // 이제 format 형식에 맞게 hour, minute, second를 따로 format에 맞게 YMD_HMS를 완성.
    const YMD_HMS = YMD + " " + date.toTimeString().slice(0, 9);
    for (let i = 0; i < weatherTodayList.length; i++) {
      // i가 list의 마지막 값이 되면 현재 시간이 21:00 ~00:00 사이라는 뜻이다.
      // 그럼 자동으로 21:00에 맞춰준다. 아래의 조건문으로 button image를 가져올 수 없음.
      if (i==weatherTodayList.length-1) {
        modalButton.style.backgroundImage = "url(" + matchIcon(weatherTodayList[i].weather[0].main) + ")";
        // api 측정온도가 다른 온도 api랑 값이 좀 다르것 같다...
        modalButtonText.textContent = (weatherTodayList[i].main.temp - 273.15).toFixed(1) + " °C";
      }
      // format에 맞게 작성했으므로 weatherData.dt_txt 사이에 있는지 확인하고 그 시간대의 날씨를 modalButton의 이미지로 붙인다.
      else if (weatherTodayList[i].dt_txt <= YMD_HMS && YMD_HMS <= weatherTodayList[i + 1].dt_txt) {
        modalButton.style.backgroundImage = "url(" + matchIcon(weatherTodayList[i].weather[0].main) + ")";
        // api 측정온도가 다른 온도 api랑 값이 좀 다르것 같다...
        modalButtonText.textContent = (weatherTodayList[i].main.temp - 273.15).toFixed(1) + " °C";
        break;
      }
    }
  }
}

// advice api
// 명언을 보내주는 api인줄 알았는데 뭐 적당한 조언 정도만 나오네
// 그래도 당장은 적당히 사용하기에 좋다.
async function getQuote() {
  const quoteResponse = await axios.get("https://api.adviceslip.com/advice").catch(err => console.log(err));
  const quote = document.querySelector(".quote");
  quote.textContent = "\"" + quoteResponse.data.slip.advice + "\"";
}

// 한자리 수 숫자일 경우 십의 자리 수에 0추가
// getMonth, getDate함수는 값을 숫자로 반환한다.
// 그래서 date format을 맞추려면 한자리 숫자일 경우에 앞에 0을 추가해 문자열로 바꿔줘야 한다.
// Ex) getMonth return 2 -> leadingZeros return 02
function leadingZeros(n, digits) {
  // console.log(n);
  let zero = '';
  n = n+"";
  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += '0';
  }
  return zero + n;
}

(function () {
  setRenderBackground();
  // 10초 마다 배경 호출
  setInterval(() => {
    setRenderBackground();
  }, 10000);
  setTime();
  memos();
  renderWeather();
  getQuote();
})();
```
