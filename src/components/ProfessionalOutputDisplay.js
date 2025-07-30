import React from 'react';
// import { Calendar, Globe, FileText, Clock } from 'lucide-react';

export default function ProfessionalOutputDisplay({ data }) {
  const { Calendar, Globe, FileText, Clock } = {
    Calendar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Globe: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    FileText: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Clock: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const truncateSnippet = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Extraction Results
            </h2>
            <p className="text-gray-600">
              Successfully processed {data.length} record{data.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            ✓ Complete
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {data.map((record, index) => (
          <div key={record.id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {record.fields?.title || record.title || 'Untitled'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {record.createdTime && (
                      <div className="flex items-center gap-1">
                        <Calendar />
                        <span>Created: {formatDate(record.createdTime)}</span>
                      </div>
                    )}
                    {(record.fields?.extractedAt || record.extractedAt) && (
                      <div className="flex items-center gap-1">
                        <Clock />
                        <span>Extracted: {formatDate(record.fields?.extractedAt || record.extractedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  Record #{index + 1}
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText />
                  <label className="text-sm font-medium text-gray-700">Content Snippet</label>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-800 leading-relaxed">
                    {truncateSnippet(record.fields?.snippet || record.snippet || 'No content available')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {record.id && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="font-medium text-gray-700 mb-1">Record ID</div>
                    <div className="text-gray-600 font-mono text-xs break-all">
                      {record.id}
                    </div>
                  </div>
                )}
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="font-medium text-gray-700 mb-1">Content Length</div>
                  <div className="text-gray-600">
                    {(record.fields?.snippet || record.snippet || '').length} characters
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="font-medium text-gray-700 mb-1">Status</div>
                  <div className="text-green-600 font-medium">
                    ✓ Processed
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Technical Details */}
      <details className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
          View Raw JSON Response
        </summary>
        <div className="px-6 pb-6">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
}