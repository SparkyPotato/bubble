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
      
  
      <div>
        <h3> {bubble.username}</h3>
        <p>{bubble.content}</p>
        <hr></hr>
      </div>
        
        {bubble.replies.map((reply) => (
          <div>
          <Reply key={reply.id} reply={reply} />
          <hr></hr>
          </div>
          
        ))}
    </div>
  </div>
);


const BubblePage = ({ bubble, onClose }) => {
  return (
    <div className="bubble-page">
      <h2>{bubble.title}</h2>
      
      <div>
        <h3>{bubble.username}</h3>
        <p>{bubble.content}</p>
        <hr/>
      </div>

      {bubble.replies.map((reply) => (
        <div key={reply.id} className='reply'>
          <h3>{reply.username}</h3>
          <p>{reply.content}</p>
          <hr/>
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
// Thread component 
const Thread = ({ bubbles }) => {
  const [selectedBubble, setSelectedBubble] = useState(null);

  const handleBubbleClick = (bubble) => {
    setSelectedBubble(bubble);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {selectedBubble ? (
        <BubblePage bubble={selectedBubble} onClose={() => setSelectedBubble(null)} />
      ) : (
        bubbles.map((bubble) => (
          <div key={bubble.id} className="bubble" onClick={() => handleBubbleClick(bubble)}>
            
            <h2>{bubble.title}</h2>
            <div>
              <h3>{bubble.username}</h3>
              <p>{bubble.content}</p>
              <hr/>
            </div>

        
      
            <div className="replies">
              {bubble.replies.slice(0, 3).map((reply) => ( //will only display first 3 replies on main page
                <div key={reply.id} className="reply">
                  <h3>{reply.username}</h3>
                  <p>{reply.content}</p>
                  
                <hr/>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};




const NewBubble = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle('');
    setContent('');
    setIsOpen(false);
    <ContractCallVote/>
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      
      {isOpen && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: "black", padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <form onSubmit={handleSubmit}>
            <textarea type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ display: 'block',  padding: '10px', marginBottom: '10px', border: 'none', borderBottom: '1px solid #ccc', fontSize: '18px', color:"grey", height: '50px', width: "400px", resize: "none" }} />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} style={{ display: 'block', padding: '10px', marginBottom: '10px', border: 'none', borderBottom: '1px solid #ccc', fontSize: '18px', color:"grey", height: '200px', width: "400px", resize: "none" }} />
            <div style={{display: 'flex',justifyContent: "space-between"}}>
              <button type="submit" style={{ display: 'block', width: '40%', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer' }}>Create Bubble</button>
              <button type="button" onClick={handleCancel} style={{ display: 'block', width: '40%',  backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
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
    content: 'Please i need gf immediatenfvdcngjdnogfly',
    replies: [
      { id: 1, username: 'Prath', content: 'I do not volunteer' },
      { id: 1, username: 'Costa', content: 'Me' },
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
      { id: 1, username: 'Costa', content: 'Me' },
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
      { id: 1, username: 'Costa', content: 'Me' },
      // more replies...
    ]
  },

  // more bubbles...
];


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [showNewBubble, setShowNewBubble] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleNewBubble = () => {
    setShowNewBubble(!showNewBubble);
  };

  return (
    <div className="App">
      {isConnected ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', margin: 0 }}>Bubble</h1>
            <ConnectWallet onConnect={handleConnect} />
            <button onClick={handleNewBubble}>New Bubble</button>
          </div>
          <hr />
          <div className="mainBubbles" style={{ display: 'flex', justifyContent: 'center' }}>
            <Thread bubbles={bubbles} />
          </div>
          {showNewBubble && <NewBubble onNewBubble={() => {}} />}
        </>
      ) : (
        <div className="welcome-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
          <h1>Welcome to Bubble</h1>
          <p>Please connect your wallet to continue.</p>
          <ConnectWallet onConnect={handleConnect} />
        </div>
      )}
    </div>
  );
}

export default App;
