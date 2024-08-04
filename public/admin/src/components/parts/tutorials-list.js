import { Helper } from "../../helper";

class tutorialsList {
  constructor({ data, api }) {
    this.api = api;
    this.data = data;
    this.element = document.createElement('div');
  }

  static get toolbox() {
    return {
      title: 'Category List',
      icon: '<svg>...</svg>',
    };
  }

  render() {
    const select = document.createElement('select');
    select.onchange = (e) => {
        this.data.selectedValue = e.target.value 
    }
    select.setAttribute("class", "list-tuts-by-cats");
    this.element.appendChild(select);

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Category';
    select.appendChild(defaultOption);
    
    // Set initial value if data is provided
    if (this.data.selectedValue) {
      select.value = this.data.selectedValue;
    }

    Helper.sendRequest({
      api: "categories",
      data: {},
      method: "get"
    }).then(x => {
      if (x.is_error) {
        return;
      }

      if (x.data.length) {
        x.data.forEach(item => {
          const option = document.createElement('option');
          option.value = item._id;
          option.textContent = item.category_name;
          select.appendChild(option);
        });

        // Set initial value again after options are loaded
        if (this.data.selectedValue) { 
          select.value = this.data.selectedValue;
        }
      }
    });

    return this.element;
  }

  save(blockContent) {
    const select = blockContent.querySelector('select');
    //console.log(select)
    return {
      selectedValue: select.value,
    };
  }
}

export { tutorialsList };