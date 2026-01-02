import React, { useState } from 'react';
import Button from './ui/Button';
import Select from './ui/Select';

const ContactList = ({ contacts, onDelete }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'date', label: 'Date Created' }
  ];

  const sortContacts = (contactsToSort) => {
    const sorted = [...contactsToSort];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'date':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        default:
          return 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  };

  const sortedContacts = sortContacts(contacts);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await onDelete(id);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No contacts yet. Add your first contact!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sorting Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <Select
            label="Sort by"
            value={sortBy}
            onChange={handleSortChange}
            options={sortOptions}
            className="w-40"
          />
          <Button
            variant="outline"
            onClick={toggleSortOrder}
            className="mt-6 sm:mt-0"
            title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {contact.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {contact.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {contact.message || <span className="text-gray-400 italic">No message</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(contact._id)}
                        className="text-xs"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {sortedContacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(contact._id)}
                      className="text-xs"
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {contact.email}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span> {contact.phone}
                    </p>
                  </div>
                  {contact.message && (
                    <div className="text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Message:</span> {contact.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;

