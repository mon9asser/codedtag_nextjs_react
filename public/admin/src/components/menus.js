import React, { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js"; // Import Helper from your helper file

class Menus extends Component {
  constructor(props) {
    super(props);
    this.request_result_ref = React.createRef("");
    this.state = {
      menus: [],
      deletedIds: [], // Track deleted IDs
      is_pressed: false,
      show_message: "",
      request_status_class: "",
      request_message: "",
      menu_name: "main_menu"
    };
  }

  componentDidMount() {
    // Fetch existing menus from the API if needed
    this.fetchMenus();
  }

  fetchMenus = async () => {
    try {
      const response = await Helper.sendRequest({
        api: 'menus',
        method: 'GET',
        data: {}
      });
      this.setState({ menus: response.data });
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  addMainMenu = () => {
    this.setState((prevState) => ({
      menus: [
        ...prevState.menus,
        { _id: Helper.generateObjectId(), title: "", link: "", menu_name: this.state.menu_name, openInNewTab: false, subitems: [] },
      ],
    }));
  };

  addSubItem = (menuIndex) => {
    const newMenus = [...this.state.menus];
    newMenus[menuIndex].subitems.push({ _id: Helper.generateObjectId(), title: "", link: "", openInNewTab: false });
    this.setState({ menus: newMenus });
  };

  handleChange = (e, menuIndex, subItemIndex = null) => {
    const { name, value, type, checked } = e.target;
    const newMenus = [...this.state.menus];
    if (subItemIndex === null) {
      newMenus[menuIndex][name] = type === 'checkbox' ? checked : value;
    } else {
      newMenus[menuIndex].subitems[subItemIndex][name] = type === 'checkbox' ? checked : value;
    }
    this.setState({ menus: newMenus });
  };

  deleteMainMenu = (menuIndex) => {
    const menu = this.state.menus[menuIndex];
    if (menu._id) {
      this.setState((prevState) => ({
        deletedIds: [...prevState.deletedIds, menu._id],
      }));
    }
    const newMenus = this.state.menus.filter((_, index) => index !== menuIndex);
    this.setState({ menus: newMenus });
  };

  deleteSubItem = (menuIndex, subItemIndex) => {
    const subitem = this.state.menus[menuIndex].subitems[subItemIndex];
    if (subitem._id) {
      this.setState((prevState) => ({
        deletedIds: [...prevState.deletedIds, subitem._id],
      }));
    }
    const newMenus = [...this.state.menus];
    newMenus[menuIndex].subitems = newMenus[menuIndex].subitems.filter((_, index) => index !== subItemIndex);
    this.setState({ menus: newMenus });
  };

  validateMenus = () => {
    const { menus } = this.state;
    for (let menu of menus) {
      if (!menu.title || !menu.link) {
        return false;
      }
      for (let subitem of menu.subitems) {
        if (!subitem.title || !subitem.link) {
          return false;
        }
      }
    }
    return true;
  };

  save_menus = async () => {
    if (!this.validateMenus()) {
      this.setState({
        request_status_class: 'error',
        request_message: 'Please fill in all required fields.',
        show_message: 'show_message',
      });
      return;
    }

    this.setState({ is_pressed: true });
    try {
      const response = await Helper.sendRequest({
        api: 'menu/create-update',
        method: 'POST',
        data: { menus: this.state.menus, deletedIds: this.state.deletedIds } // Include deleted IDs
      });
      if (response.is_error) {
        throw new Error(response.message);
      }
      this.setState({
        request_status_class: 'success',
        request_message: 'Link saved successfully!',
        show_message: 'show_message',
        is_pressed: false,
        deletedIds: [] // Clear deleted IDs after successful save
      });
    } catch (error) {
      this.setState({
        request_status_class: 'error',
        request_message: error.message || 'An error occurred while saving the menus.',
        show_message: 'show_message',
        is_pressed: false,
      });
    }
  };

  render() {
    return (
      <div id="app">
        <NavbarContainer />
        <SidebarContainer />
        <section className="section main-section">
          <div style={{ margin: "20px" }}>
            
            <button onClick={this.addMainMenu} style={styles.addButton}>Add Item to</button>
            
            <select style={{border: "1px solid #999", marginLeft: "10px", padding: "5px", outline: "none"}} value={this.state.menu_name} onChange={e => this.setState({menu_name: e.target.value})}>
              <option value="main_nav_left">Main Header ( Left )</option>
              <option value="main_nav_right">Main Header ( Right )</option>
              <option value="company_nav_links">Company Links</option>
              <option value="follow_nav_links">Follow Links</option>
              <option value="tags_nav_links">Tags Links</option>
            </select>

            {this.state.menus.map((menu, menuIndex) => (
              <div key={menu._id} style={styles.menuItem}>
                <label>{menu.menu_name}</label>
                <div style={styles.menuHeader}>
                  <input
                    type="text"
                    name="title"
                    value={menu.title}
                    placeholder="Menu Title"
                    onChange={(e) => this.handleChange(e, menuIndex)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="link"
                    value={menu.link}
                    placeholder="Menu Link"
                    onChange={(e) => this.handleChange(e, menuIndex)}
                    style={styles.input}
                  />
                  <label style={styles.label}>
                    <input
                      type="checkbox"
                      name="openInNewTab"
                      checked={menu.openInNewTab}
                      onChange={(e) => this.handleChange(e, menuIndex)}
                    />
                    Open in new tab
                  </label>
                  <button onClick={() => this.addSubItem(menuIndex)} style={styles.addButton}>Add Sub-Item</button>
                  <button onClick={() => this.deleteMainMenu(menuIndex)} style={styles.deleteButton}>Delete</button>
                </div>
                {menu.subitems.map((subitem, subItemIndex) => (
                  <div key={subitem._id} style={styles.subitem}>
                    <input
                      type="text"
                      name="title"
                      value={subitem.title}
                      placeholder="Sub-Item Title"
                      onChange={(e) => this.handleChange(e, menuIndex, subItemIndex)}
                      style={styles.input}
                    />
                    <input
                      type="text"
                      name="link"
                      value={subitem.link}
                      placeholder="Sub-Item Link"
                      onChange={(e) => this.handleChange(e, menuIndex, subItemIndex)}
                      style={styles.input}
                    />
                    <label style={styles.label}>
                      <input
                        type="checkbox"
                        name="openInNewTab"
                        checked={subitem.openInNewTab}
                        onChange={(e) => this.handleChange(e, menuIndex, subItemIndex)}
                      />
                      Open in new tab
                    </label>
                    <button onClick={() => this.deleteSubItem(menuIndex, subItemIndex)} style={styles.deleteButton}>Delete</button>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction `}>
            {this.state.request_message}
          </div>

          <div style={styles.stickyFooter}>
            
            <div style={styles.footerButtons}>
              <a onClick={this.save_menus} className="button blue" style={styles.saveButton}>
                {
                  (this.state.is_pressed) ?
                    <span className="loader"></span> :
                    "Save"
                }
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const styles = {
  menuItem: {
    background: "#f1f1f1",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    border: "1px solid #000",
    marginTop: "35px",
  },
  menuHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  subitem: {
    background: "#fff",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "3px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    flex: 1,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  addButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  deleteButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    backgroundColor: "#f44336",
    color: "white",
  },
  stickyFooter: {
    position: "sticky",
    zIndex: "200",
    display: "flex",
    justifyContent: "space-between",
    bottom: "0",
    width: "90%",
    padding: "20px",
    background: "#f9f9f9",
    margin: "0 auto",
  },
  deleteArticleButton: {
    marginTop: "15px",
  },
  footerButtons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  saveButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "white",
  },
};

export { Menus };