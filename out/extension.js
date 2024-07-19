"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const axios_1 = require("axios");
const path = require("path");
const fs = require("fs");
// Replace this with your actual OpenAI API key
const OPENAI_API_KEY = '';
function activate(context) {
    let disposable = vscode.commands.registerCommand('parsai.chat', () => __awaiter(this, void 0, void 0, function* () {
        const userInput = yield vscode.window.showInputBox({ prompt: 'Enter your question for ChatGPT' });
        if (userInput) {
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Parsai is thinking...",
                cancellable: false
            }, (progress, token) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                        model: 'gpt-4',
                        messages: [{ role: 'user', content: userInput }],
                        max_tokens: 2600 // Increase max_tokens to get more content
                    }, {
                        headers: {
                            'Authorization': `Bearer ${OPENAI_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data && response.data.choices && response.data.choices[0].message) {
                        const output = response.data.choices[0].message.content.trim();
                        yield displayResponseInEditor(output);
                    }
                    else {
                        throw new Error('Invalid response format from OpenAI API');
                    }
                }
                catch (error) {
                    let errorMessage = 'Error communicating with OpenAI API';
                    if (axios_1.default.isAxiosError(error)) {
                        if (error.response && error.response.data && error.response.data.error) {
                            errorMessage += `: ${error.response.data.error.message}`;
                        }
                        else {
                            errorMessage += `: ${error.message}`;
                        }
                    }
                    else if (error instanceof Error) {
                        errorMessage += `: ${error.message}`;
                    }
                    else {
                        errorMessage += ': An unknown error occurred';
                    }
                    vscode.window.showErrorMessage(errorMessage);
                }
            }));
        }
    }));
    context.subscriptions.push(disposable);
}
function displayResponseInEditor(output) {
    return __awaiter(this, void 0, void 0, function* () {
        const language = detectLanguage(output);
        const fileExtension = getFileExtension(language);
        const fileName = `response.${fileExtension}`;
        const filePath = path.join(vscode.workspace.rootPath || '', fileName);
        // Write the output to a new file
        fs.writeFileSync(filePath, output);
        // Open the new file in the editor
        const doc = yield vscode.workspace.openTextDocument(filePath);
        yield vscode.window.showTextDocument(doc, { preview: false });
        // Set the language mode of the opened document
        yield vscode.languages.setTextDocumentLanguage(doc, language);
    });
}
function detectLanguage(text) {
    if (text.startsWith("```")) {
        const firstLine = text.split('\n')[0];
        const language = firstLine.slice(3).trim();
        return language || 'plaintext';
    }
    return 'plaintext';
}
function getFileExtension(language) {
    const languageToExtension = {
        'python': 'py',
        'javascript': 'js',
        'typescript': 'ts',
        'html': 'html',
        'css': 'css',
        'java': 'java',
        'c': 'c',
        'cpp': 'cpp',
        'ruby': 'rb',
        'go': 'go',
        'php': 'php',
        'swift': 'swift',
        'kotlin': 'kt',
        'rust': 'rs',
        'r': 'r',
        'perl': 'pl',
        'plaintext': 'txt'
    };
    return languageToExtension[language] || 'txt';
}
function deactivate() { }
//# sourceMappingURL=extension.js.map
