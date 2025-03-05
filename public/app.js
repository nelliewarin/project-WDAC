fetch("http://localhost:3000/api/stores")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  })
  .then((data) => {
    console.log("GET response data:", data);
    let list = document.querySelector("#listOfShops");
    data.forEach((shop) => {
      let newElem = document.createElement("li");
      newElem.classList.add("listItem");

      if (shop.url != null) {
        let url;
        if (shop.url.startsWith("http")) {
          url = shop.url;
        } else {
          url = `https://${shop.url}`;
        }
        newElem.innerHTML = `<a href='${url}'>${shop.name}</a>`;
      } else {
        newElem.innerText = `${shop.name}`;
      }

      list.appendChild(newElem);
    });
  });
