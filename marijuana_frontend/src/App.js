import React from 'react';




const Reply = ({ reply }) => (
  <div className='reply'>
    <h3>{reply.username}</h3>
    <p>{reply.content}</p>
  </div>
);

// Bubble component
const Bubble = ({ bubble }) => (
  <div className="bubble-container">
    <div className="bubble">
      
      <h2 style={{ display: 'inline-block', marginLeft: '10px' }}>{bubble.title}</h2>

      <h3> {bubble.username}</h3>
        <p>{bubble.content}</p>
        
        {bubble.replies.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
    </div>
  </div>
);

// Thread component 
const Thread = ({ bubbles }) => (
  <div className="thread">
    {bubbles.map((bubble) => (
      <Bubble key={bubble.id} bubble={bubble} />
    ))}
  </div>
);


// Usage
// Array of bubbles
const bubbles = [
  { 
    id: 1, 
    username: 'Marwan',
    title: "Hello World",
    content: 'This is the first bubble.',
    replies: [
      { id: 1, username: 'Shey', content: 'This is a reply.' },
      // more replies...
    ]
  },
  // more bubbles...
];

function App() {



  return (
    
    <div className="App">
      <h1 style={{textAlign:"center"}}>Bubble</h1>
      <hr />
      <div className='mainBubbles' style={{display: "flex", justifyContent: "center"}}>
        <Thread bubbles={bubbles} />
      </div>
      <button>New Bubble</button>
    </div>
  );
}

export default App;
