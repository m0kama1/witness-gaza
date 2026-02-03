
import React from 'react';
import { Search, Filter, Calendar, MapPin, Tag, X } from 'lucide-react';
import { Category, Region } from '../types';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  selectedRegions: Region[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<Region[]>>;
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  selectedRegions,
  setSelectedRegions,
  dateRange,
  setDateRange,
}) => {
  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleRegion = (reg: Region) => {
    setSelectedRegions(prev => 
      prev.includes(reg) ? prev.filter(r => r !== reg) : [...prev, reg]
    );
  };

  const clearAll = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedRegions([]);
    setDateRange({ start: '', end: '' });
  };

  return (
    <div className="space-y-4 text-right">
      <div className="flex flex-col md:flex-row gap-4 flex-row-reverse">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن موقع، كلمة مفتاحية، أو نوع حادثة..."
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:border-red-500/50 transition-all text-right"
            dir="rtl"
          />
        </div>

        {/* Date Filters */}
        <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/5 rounded-xl px-3 py-1 flex-row-reverse">
          <Calendar className="w-4 h-4 text-zinc-500" />
          <input 
            type="date" 
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="bg-transparent text-xs text-zinc-300 focus:outline-none cursor-pointer"
          />
          <span className="text-zinc-600">إلى</span>
          <input 
            type="date" 
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="bg-transparent text-xs text-zinc-300 focus:outline-none cursor-pointer"
          />
        </div>

        <button 
          onClick={clearAll}
          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all flex items-center gap-2 flex-row-reverse"
        >
          <X className="w-3 h-3" />
          مسح الكل
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center flex-row-reverse">
        {/* Region Tags */}
        <div className="flex items-center gap-2 flex-row-reverse">
          <MapPin className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-2">المناطق:</span>
          <div className="flex flex-wrap gap-2 flex-row-reverse">
            {Object.values(Region).map((reg) => (
              <button
                key={reg}
                onClick={() => toggleRegion(reg)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${
                  selectedRegions.includes(reg)
                    ? 'bg-red-500/20 border-red-500/50 text-red-500'
                    : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-4 bg-white/10" />

        {/* Category Tags */}
        <div className="flex items-center gap-2 flex-row-reverse">
          <Tag className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-2">الفئات:</span>
          <div className="flex flex-wrap gap-2 flex-row-reverse">
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${
                  selectedCategories.includes(cat)
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-500'
                    : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
