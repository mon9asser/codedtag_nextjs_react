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

export { CustomImageTool }