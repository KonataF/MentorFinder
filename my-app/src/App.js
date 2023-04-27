import './App.css';
import SignUpMentee from './SignUpMentee'
import SignUpMentor from './SignUpMentor'

function App() {
  return (
    <div classname="App">
      <h2>Mentee</h2>
      <SignUpMentee/>

      <h2>Mentor</h2>
      <SignUpMentor/>
    </div>
  );
}


export default App;
