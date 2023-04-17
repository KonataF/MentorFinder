import React, {useState} from 'react'

const searchBar = () => {

 const [searchInput, setSearchInput] = useState("");

 const countries = [

  { name: "Belgium", continent: "Europe" },
  { name: "India", continent: "Asia" },
  { name: "Bolivia", continent: "South America" },
  { name: "Ghana", continent: "Africa" },
  { name: "Japan", continent: "Asia" },
  { name: "Canada", continent: "North America" },
  { name: "New Zealand", continent: "Australasia" },
  { name: "Italy", continent: "Europe" },
  { name: "South Africa", continent: "Africa" },
];

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};

if (searchInput.length > 0) {
    countries.filter((country) => {
    return country.name.match(searchInput);
});
}

return <div>

<input
   type="search"
   placeholder="Search here"
   onChange={handleChange}
   value={searchInput} />

<table>
  <tr>
    <th>Country</th>
    <th>Continent</th>
  </tr>

{countries.map((country) => {

<div>
  <tr>
    <td>{country.name}</td>
    <td>{country.continent}</td>
  </tr>
</div>

})}
</table>

</div>


};

export default searchBar;