// import React, { useState } from "react";

// const App = () => {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [language, setLanguage] = useState("javascript");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch("/api/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ code, language }),
//       });
//       const data = await response.json();
//       setOutput(data.output);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Language:
//           <select
//             value={language}
//             onChange={(event) => setLanguage(event.target.value)}
//           >
//             <option value="javascript">JavaScript</option>
//             <option value="python">Python</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Code:
//           <textarea
//             value={code}
//             onChange={(event) => setCode(event.target.value)}
//           ></textarea>
//         </label>
//         <br />
//         <button type="submit">Run</button>
//       </form>
//       <br />
//       <label>
//         Output:
//         <pre>{output}</pre>
//       </label>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";

const App = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, input }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Language:
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </label>
        <br />
        <label>
          Code:
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
          ></textarea>
        </label>
        <br />
        <label>
          Input:
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Run</button>
      </form>
      <br />
      <label>
        Output:
        <pre>{output}</pre>
      </label>
    </div>
  );
};

export default App;
