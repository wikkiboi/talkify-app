function App() {
  return <div>Hi This is Talkigfy asdfkjhasdfjkasdh</div>;
}

export default App;

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discord Clone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="sidebar">
    <h2>Server Name</h2>
    <div id="voice-channels">
      <h3>Voice Channels</h3>
      <ul id="channel-list">
        <li contenteditable="true" class="channel">General</li>
      </ul>
      <button id="add-channel">+ Add Channel</button>
    </div>
  </div>
  <div id="main">
    <h1>Voice Chat</h1>
    <p>Select a channel to join.</p>
  </div>
  <script>
        document.getElementById('add-channel').addEventListener('click', function() {
            const ul = document.getElementById('channel-list');
            const li = document.createElement('li');
            li.contentEditable = "true";
            li.className = "channel";
            li.innerText = "New Channel";
            ul.appendChild(li);
        });
    </script>
</body>
</html>
