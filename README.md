# LaunchDarkly Feature Flag Example

A simple example demonstrating LaunchDarkly client-side feature flags with a button that appears/disappears based on the `show-button-color` flag.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the LaunchDarkly Client ID in `main.js`:
   - Open `main.js` and replace `'your-client-id-here'` with your actual LaunchDarkly Client ID

3. Create a feature flag in LaunchDarkly:
   - Flag key: `show-button-color`
   - Flag type: **String**
   - When ON: Set the value to a hex color (e.g., `#ff5733`, `#28a745`, `#dc3545`)
   - When OFF: Set the value to `off` or leave empty - The button will not be displayed

4. Run the development server:
```bash
npm run dev
```

5. Open the URL shown in the terminal (typically `http://localhost:5173`)

## How it works

- When the `show-button-color` flag is **OFF**: The button is hidden
- When the `show-button-color` flag is **ON**: The button is displayed with the color specified in the flag value (hex color code)

The app uses a basic user context with a randomly generated user key for demonstration purposes.

