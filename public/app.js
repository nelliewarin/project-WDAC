fetch("http://localhost:3000/api/shops")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  })
  .then((data) => {
    console.log("GET response data:", data);
  });

// fetch(`http://localhost:3000/api/shop/${}`)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not OK");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log("GET response data:", data);
//   });
