import '../index.css';
import '../App.css';

// - email
// - username
// - password
// - profilePic (optional)
// - date of birth
// - occupation
// - education
// - experience
// - bio
// - maxNumOfMentees (optional)
export default function Card() {
    return (
        <div class="card">
            <div class="card-top">
            <h2>Mentor Name</h2>
            <h3>Mentor Email</h3>
            </div>
            {/* <div class="card-body">
            <img src={"my-app/public/logo192.png"}></img>
            </div> */}
            <div>
            <p>Occupation:</p>
            <p>Experience:</p>
            <p>Bio:</p>
            </div>
        </div>
    );
}

