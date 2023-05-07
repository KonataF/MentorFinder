import "./CommunityHubPosts.scss"
import "Upvote.js"
import "Downvote.js"
import { Link } from "react-router-dom"


const Post = ({post}) => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [date, setDate] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault();
		const blog = { title, body, author }
		fetch("https://localhost5000", {
			method: 'POST',
			headers: {"Content-Type": "application/json" },
			body: JSON.stringify(blog)
		}).then(() => {
			console.log('new post added')
		})
		}
 	return (
	<div className="create">
		<h2>New Post</h2>
		<form onSubmit={{handleSubmit}}>
		</form>
		<div className="communityHubPost">
			<div classname="container">
				<div className="user">
					<div className="userInfo"></div>
						<img src={postMessage.profilePic} alt=""/>
						<div className="details">
							<Link to={`/profile/${post.user}`} style={{textDecoration:"none", color:"inherit"}}>
								<span classname="name"> {post.name}</span>
						</Link>
						<span className="date">  </span>
					</div>
				</div>
			<div className="title">
				<input
				required
				value={title}
				onChange={(e) =>setTitle(e.target.value)}
				></input>
			</div>
			<div className="content">
				<input
				required
				value={body}
				onChange={(e) =>setBody(e.target.value)}
				/>
				<img src={post.img} alt="" />"
			</div>
			<div className="info"></div>
			<Upvote/>
			<Downvote/>
			</div>
		</div>
	</div>
	)
}

export default Post;