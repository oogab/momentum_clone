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