import "./CommunityHubPosts.scss"
import "Upvote.js"
import "Downvote.js"
import {getCurrentDate} from "./GetCurrentDate"
console.log(getCurrentDate())


const Post = ({post}) => {
	return (
	<div className="communityHubPost">
		<div className="user">
			<div classname="container">
				<div className="userInfo"></div>
					<img src={postMessage.profilePic} alt=""/>
					<div className="details">
						<Link to={`/profile/${post.user}`} style={{textDecoration:"none", color:"inherit"}}>
							<span classname="name"> {post.name}</span>
					</Link>
					<span className="date">  </span>
				</div>
			</div>
		<div className="content">
			<p>{post.desc}</p>
			<ing src={post.img} alt="" />"
		</div>
		<div className="info"></div>
		<Upvote/>
		<Downvote/>
		</div>
	</div>
	)
}

export default Post;