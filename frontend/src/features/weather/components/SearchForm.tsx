import React, { FormEvent } from 'react';

interface SearchFormProps {
  city: string;
  setCity: (city: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ city, setCity, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <input
        type="text"
        placeholder="도시 이름을 입력하세요 (seoul, busan, tokyo, london, paris, new york 등)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? '검색 중...' : '검색'}
      </button>
    </form>
  );
};

export default SearchForm;
