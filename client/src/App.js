import React, { useState } from 'react';

function App() {
	const [pythonCode, setPythonCode] = useState('');
	const [output, setOutput] = useState('');

	const executeCode = async () => {
		try {
			const response = await fetch('http://localhost:3001/api/execute', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code: pythonCode }),
			});
			const data = await response.json();
			setOutput(data.output);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<textarea
				value={pythonCode}
				onChange={(e) => setPythonCode(e.target.value)}
			></textarea>
			<button onClick={executeCode}>Execute</button>
			<pre>{output}</pre>
		</div>
	);
}

export default App;
