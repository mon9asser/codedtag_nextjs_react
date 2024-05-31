class YouTubeEmbed {
    static get toolbox() {
      return {
        title: 'YouTube',
        icon: `<svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 461.001 461.001" xml:space="preserve">
                    <g>
                        <path style="fill:#F61C0D;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
                            c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
                            C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
                            c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
                    </g>
                </svg>`
      };
    }
  
    constructor({ data, api }) {
      this.api = api;
      this.data = {
        url: data.url || ''
      };
      this.wrapper = undefined;
    }
  
    render() {
      this.wrapper = document.createElement('div');
  
      if (this.data.url) {
        this._createVideo(this.data.url);
        return this.wrapper;
      }
  
      const input = document.createElement('input');
      input.placeholder = 'Enter YouTube video URL';
      input.value = this.data.url;
      input.addEventListener('paste', (event) => {
        this._createVideo(event.clipboardData.getData('text'));
      });
  
      this.wrapper.appendChild(input);
      return this.wrapper;
    }
  
    _createVideo(url) {
      const embedUrl = this._getEmbedUrl(url);
      const iframe = document.createElement('iframe');
  
      iframe.width = '515';
      iframe.height = '315';
      iframe.src = embedUrl;
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
  
      this.wrapper.innerHTML = '';
      this.wrapper.appendChild(iframe);
    }
  
    _getEmbedUrl(url) {
      const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? `https://www.youtube.com/embed/${match[1]}` : '';
    }
  
    save(blockContent) {
      const iframe = blockContent.querySelector('iframe');
      return {
        url: iframe ? iframe.src : ''
      };
    }
  
    validate(savedData) {
      if (!savedData.url.trim()) {
        return false;
      }
      return true;
    }
  }
  
  // Export EmbedTool class as default export
  export {YouTubeEmbed};
  