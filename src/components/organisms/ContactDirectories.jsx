import React, { useState } from 'react';

export const ContactDirectories = () => {
  const [contacts] = useState([
    { designation: "Honorable President", name: "Sri Alok Mohan, IPS.", phoneNumber: "+91 1234567890" },
    { designation: "President", name: "Sri B Dayanand, IPS.", phoneNumber: "+91 9876543210" },
    { designation: "Secretary", name: "Sri Ramakrishna Prasad.", phoneNumber: "+91 4567891230" },
    { designation: "Mess Officer", name: "Sri N S Prakash. ", phoneNumber: "+91 9480805826" }
  ]);
  const tableHeaderStyle = {
    backgroundColor: '#007BFF',
    fontWeight: 'bold',
    padding: '8px',
  };

  const tableCellStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  };

  const rowStyle = {
    backgroundColor: '#f2f2f2',
  };

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Designation</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} style={index % 2 === 0 ? rowStyle : null}>
              <td style={tableCellStyle}>{contact.designation}</td>
              <td style={tableCellStyle}>{contact.name}</td>
              <td style={tableCellStyle}>{contact.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactDirectories;
