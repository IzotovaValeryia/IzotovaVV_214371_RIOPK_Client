import React from 'react';
import axios from 'axios';
import authHeader from "../services/auth-header";

class ReportAllBidsButton extends React.Component {
  downloadExcel = () => {
    axios({
      url: 'https://localhost:7232/api/Bids/ReportAllBids',
      method: 'GET',
      responseType: 'blob', 
      headers: authHeader()
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  
  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.downloadExcel}>
          <i class="fa-solid fa-file-excel"></i> Отчёт по заказам
        </button>
      </div>
    );
  }
}

export default ReportAllBidsButton;
