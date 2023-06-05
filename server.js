const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.post('/api/execute', (req, res) => {
	const code = req.body.code;

	exec(`python -c "${code}"`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Execution error: ${error}`);
			res.status(500).json({ output: 'Execution error' });
		} else {
			console.log(`Output: ${stdout}`);
			res.json({ output: stdout });
		}
	});
});
app.use('/', express.static(__dirname + '/'));
app.get('/', (req, res) => {
	res.send('<h1>Hi</h1>');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
