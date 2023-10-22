import React, { useState, useEffect } from 'react';
import { ConnectWallet, userSession, setNickname, startThread, postReply, getUserAddress, getNickname, getThread, getPost, getThreadCount } from "./components/Contract";

const Reply = ({ reply }) => (
  <div className='reply'>
    <h3>{reply.username}</h3>
    <p>{reply.content}</p>
  </div>
);

const Bubble = ({ bubble }) => (
  <div className="bubble-container">
    <div className="bubble">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'inline-block'}}>{bubble.title}</h2>
      </div>
      {bubble.posts.map((post, i) => (
        <div>
          <Reply key={i} reply={post} />
          <hr/>
        </div>  
      ))}
    </div>
  </div>
);

const BubblePage = ({ bubble, onClose }) => {
  const [reply, setReply] = useState("");

  return (
    <div className="bubble-page">
      <h2>{bubble.title}</h2>
      {bubble.posts.map((post, i) => (
        <div key={i} className='reply'>
          <h3>{post.username}</h3>
          <p>{post.content}</p>
          <hr/>
        </div>
      ))}
      <textarea type="text" placeholder="Reply" value={reply} onChange={(e) => setReply(e.target.value)} style={{ display: 'block',  padding: '10px', marginBottom: '10px', border: 'none', borderBottom: '1px solid #ccc', fontSize: '18px', color:"grey", height: '50px', width: "400px", resize: "none" }} />
      <button onClick={() => {
        postReply(bubble.id, reply, () => {
          setReply("");
        })
      }}>Reply</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const Threads = () => {
  const [bubbles, setBubbles] = useState([]);
  const [selectedBubble, setSelectedBubble] = useState(null);

  const fetch = async () => {
    const count = await getThreadCount();
    for (let i = 0; i < count; i++) {
      const b = await getThread(i);

      const posts = b.posts.value;
      const p = []
      for (let j = 0; j < posts; j++) {
        let po = await getPost(i, j);
        p.push({
          username: po.data.username.data,
          content: po.data.content.data,
        });
      }

      const bubble = {
        id: i,
        title: b.title.data,
        posts: p,
      };
      if (bubbles.length > i) {
        bubbles[i] = bubble;
      } else {
        bubbles.push(bubble);
      }
    }

    setBubbles(bubbles);
  };
  useEffect(() => {
    fetch();
    const id = setInterval(fetch, 30000);
    return () => clearInterval(id);
  }, []);

  const handleBubbleClick = (bubble) => {
    setSelectedBubble(bubble);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {selectedBubble ? (
        <BubblePage bubble={selectedBubble} onClose={() => setSelectedBubble(null)} />
      ) : (
        bubbles.map((bubble, i) => (
          <div key={i} className="bubble" onClick={() => handleBubbleClick(bubble)}>
            <h2>{bubble.title}</h2>
            <div className="replies">
              {bubble.posts.slice(0, 3).map((post, j) => (
                <div key={j} className="reply">
                  <h3>{post.username}</h3>
                  <p>{post.content}</p>
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

    startThread(title, content, () => {
      setTitle('');
      setContent('');
      setIsOpen(false);
    });
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

function App() {
  const [showNewBubble, setShowNewBubble] = useState(false);
  const [userData, setUserData] = useState(undefined);

  const handleNewBubble = () => {
    setShowNewBubble(!showNewBubble);
  };

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  return (
    <div className="App">
      {userData ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', margin: 0 }}>Bubble</h1>
            <ConnectWallet/>
            <button onClick={handleNewBubble}>New Bubble</button>
          </div>
          <hr/>
          <div className="mainBubbles" style={{ display: 'flex', justifyContent: 'center' }}>
            <Threads/>
          </div>
          {showNewBubble && <NewBubble onNewBubble={() => {}} />}
        </>
      ) : (
        <div className="welcome-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
          <h1>Welcome to Bubble</h1>
          <p>Please connect your wallet to continue.</p>
          <ConnectWallet/>
        </div>
      )}
    </div>
  );
}

export default App;
