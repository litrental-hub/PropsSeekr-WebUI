import React, { useState } from 'react';
import { Save, Building } from 'lucide-react';

const AddPropertyPage: React.FC = () => {
  const [formData, setFormData] = useState({
    SenderName: '',
    MessageDate: '',
    ListingType: 'Sale',
    PropertyType: '',
    Configuration: '',
    Location: '',
    ProjectName: '',
    Size: '',
    SizeUnit: '',
    Width: '',
    Length: '',
    Price: '',
    PriceUnit: '',
    PricePerUnit: '',
    Facing: '',
    RoadInfo: '',
    Furnishing: '',
    ContactName: '',
    ContactNumber: '',
    RawText: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Parse size back into an array as specified in the mock data
    const payload = {
      ...formData,
      Size: formData.Size ? formData.Size.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n)) : [],
      Width: formData.Width ? Number(formData.Width) : null,
      Length: formData.Length ? Number(formData.Length) : null,
      Price: formData.Price ? Number(formData.Price) : null,
      PricePerUnit: formData.PricePerUnit ? Number(formData.PricePerUnit) : null,
    };

    console.log('Form submitted:', payload);
    alert('Property details logged to console. API endpoint will be integrated later.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center space-x-3 bg-slate-50">
          <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Add New Property</h2>
            <p className="text-sm text-slate-500"></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Information */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4 border-b pb-2">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sender Name</label>
                <input type="text" name="SenderName" value={formData.SenderName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message Date</label>
                <input type="date" name="MessageDate" value={formData.MessageDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Listing Type</label>
                <select name="ListingType" value={formData.ListingType} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                <input type="text" name="PropertyType" value={formData.PropertyType} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                <input type="text" name="ProjectName" value={formData.ProjectName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Configuration</label>
                <input type="text" name="Configuration" value={formData.Configuration} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
          </div>

          {/* Location & Dimensions */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4 border-b pb-2">Location & Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" name="Location" value={formData.Location} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Size (comma separated numbers)</label>
                <input type="text" name="Size" value={formData.Size} onChange={handleChange} placeholder="e.g. 66, 120" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Size Unit</label>
                <select name="SizeUnit" value={formData.SizeUnit} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                  <option value="" disabled>Select unit</option>
                  <option value="sqft">sqft</option>
                  <option value="sqyd">sqyd</option>
                  <option value="sqmt">sqmt</option>
                  <option value="acres">acres</option>
                  <option value="hectares">hectares</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Width</label>
                <input type="number" name="Width" value={formData.Width} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Length</label>
                <input type="number" name="Length" value={formData.Length} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
          </div>

          {/* Pricing & Additional Info */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4 border-b pb-2">Pricing & Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                <input type="number" name="Price" value={formData.Price} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price Unit</label>
                <input type="text" name="PriceUnit" value={formData.PriceUnit} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price Per Unit</label>
                <input type="number" name="PricePerUnit" value={formData.PricePerUnit} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Facing</label>
                <input type="text" name="Facing" value={formData.Facing} onChange={handleChange} placeholder="e.g. North" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Road Info</label>
                <input type="text" name="RoadInfo" value={formData.RoadInfo} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Furnishing</label>
                <input type="text" name="Furnishing" value={formData.Furnishing} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
          </div>

          {/* Contact & Raw Text */}
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4 border-b pb-2">Contact & Raw Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Name</label>
                <input type="text" name="ContactName" value={formData.ContactName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                <input type="text" name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Raw Text</label>
                <textarea name="RawText" value={formData.RawText} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"></textarea>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              <Save className="w-4 h-4 mr-2" />
              Save Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
