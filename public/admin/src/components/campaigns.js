import React, { Component } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js"; // Import Helper from your helper file

class AdCampaigns extends Component {
  constructor(props) {
    super(props);
    this.request_result_ref = React.createRef("");
    this.state = {
      
        campaigns: [],
        deletedIds: [], // Track deleted IDs
        campaign_pages: [
            { 
                text: "Single Page", 
                value: "single_page", 
                positions: [
                    { text: "Before Title", value: "before_title" },
                    { text: "After Title", value: "after_title" },
                    { text: "Inside Content 1", value: "inside_content_1" },
                    { text: "Inside Content 2", value: "inside_content_2" },
                    { text: "Inside Content 3", value: "inside_content_3" },
                    { text: "Inside Content 4", value: "inside_content_4" },
                    { text: "After Contents", value: "after_contents" },
                    { text: "In Sidebar 1", value: "in_sidebar_1" },
                    { text: "In Sidebar 2", value: "in_sidebar_2" },
                    { text: "In Sidebar 3", value: "in_sidebar_3" },
                    { text: "In Sidebar 4", value: "in_sidebar_4" }
                ]
            },
            { 
              text: "Tutorial Page", 
              value: "tutorial_page", 
              positions: [
                  { text: "Before Title", value: "before_title" }, 
                  { text: "After Title", value: "after_title" }, 
                  { text: "After Tutorial Tab", value: "after_tutorial_tab" }, 
                  { text: "After Tutorial Description", value: "after_tutorial_description" }, 
                  { text: "Inside Chapter Ad# 1", value: "inside_chapter_ad_1" }, 
                  { text: "Inside Chapter Ad# 2", value: "inside_chapter_ad_2" }, 
                  { text: "Inside Chapter Ad# 3", value: "inside_chapter_ad_3" }, 
                  { text: "Between Rows Ad# 1", value: "between_row_ad_1" }, 
                  { text: "Between Rows Ad# 2", value: "ibetween_row_ad_2" }, 
                  { text: "Between Rows Ad# 3", value: "between_row_ad_3" }, 
                  { text: "Between Rows Ad# 4", value: "between_row_ad_4" }, 
                  { text: "After All Chapters", value: "after_all_chapters" }, 
              ]
          },
          { 
            text: "All Tutorials Page", 
            value: "all_tutorials_page", 
            positions: [
                { text: "Before Section of Title 1", value: "before_section_title_1" }, 
                { text: "After Section of Title 1", value: "after_section_title_1" },  
                { text: "End of Category Section 1", value: "end_of_category_section_1" },
                
                { text: "Before Section of Title 2", value: "before_section_title_2" }, 
                { text: "After Section of Title 2", value: "after_section_title_2" },  
                { text: "End of Category Section 2", value: "end_of_category_section_2" },

                { text: "Before Section of Title 3", value: "before_section_title_3" }, 
                { text: "After Section of Title 3", value: "after_section_title_3" },  
                { text: "End of Category Section 3", value: "end_of_category_section_3" },

                { text: "Before Section of Title 4", value: "before_section_title_4" }, 
                { text: "After Section of Title 4", value: "after_section_title_4" },  
                { text: "End of Category Section 4", value: "end_of_category_section_4" },

                { text: "Before Section of Title 5", value: "before_section_title_5" }, 
                { text: "After Section of Title 5", value: "after_section_title_5" },  
                { text: "End of Category Section 5", value: "end_of_category_section_5" },

                { text: "Before Section of Title 6", value: "before_section_title_6" }, 
                { text: "After Section of Title 6", value: "after_section_title_6" },  
                { text: "End of Category Section 6", value: "end_of_category_section_6" },
            ]
        }
        ],    

        is_pressed: false,
        show_message: "",
        request_status_class: "",
        request_message: ""
    };
  }

  componentDidMount() {
    // Fetch existing campaigns from the API if needed
    this.fetchCampaigns();
  }

