import "./CommunityHubPost.scss"

const CommunityHubPost = () => {
    const CommunityHubPost = [
        {
        id: 1,
        name: "John Doe",
        userId: 1,
        profilePic: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fblank-pfp--1051801687948259536%2F&psig=AOvVaw0Ptcp3w33OaHaKoBdYwQiB&ust=1682637779042000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLiOyqrYyP4CFQAAAAAdAAAAABAE",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmentor-mentee&psig=AOvVaw2uGmnaxW4A_7PIWclaqiiL&ust=1682637844381000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMjZ68nYyP4CFQAAAAAdAAAAABAE",

    },
    {
        id: 2,
        name: "Jane Doe",
        userId: 2,
        profilePic: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fblank-pfp--1051801687948259536%2F&psig=AOvVaw0Ptcp3w33OaHaKoBdYwQiB&ust=1682637779042000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLiOyqrYyP4CFQAAAAAdAAAAABAE",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmentor-mentee&psig=AOvVaw2uGmnaxW4A_7PIWclaqiiL&ust=1682637844381000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMjZ68nYyP4CFQAAAAAdAAAAABAE",
        },
    ];

    return <div className="communityHubPost">
        {communityHubPost.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
    </div>
};

export default CommmunityHubPost;