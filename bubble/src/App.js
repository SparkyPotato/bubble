import React, { useState } from 'react';
import ConnectWallet from "./components/ConnectWallet";
import ContractCallVote from "./components/ContractCallVote";


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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'inline-block'}}>{bubble.title}</h2>
        <button>Reply</button>
    </div>
      
  

      <h3> {bubble.username}</h3>
      <p>{bubble.content}</p>
      <hr></hr>
        
        {bubble.replies.map((reply) => (
          <div>
          <Reply key={reply.id} reply={reply} />
          <hr></hr>
          </div>
          
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

const NewBubble = ({ onNewBubble }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onNewBubble({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Create Bubble</button>
    </form>
  );
};



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
  { 
    id: 2, 
    username: 'Shaye',
    title: "I need a gf",
    content: 'Please i need gf immediately',
    replies: [
      { id: 1, username: 'Prath', content: 'I do not volunteer' },
      { id: 1, username: 'Kosta', content: 'Me' },
      // more replies...
    ]
  },
  { 
    id: 2, 
    username: 'Shaye',
    title: "I need a gf",
    content: 'Please i need gf immediately',
    replies: [
      { id: 1, username: 'Prath', content: 'I do not volunteer' },
      { id: 1, username: 'Kosta', content: 'Me' },
      // more replies...
    ]
  },
  { 
    id: 2, 
    username: 'Shaye',
    title: "I need a gf",
    content: 'Please i need gf immediately',
    replies: [
      { id: 1, username: 'Prath', content: 'I do not volunteer' },
      { id: 1, username: 'Kosta', content: 'Me' },
      // more replies...
    ]
  },

  // more bubbles...
];
function App() {
  const [isConnected, setIsConnected] = useState(false);




  const handleConnect = () => {
    setIsConnected(true);

  };



  return (
    
      <div className="App">
        {isConnected ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ textAlign: 'center', margin: 0 }}>Bubble</h1>
              <ConnectWallet onConnect={handleConnect} />
              <ContractCallVote />
            </div>
            <hr />
            <div className="mainBubbles" style={{ display: 'flex', justifyContent: 'center' }}>
              <Thread bubbles={bubbles} />
            </div>
            
         
          </>
        ) : (
          
            <div className="welcome">
              <h1>Welcome to Bubble</h1>
              <p>Please connect your wallet to continue.</p>
              <ConnectWallet onConnect={handleConnect} />
              
            </div>
          
        )}
      </div>

  );
}

export default App;
