// Import the base Image tool
import ImageTool from '@editorjs/image';

// Create a custom image tool by extending the base Image tool
class CustomImageTool extends ImageTool {
    // Override the render method to add a custom attribute
    render() {
      const wrapper = super.render();
      
      // Assuming wrapper contains the img element, find and modify it
      const img = wrapper.querySelector('img');
      if (img) {
        img.setAttribute("crossOrigin","anonymous");
      }
      
      return wrapper;
    }
}


class CustomImageTool2 {
  static get toolbox() {
    return {
      title: 'Image by URL',
      icon: '<svg>...</svg>' // You can customize the icon here
    };
  }

  // Constructor receives Tool's saved data
  constructor({ data, api }) {
    this.data = data;
    this.api = api;
    this.wrapper = null;
    this.inputUrl = null;
    this.inputAlt = null;
  }

  // Create the tool UI
  render() {
    this.wrapper = document.createElement('div');
    
    // Create input for the image URL
    this.inputUrl = document.createElement('input');
    this.inputUrl.placeholder = 'Enter image URL...';
    this.inputUrl.value = this.data.url || '';
    this.inputUrl.style.width = '100%';
    this.inputUrl.style.marginBottom = '10px';
    this.wrapper.appendChild(this.inputUrl);

    // Create input for the alt attribute
    this.inputAlt = document.createElement('input');
    this.inputAlt.placeholder = 'Enter alt text...';
    this.inputAlt.value = this.data.alt || '';
    this.inputAlt.style.width = '100%';
    this.wrapper.appendChild(this.inputAlt);

    // If there's an existing image URL, show the image preview
    if (this.data.url) {
      const img = document.createElement('img');
      img.src = this.data.url;
      img.alt = this.data.alt;
      img.style.maxWidth = '100%';
      this.wrapper.appendChild(img);
    }

    return this.wrapper;
  }

  // Save data when the user leaves the block
  save(blockContent) {
    return {
      url: this.inputUrl.value,
      alt: this.inputAlt.value
    };
  }

  // Add some CSS to style the editor block
  static get pasteConfig() {
    return {
      tags: ['img']
    };
  }

  // Handle pasted content (e.g., an image)
  onPaste(event) {
    const imgTag = event.detail.data;
    this.data = {
      url: imgTag.src,
      alt: imgTag.alt
    };
  }
}


export { CustomImageTool, CustomImageTool2 }