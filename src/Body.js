import React from 'react';

function Body() {
  return (
    <main className="main-body">
      <h1>Welcome to MB Studio</h1>
      <p>This is the main body component.</p>
      <br />
      <p>Scroll down to see that the Navbar and Footer remain fixed!</p>
      {/* Adding dummy text to demonstrate scrolling */}
      <div style={{ marginTop: '50px', height: '150vh' }}>
        <p>Lots of content goes here...</p>
      </div>
    </main>
  );
}

export default Body;