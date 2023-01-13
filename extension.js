const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// // 	vscode.window.showInformationMessage('');
	// const texOpener = "vizor.openTex";
	// const texHandler = async () => {
	// 	var editor = vscode.window.activeTextEditor;
	// 	if (!editor) { return; }

	// 	var currentFolder = path.dirname(vscode.window.activeTextEditor.document.uri.fsPath);
	// 	var fileName = '';
	// 	var targetPath = '';

	// 	var selection = editor.selection;
	// 	// parse the current line if no text is selected 
	// 	if (selection.isEmpty) {
	// 		fileName = await parseForTex(editor, selection);
	// 		if (!fileName) { return; }
	// 	} else {
	// 		fileName = editor.document.getText(selection);
	// 	}
	// 	// add .tex to the filename if it has no extension
	// 	if (path.extname(fileName) === '') {
	// 		fileName = fileName + '.tex';
	// 	}
	// 	// open the file if it exists
	// 	targetPath = path.join(currentFolder, fileName);
	// 	if (fs.existsSync(targetPath)) {
	// 		vscode.commands.executeCommand("vscode.open", vscode.Uri.file(targetPath));
	// 	}
	// };

	const imageOpener = "vizor.openImage";
	const imageHandler = async () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		var currentFolder = path.dirname(vscode.window.activeTextEditor.document.uri.fsPath);
		var fileName = '';
		var tmpName = '';
		var targetPath = '';

		// get paths corresponding to \graphicspath from the settings
		const vizor = vscode.workspace.getConfiguration('vizor');
		const imagePath = vizor.get('imagePath');
		const imageType = vizor.get('imageType');

		var selection = editor.selection;
		// parse the current line if no text is selected
		if (selection.isEmpty) {
			fileName = await parseForImage(editor, selection);
			if (!fileName) { return; }
		} else {
			fileName = editor.document.getText(selection);
		}

		// add an extension such as .png to the filename by turns if it has no extension
		if (path.extname(fileName) === '') {
			for (let i=0; i<imageType.length; i++) {
				tmpName = fileName + imageType[i];
				targetPath = findImage(currentFolder, imagePath, tmpName);
				if (targetPath) { break; }
			}
		} else {
			targetPath = findImage(currentFolder, imagePath, fileName);
		}
		
		if (!targetPath.isEmpty) {
			vscode.commands.executeCommand("vscode.open", vscode.Uri.file(targetPath));			
		}
	};

	// context.subscriptions.push(vscode.commands.registerCommand(texOpener, texHandler));
	context.subscriptions.push(vscode.commands.registerCommand(imageOpener, imageHandler));
}

// called by imageHandler
// find the target image file along the paths
function findImage(currentFolder, imagePath, fileName) {
	var targetPath = '';
	for (let i=0; i<imagePath.length; i++) {
		targetPath = path.join(currentFolder, imagePath[i], fileName);
		if (fs.existsSync(targetPath)) {
			return targetPath;
		}
	}
	return false;
}

// called by texHandler
// find texts beginning with \include or \input from the current line to get TeX filenames
function parseForTex(editor, selection) {
	var currLine = editor.document.lineAt(selection.active.line).text;
	var foundFiles = currLine.match(/(?<=\\include\{).+?(?=\})|(?<=\\input\{).+?(?=\})/g);
	if (foundFiles === null) {
		return false;
	} else {
		if (foundFiles.length == 1) {
			return foundFiles[0];
		} else {
			// display filenames for user to pick one when there are two or more
			const pick = pickItem(foundFiles);
			return pick
		}
	}
}

// called by imageHandler
// find texts beginning with \includegraphics and suchlike from the current line to get image filenames 
function parseForImage(editor, selection) {
	var currLine = editor.document.lineAt(selection.active.line).text;
	const  regex = [ 
		/(?<=\\image[*|\|]{0,2}\{).+?(?=\})/g,
		/(?<=\\image[*|\|]{0,2}\[.+?\]\{).+?(?=\})/g,
		/(?<=\\begin\{IllustImage\}[*|^]{0,2}\{).+(?=\})/g,
		/(?<=\\begin\{IllustImage\}[*|^]{0,2}\[.+?\]\{).+(?=\})/g,
		/(?<=\\begin\{IllustEnum\}[*|^]{0,2}\{).+(?=\})/g,
		/(?<=\\begin\{IllustEnum\}[*|^]{0,2}\[.+?\]\{).+(?=\})/g,
		/(?<=\\listimg\{).+?(?=\})/g,
		/(?<=\\listimg\[.+?\]\{).+?(?=\})/g,
		/(?<=\\img\{).+?(?=\})/g,
		/(?<=\\img\[.+?\]\{).+?(?=\})/g,
		/(?<=\\includegraphics\{).+?(?=\})/g,
		/(?<=\\includegraphics\[.+?\]\{).+?(?=\})/g
	];
	var foundFiles = [];
	var foundAny = [];
	for(let i=0; i<regex.length; i++) {
		foundAny = currLine.match(regex[i]);
		if (foundAny) {
			vscode.window.showInformationMessage(foundAny);
			foundFiles = foundFiles.concat(foundAny);
		}
	}

	if (foundFiles === null) {
		return false;
	} else {
		if (foundFiles.length == 1) {
			return foundFiles[0];
		} else {
			const pick = pickItem(foundFiles);
			return pick
		}
	} 
}

// called by parseForTex() and parseForImage() 
async function pickItem(items) {
	const item = await vscode.window.showQuickPick(items, {placeHolder: "Select one:"});
	if (!item) {
		return false;
	} else {
		return item 
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
