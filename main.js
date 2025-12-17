import * as LDClient from 'launchdarkly-js-client-sdk';

// Set your LaunchDarkly Client ID here
const CLIENT_ID = 'your-client-id-here';

// Create a basic user context
const user = {
  key: 'user-' + Math.random().toString(36).substr(2, 9),
  name: 'Demo User',
  anonymous: false
};

// Display user context
function displayUserContext() {
  const userContextEl = document.getElementById('user-context');
  userContextEl.textContent = JSON.stringify(user, null, 2);
}

// Initialize LaunchDarkly client
const ldClient = LDClient.initialize(CLIENT_ID, user);

// Display user context immediately
displayUserContext();

ldClient.on('ready', () => {
  updateConnectionStatus('LaunchDarkly connected', '#28a745');
  updateButton();
});

ldClient.on('change', () => {
  updateButton();
});

function updateConnectionStatus(message, color = '#666') {
  const connectionStatusEl = document.getElementById('connection-status');
  connectionStatusEl.innerHTML = `<p style="color: ${color};">${message}</p>`;
}

function updateButton() {
  const buttonContainer = document.getElementById('button-container');
  const flagInfoEl = document.getElementById('flag-info');
  
  // Get the feature flag value (should be a hex color string when on, or empty/off when off)
  const flagValue = ldClient.variation('show-button-color', 'off');
  
  // Check if flag is off or doesn't contain a valid hex color
  if (!flagValue || flagValue === 'off' || flagValue === false || 
      (typeof flagValue === 'string' && !flagValue.startsWith('#'))) {
    // Flag is off - don't show button
    buttonContainer.innerHTML = '';
    flagInfoEl.innerHTML = `
      <p><strong>Flag Key:</strong> show-button-color</p>
      <p><strong>Status:</strong> <span style="color: #dc3545;">OFF</span></p>
      <p><strong>Value:</strong> ${flagValue || 'off'}</p>
    `;
  } else {
    // Flag is on - show button with the hex color from the flag value
    const buttonColor = flagValue;
    
    buttonContainer.innerHTML = `
      <button id="demo-button" style="background-color: ${buttonColor}">
        Click Me!
      </button>
    `;
    
    flagInfoEl.innerHTML = `
      <p><strong>Flag Key:</strong> show-button-color</p>
      <p><strong>Status:</strong> <span style="color: #28a745;">ON</span></p>
      <p><strong>Color Value:</strong> <span style="color: ${buttonColor};">${buttonColor}</span></p>
    `;
    
    // Add click handler
    document.getElementById('demo-button').addEventListener('click', () => {
      alert('Button clicked!');
    });
  }
}

