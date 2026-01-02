import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Toast from './components/ui/Toast';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showToast('Failed to load contacts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (contactData) => {
    try {
      const response = await axios.post(API_URL, contactData);
      setContacts([response.data, ...contacts]);
      showToast('Contact added successfully!', 'success');
      return { success: true };
    } catch (error) {
      console.error('Error submitting contact:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit contact';
      showToast(errorMessage, 'error');
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const deleteUrl = `${API_URL}/${id}`;
      console.log('Deleting contact with URL:', deleteUrl, 'ID:', id);
      const response = await axios.delete(deleteUrl);
      console.log('Delete response:', response.data);
      setContacts(contacts.filter(contact => contact._id !== id));
      showToast('Contact deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting contact:', error);
      console.error('Error response:', error.response);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete contact';
      showToast(errorMessage, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Management
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Add New Contact
            </h2>
            <ContactForm onSubmit={handleContactSubmit} />
          </div>

          {/* Contact List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Contacts ({contacts.length})
            </h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-gray-600">Loading contacts...</p>
              </div>
            ) : (
              <ContactList contacts={contacts} onDelete={handleDeleteContact} />
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default App;

