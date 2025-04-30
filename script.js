let accounts = [];
const list = document.getElementById("account-list");
const hallFilter = document.getElementById("hallFilter");
const sortFilter = document.getElementById("sortFilter");

fetch("accounts.json").then(res => res.json()).then(data => {
  accounts = data;
  render();
});

hallFilter.onchange = render;
sortFilter.onchange = render;

function render() {
  let filtered = accounts.slice();

  if (hallFilter.value !== "all") {
    filtered = filtered.filter(a => a.hall == hallFilter.value);
  }

  if (sortFilter.value === "priceAsc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortFilter.value === "priceDesc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  list.innerHTML = "";
  filtered.forEach(acc => {
    list.innerHTML += `
      <div class="card">
        <img src="${acc.image}" alt="">
        <h3>${acc.name}</h3>
        <p class="price">${acc.price.toLocaleString()} đ</p>
        <p>Hall: ${acc.hall} | King: ${acc.king} | Queen: ${acc.queen}</p>
        <p>Warden: ${acc.warden} | Minion: ${acc.minion}</p>
        <a class="button" href="${acc.link}" target="_blank">Xem Chi Tiết</a>
      </div>
    `;
  });
}
