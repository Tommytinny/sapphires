import React, { useState } from 'react';
import { RaidSession } from '../contexts/RaidContext';

interface RaidFormProps {
  initialData?: Omit<RaidSession, 'id'> | null;
  onSubmit: (formData: Omit<RaidSession, 'id'>) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

const defaultFormData: Omit<RaidSession, 'id'> = {
  project_name: '',
  status: 'pending',
  progress: null,
  likes: null,
  retweets: null,
  comments: null,
  engagements: null,
  started_at: new Date().toISOString().slice(0, 16),
  estimated_end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
  twitter_link: '',
  duration: '1 hour',
  package: '12hrs',
  chain_id: '',
  token_address: '',
};

const RaidForm: React.FC<RaidFormProps> = ({
  initialData = null,
  onSubmit,
  onClose,
  isSubmitting,
  isEditing,
}) => {
  const [formData, setFormData] = useState<Omit<RaidSession, 'id'>>(
    initialData || defaultFormData
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            {isEditing ? 'Update Raid' : 'Add New Raid'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                name="project_name"
                value={formData.project_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
                placeholder="e.g., Dex Token"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Progress (%) *
              </label>
              <input
                type="number"
                name="progress"
                value={formData.progress}
                onChange={handleInputChange}
                min="0"
                max="100"
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Likes *
              </label>
              <input
                type="number"
                name="likes"
                value={formData.likes}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retweets *
              </label>
              <input
                type="number"
                name="retweets"
                value={formData.retweets}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comments *
              </label>
              <input
                type="number"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engagements *
              </label>
              <input
                type="number"
                name="engagements"
                value={formData.engagements}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Started At *
              </label>
              <input
                type="datetime-local"
                name="started_at"
                value={formData.started_at}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated End *
              </label>
              <input
                type="datetime-local"
                name="estimated_end"
                value={formData.estimated_end}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter Link
            </label>
            <input
              type="url"
              name="twitter_link"
              value={formData.twitter_link || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              placeholder="https://twitter.com/.../status/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
                placeholder="e.g., 1 hour"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package
              </label>
              <select
                name="package"
                value={formData.package || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
              >
                <option value="">Select package</option>
                <option value="12hrs">1 Day (12 hours) - $50</option>
                <option value="24hrs">2 Days (24 hours) - $90</option>
                <option value="48hrs">4 Days (48 hours) - $160</option>
                <option value="72hrs">3 Days (72 hours) - $220</option>
                <option value="168hrs">1 Week (168 hours) - $400</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chain ID
              </label>
              <input
                type="text"
                name="chain_id"
                value={formData.chain_id || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
                placeholder="e.g., solana"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Token Address
              </label>
              <input
                type="text"
                name="token_address"
                value={formData.token_address || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#117cb4] focus:ring-1 focus:ring-[#117cb4]"
                placeholder="e.g., contract address"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-[#117cb4] hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Raid' : 'Create Raid'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaidForm;
