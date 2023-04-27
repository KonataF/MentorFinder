import "./CommunityHubPosts.scss"


const Post = ({post}) => {
	return (
	<div className="communityHubPost">
		<div className="user">
			<div className="userInfo"></div>
			<img src={postMessage.img} alt=""/>
			<div className="details">
				<Link to={`/profile/${post.user}`} style={{textDecoration:"none", color:"inherit"}}>
					<span>{post.name}</span>
				</Link>
			</div>
			<div className="content"></div>
			<div className="content"></div>
		</div>
	</div>
	)
}

export default Post;