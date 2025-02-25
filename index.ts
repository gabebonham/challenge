import express from 'express';
import {
	createPost,
	deletePost,
	getPostById,
	getPosts,
	updatePost,
} from './src/posts/services/PostsService';
import {
	authenticate,
	authorize,
	registerUser,
} from './src/admin/services/AuthService';

const app = express();
const port = 3000;
app.use(express.json());
app.use(authorize);
app.get('/api/posts', async (req, res) => {
	res.json(await getPosts());
});
app.get('/api/posts/:id', async (req, res) => {
	const { id } = req.params;
	res.json(await getPostById(id));
});
app.delete('/api/posts/:id', async (req, res) => {
	const { id } = req.params;
	res.json(await deletePost(id));
});
app.put('/api/posts/:id', async (req, res) => {
	res.json(await updatePost(await req.body));
});
app.post('/api/posts', async (req, res) => {
	res.json(await createPost(await req.body));
});

app.post('/api/login', async (req, res) => {
	const { username, password } = await req.body;
	username != '' ? res.sendStatus(200) : res.sendStatus(401);
});

app.post('/api/register', async (req, res) => {
	res.json(await registerUser(await req.body));
});
app.get('/', async (req, res) => {
	res.sendStatus(401);
});
app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
module.exports = app;
