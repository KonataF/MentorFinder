import SearchBar from '../components/searchBar'
import Card from '../components/Card'
import '../index.css'
import '../App.css'
import FakeData from "../FakeData.json"


export default function FindMentor() {
    return (
        <div>
            <div>
            <SearchBar placeholder="Search Mentor" data={FakeData}/>
            </div>

            <div class="right-container">
                <Card/>
                <Card/>
                <Card/>
            </div> 
        </div>

    );
}
