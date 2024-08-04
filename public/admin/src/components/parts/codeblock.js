import hljs from 'highlight.js';
 
class CustomCodeBlok {
 
    constructor(initialData = {}) {
        this.initialData = initialData;
    }
            
    static get isReadOnlySupported() {
        return true;
    }

    static get enableLineBreaks() {
        return true;
    }

    setInitialData(codeContainer) {
        const textareaElem = codeContainer.querySelector('textarea');
        const codeElem = codeContainer.querySelector('code');
        
        if (this.initialData) {
            textareaElem.value = this.initialData.data.value || '';
            
            const language = this.initialData.data.language_type || 'plaintext';
            
            textareaElem.dataset.lang = language;
            codeElem.innerHTML = hljs.highlight(textareaElem.value, {language}).value;
            codeContainer.querySelector('.language-type').innerText = language.toUpperCase();
            codeContainer.querySelector('pre').className = `hljs language-${language}`;
        }
    }

    static get toolbox() {
        return {
            title: 'Code',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 4L11 9L7 14" stroke="#33363F" stroke-width="2"/><path d="M17 10L13 15L17 20" stroke="#33363F" stroke-width="2"/></svg>'
        };
    }
    
    languages () {
        return hljs.listLanguages(); 
    }

    // merge and combine HLJS within editor
    render() {
        // Create code container
        const codeContainer = document.createElement('div');
        codeContainer.setAttribute('contenteditable', 'false');
        codeContainer.className = 'hljs code-block-container ce-code cdx-block';

        // Header Section
        const codeHeader = document.createElement('div');
        codeHeader.setAttribute('contenteditable', 'false');
        codeHeader.className = 'precode-header';
        codeHeader.innerHTML = `
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
                    <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
                        <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle>
                        <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle>
                        <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle>
                    </g>
                </svg>
            </span>
            <div className='hljs-copy-and-controller'>
                <div className='hljs-lang-combox'></div>
            </div>
        `;

        // ComboBox for languages
        const comboBox = document.createElement('label');
        comboBox.className = 'label-selector';
        comboBox.setAttribute('contenteditable', 'false');
        comboBox.innerHTML = `<span>Language Code:</span><div className='select-wrapper'><select className='select-language'></select></div>`;
        const selectLanguage = comboBox.querySelector('.select-language');

        // Populate select options
        const languages = this.languages(); // Assuming this is defined elsewhere
        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.innerHTML = lang.toUpperCase();
            option.selected = lang === 'plaintext';
            selectLanguage.appendChild(option);
        });

        // Append comboBox to codeHeader
        codeHeader.querySelector('.hljs-lang-combox').appendChild(comboBox);

        // Code Section
        const block = document.createElement('div');
        block.setAttribute('contenteditable', 'false');
        block.className = 'codedtag-block-of-code';
        const codeElem = document.createElement('pre');
        codeElem.className = 'hljs language-plaintext';
        const code = document.createElement('code');
        code.className = 'hljs';
        const textareaElem = document.createElement('textarea');
        textareaElem.className = 'ce-code__textarea cdx-input';
        codeElem.appendChild(code);
        block.appendChild(codeElem);
        block.appendChild(textareaElem);
         
        // Footer section
        const codeFooter = document.createElement('div');
        codeFooter.setAttribute('contenteditable', 'false');
        codeFooter.className = 'precode-footer';
        codeFooter.innerHTML = '<span className="language-type">plaintext</span>';

        // Append all to main block
        codeContainer.appendChild(codeHeader);
        codeContainer.appendChild(block);
        codeContainer.appendChild(codeFooter);
        
        // Event listeners
        textareaElem.addEventListener('input', function (e) {
            e.preventDefault();
            var language = textareaElem.dataset.lang == undefined ? "plaintext": textareaElem.dataset.lang
             
            code.innerHTML = hljs.highlight(textareaElem.value, {language: language}).value;
        });

        var _this = this;

        textareaElem.addEventListener('keydown', function (e) {
            if (e.code === 'Tab') { 
                // Assuming tabHandler is defined elsewhere
                _this.tabHandler(e);
            }
        });

        selectLanguage.addEventListener('change', function (e) {
            const lang = selectLanguage.value;
            //console.log(lang)
            codeFooter.querySelector('span').innerHTML = lang.toUpperCase();
            const pre = codeContainer.querySelector('pre');
            pre.className = `hljs language-${lang}`;
            textareaElem.dataset.lang = lang;
            code.innerHTML = hljs.highlight(textareaElem.value, {language: lang}).value;
        });
        
        // Return the codeContainer element
        this.setInitialData(codeContainer);

        return codeContainer;

    }

    save(blockContent) {

        const copy = blockContent.cloneNode(true); // Deep clone the node
        var textarea = copy.querySelector('.cdx-input');
         
        return {
            language_type: textarea.getAttribute("data-lang") == null ? "plaintext" : textarea.getAttribute("data-lang"),
            value: textarea.value,
            enabled_compiler: false
        };
        /*
        return copy; // Returns the cloned node
        return copy.innerHTML; // Returns the HTML content of the cloned node
        */
    
    }

    getCharAtPosition(str, position) {
        let char = '';
        for (; char !== '\n' && position > 0;) {
            position = position - 1;
            char = str.substr(position, 1);
        }
        return char === '\n' && (position += 1), position;
    }
    
    tabHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        
        const textarea = event.target;
        const code = textarea.parentNode.querySelector("code");
        
        const shiftKey = event.shiftKey;
        const cursorPosition = textarea.selectionStart;
        const textValue = textarea.value;
        const spaces = '  ';
        let newCursorPosition;
        
        if (!shiftKey) {
            newCursorPosition = cursorPosition + spaces.length;
            textarea.value = textValue.substring(0, cursorPosition) + spaces + textValue.substring(cursorPosition);
        
            code.innerHTML = hljs.highlightAuto(textarea.value).value;
        } else {
            const lineStart = this.getCharAtPosition(textValue, cursorPosition); // Assuming this function is defined
            if (textValue.substr(lineStart, spaces.length) !== spaces) return;
            textarea.value = textValue.substring(0, lineStart) + textValue.substring(lineStart + spaces.length);
        
            code.innerHTML = hljs.highlightAuto(textarea.value).value;
            newCursorPosition = cursorPosition - spaces.length;
        }
        
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        
    }
         
}


export { CustomCodeBlok }