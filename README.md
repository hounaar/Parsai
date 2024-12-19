
<img src='https://github.com/parsabe/Parsai/blob/main/main.jpg'>

# Parsai - GPT-4 Powered Assistant

Parsai combines a Chrome extension and a Telegram bot to provide versatile coding assistance using OpenAI's GPT-4.

## Distributions

### 1. Parsai Google Chrome Extension
This Chrome Extension, which uses GPT-4,  helps you by responding to your queries.

#### Features
- **Ask GPT-4**: Enter your questions and get responses directly from GPT-4.
- **Syntax Highlighting**: Responses are formatted and highlighted based on the detected programming language.
- **Dark Theme**: The extension features a sleek dark theme with black and dark purple colors.

#### Chrome Extension
1. **Download the Source Code**: Download the source code from the [Releases](https://github.com/your-username/parsai/releases) page.
2. **Extract the Zip File**: Extract the downloaded zip file.
3. **OpenAI API key**: Go to <a href='https://platform.openai.com/settings/organization/api-keys'>OpenAI API Document</a> and get your OpenAI key.
4. **Paste** : Paste your OpenAI key in the popup.js code here:
```js
const OPENAI_API_KEY = ''; //openAI API Key
```

5. **Load Unpacked Extension**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable Developer Mode by toggling the switch in the top right corner.
   - Click on `Load unpacked` and select the extracted directory.



### 2. Parsai Telegram Bot
The Parsai Telegram bot allows you to ask coding questions and receive answers.

#### Features

- Ask questions and get answers from GPT-4 directly in Telegram.
- Easy to use and accessible from anywhere.

#### Setup
1. Go to <a href='https://platform.openai.com/settings/organization/api-keys'>OpenAI API Document</a>
2. Download the Python code from here
3. Install telegram and go to <a href='https://t.me/BotFather'>Telegram BotFather (bot creator)</a>
4. Copy the both OpenAI API and Telegram bot you set and paste them here:
```py
OPENAI_API_KEY = '' #OpenAI API Code
TELEGRAM_API_KEY = '' #Telgram Bot Access Token
```
5. Then Press on start

   <img src='https://github.com/parsabe/Parsai/blob/main/telegram.jpg'>
   <br/>

# Just so you know, you are going to need the TOKEN OF CHATP-GPT 4 TO CHROME EXTENSION AND THE TELEGRAM BOT BOTH FUNCTION WELL.

