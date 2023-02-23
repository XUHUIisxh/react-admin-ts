import AddPostForm from "./components/AddPostForm";
import PostsList from "./components/postsList";

const Index = () => {
	return (
		<div className='posts-list'>
			<h2>Welcome to the Redux Essentials example app!</h2>
			<AddPostForm />
			<PostsList />
		</div>
	);
};

export default Index;
