const sec_ones = document.querySelector(".sec.sec-ones");
const sec_ones_bin = document.querySelector(".sec.sec-ones + *");
const sec_tens = document.querySelector(".sec.sec-tens");
const sec_tens_bin = document.querySelector(".sec.sec-tens + *");
const min_ones = document.querySelector(".min.min-ones");
const min_ones_bin = document.querySelector(".min.min-ones + *");
const min_tens = document.querySelector(".min.min-tens");
const min_tens_bin = document.querySelector(".min.min-tens + *");
const hr_ones = document.querySelector(".hr.hr-ones");
const hr_ones_bin = document.querySelector(".hr.hr-ones + *");
const hr_tens = document.querySelector(".hr.hr-tens");
const hr_tens_bin = document.querySelector(".hr.hr-tens + *");
const cellGroup = [...document.querySelectorAll(".cells")];

let stampedTime = 0;
let elapsed = 0;
let seconds = 3596;
const obj = { ones: "0", tens: "0" };

let time = {
  hours: { ...obj },
  minutes: { ...obj },
  seconds: { ...obj },
};

const updateUI = () => {
  sec_ones.innerText = time.seconds.ones;
  sec_ones_bin.innerText = time.seconds.ones.toString(2).padStart(4, "0");

  sec_tens.innerText = time.seconds.tens;
  sec_tens_bin.innerText = time.seconds.tens.toString(2).padStart(4, "0");

  min_ones.innerText = time.minutes.ones;
  min_ones_bin.innerText = time.minutes.ones.toString(2).padStart(4, "0");

  min_tens.innerText = time.minutes.tens;
  min_tens_bin.innerText = time.minutes.tens.toString(2).padStart(4, "0");

  hr_ones.innerText = time.hours.ones;
  hr_ones_bin.innerText = time.hours.ones.toString(2).padStart(4, "0");

  hr_tens.innerText = time.hours.tens;
  hr_tens_bin.innerText = time.hours.tens.toString(2).padStart(4, "0");
};

const flatten = () => {
  return Object.values(time)
    .reduce((ttl, obj) => {
      return [...ttl, ...Object.values(obj)];
    }, [])
    .map((d) => d.toString(2).padStart(4, "0"))
    .map((s) => s.split(""));
};

const getSeconds = (s = seconds) => (s % 60) + "";
const getMinutes = (s = seconds) => Math.floor((s / 60) % 60) + "";
const getHours = (s = seconds) => Math.floor((s / (60 * 60)) % 24) + "";
const format = (t) =>
  t
    .padStart(2, "0")
    .split("")
    .map((d) => +d);

const updateTime = () => {
  seconds++;
  elapsed = 0;
  {
    const sec = getSeconds();
    const [ones, tens] = format(sec);
    time.seconds = { ones, tens };
  }
  {
    const min = getMinutes();
    const [ones, tens] = format(min);
    time.minutes = { ones, tens };
  }
  {
    const hr = getHours();
    const [ones, tens] = format(hr);
    time.hours = { ones, tens };
  }
};

const getTimes = (currentTime) => {
  const diff = currentTime - stampedTime;
  elapsed += diff;
  if (elapsed >= 1000) updateTime();
  updateUI();
  stampedTime = currentTime;
  requestAnimationFrame(getTimes);
};

setInterval(() => {
  {
    const sec = new Date().getSeconds().toString();
    const [ones, tens] = format(sec);
    time.seconds = { ones, tens };
  }
  {
    const seconds = (new Date().getMinutes() * 60).toString();
    const min = getMinutes(seconds);
    const [ones, tens] = format(min);
    time.minutes = { ones, tens };
  }
  {
    const seconds = (new Date().getHours() * 60 * 60).toString();
    const hr = getHours(seconds);
    const [ones, tens] = format(hr);
    time.hours = { ones, tens };
  }
  updateUI();
  const flattenedArr = flatten();
  cellGroup.forEach((cells, i) => {
    [...cells.children].forEach((cell, j) => {
      flattenedArr[i][j] === "1"
        ? cell.classList.add("show")
        : cell.classList.remove("show");
    });
  });
}, 1000);
