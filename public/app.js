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
      newElem.innerText = `${shop.name}`;
      list.appendChild(newElem);
    });
  });
