import axios from "axios";
function getLead(leadId) {
  return axios.get(`/leads/${leadId}`);
}
function deleteLead(leadId) {
  return axios.delete(`/leads/${leadId}`);
}
function updateLead(leadId, payload) {
  return axios.put(`/leads/${leadId}`, payload);
}
function addLead(lead) {
  return axios.post(`/leads/`, lead);
}

export default {
  getLead,
  addLead,
  deleteLead,
  updateLead,
};