  fetchCampaigns = async () => {
    try {
      const response = await Helper.sendRequest({
        api: 'ad_campaigns',
        method: 'GET',
        data: {}
      });
      this.setState({ campaigns: response.data });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  addCampaign = () => {
    this.setState((prevState) => ({
      campaigns: [
        ...prevState.campaigns,
        { _id: Helper.generateObjectId(), code: "", page: "", is_enabled: false, position: "", all_positions: []}
      ]
    }));
  };

  handleChange = (e, campaignIndex) => {
    const { name, value, type, checked } = e.target;
    
    //all_positions
    
    const newCampaigns = [...this.state.campaigns];
    newCampaigns[campaignIndex][name] = type === 'checkbox' ? checked : value;
    
    if(name == "page") {
        var campages = this.state.campaign_pages.find(x => x.value == value );
        newCampaigns[campaignIndex]["all_positions"] = campages.positions
    }
     
    this.setState({ campaigns: newCampaigns });
  };

  deleteCampaign = (campaignIndex) => {
    const campaign = this.state.campaigns[campaignIndex];
    if (campaign._id) {
      this.setState((prevState) => ({
        deletedIds: [...prevState.deletedIds, campaign._id],
      }));
    }
    const newCampaigns = this.state.campaigns.filter((_, index) => index !== campaignIndex);
    this.setState({ campaigns: newCampaigns });
  };

  validateCampaigns = () => {
    const { campaigns } = this.state;
    for (let campaign of campaigns) {
      if (!campaign.code || !campaign.page || !campaign.position) {
        return false;
      }
    }
    return true;
  };

  saveCampaigns = async () => {
    
    if (!this.validateCampaigns()) {
      this.setState({
        request_status_class: 'error',
        request_message: 'Please fill in all required fields.',
        show_message: 'show_message'
      });
      return;
    }

    this.setState({ is_pressed: true });
    try {
      const response = await Helper.sendRequest({
        api: 'ad_campaign/create-update',
        method: 'POST',
        data: { campaigns: this.state.campaigns, deletedIds: this.state.deletedIds } // Include deleted IDs
      });
      if (response.is_error) {
        throw new Error(response.message);
      }
      this.setState({
        request_status_class: 'success',
        request_message: 'Campaigns saved successfully!',
        show_message: 'show_message',
        is_pressed: false,
        deletedIds: [] // Clear deleted IDs after successful save
      });
    } catch (error) {
      this.setState({
        request_status_class: 'error',
        request_message: error.message || 'An error occurred while saving the campaigns.',
        show_message: 'show_message',
        is_pressed: false
      });
    }
  };

  render() { 
    const positions = ["Header", "Footer", "Sidebar", "Body"];

    return (
      <div id="app">
        <NavbarContainer />
        <SidebarContainer />
        <section className="section main-section">
          <div style={{ margin: "20px" }}>
            
            <button onClick={this.addCampaign} style={styles.addButton}>Add Campaign</button>
            
            {this.state.campaigns.map((campaign, campaignIndex) => {
                
                if( campaign.all_positions == undefined ) {
                    var pages_data = this.state.campaign_pages.find( x => x.value == campaign.page);

                    campaign.all_positions = [];
                    if(pages_data != undefined) {
                        campaign.all_positions = pages_data.positions
                    }
                }

                return (
                    <div key={campaign._id} style={styles.campaignItem}>
                      <div style={styles.campaignHeader}>
                          
                        <select
                          name="page"
                          value={campaign.page}
                          onChange={(e) => this.handleChange(e, campaignIndex)}
                          style={styles.select}
                        >
                          <option value="">Select Page</option>
                          {
                              this.state.campaign_pages.map((page, index) => { 
                                  return <option key={index} value={page.value}>{page.text}</option>
                              })
                          }
                        </select>
      
                        <select
                          name="position"
                          value={campaign.position}
                          onChange={(e) => this.handleChange(e, campaignIndex)}
                          style={styles.select}
                        >
                          <option value="">Select Position</option>
                          {campaign.all_positions.map(position => (
                            <option key={position.value} value={position.value}>{position.text}</option>
                          ))}
                        </select>
                        <label style={styles.label}>
                          <input
                            type="checkbox"
                            name="is_enabled"
                            checked={campaign.is_enabled}
                            onChange={(e) => this.handleChange(e, campaignIndex)}
                          />
                          Enabled
                        </label>
                        <button onClick={() => this.deleteCampaign(campaignIndex)} style={styles.deleteButton}>Delete</button>
                      </div>
                      <textarea
                        name="code"
                        value={campaign.code}
                        placeholder="Campaign Code"
                        onChange={(e) => this.handleChange(e, campaignIndex)}
                        style={styles.textarea}
                      />
                    </div>
                );
            })}
          </div>

          <div ref={this.request_result_ref} className={`${this.state.request_status_class} ${this.state.show_message} request-result-notifiction`}>
            {this.state.request_message}
          </div>

          <div style={styles.stickyFooter}>
            <div style={styles.footerButtons}>
              <a onClick={this.saveCampaigns} className="button blue" style={styles.saveButton}>
                {this.state.is_pressed ? <span className="loader"></span> : "Save"}
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const styles = {
  campaignItem: {
    background: "#f1f1f1",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    border: "1px solid #000",
    marginTop: "35px",
  },
  campaignHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  textarea: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    width: "100%",
    marginTop: "10px",
  },
  select: {
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

export { AdCampaigns };
