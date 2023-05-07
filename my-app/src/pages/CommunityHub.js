import '../index.css'
import SearchBar from "../components/searchBar"
import SearchUser from '../components/searchUser'
import FakeData from "../FakeData.json"
import FakeUser from "../FakeUser.json"

export default function CommunityHub() {
    return(
        <div>
            <h1>CommunityHub</h1>
            <SearchBar placeholder="Search Community" data={FakeData}/>
            <SearchUser placeholder="Search User" data={FakeUser}/>
        </div>
    )
}

// export default function SearchUser() {
//     return(
//         <div>
//             <h1>Search User</h1>
//             <SearchUser placeholder="Search User" data={FakeUser}/>
//         </div>
//     )
// }
  
