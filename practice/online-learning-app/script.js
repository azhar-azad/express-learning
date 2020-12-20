const h1 = document.querySelector('h1');
const tbody = document.querySelector('tbody');

const itemArray = [
  ["English", "Anika", "10", "2020-11-11", "30"],
  ["Math", "Azad", "20.5", "2020-12-12", "15"]
];

// const itemObjectArray = [
//   {
//     name: "English",
//     instructor: "Anika",
//     price: 20.5,
//     created: "2020-11-11",
//     enrolled: 30
//   },
//   {
//     name: "Math",
//     instructor: "Azad",
//     price: 10,
//     created: "2020-12-12",
//     enrolled: 15
//   }
// ];

itemArray.forEach((item1) => {
  const tr = document.createElement("tr");
  item1.forEach((item) => {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(item));
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});

console.log(tbody);