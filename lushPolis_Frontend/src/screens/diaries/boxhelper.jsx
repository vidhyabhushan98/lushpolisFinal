

export function generateMonthOptions() {
    const currentMonth = new Date().getMonth() + 1; // Get the current month
    
    const months = [
      { value: '1', label: 'January' },
      { value: '2', label: 'February' },
      { value: '3', label: 'March' },
      { value: '4', label: 'April' },
      { value: '5', label: 'May' },
      { value: '6', label: 'June' },
      { value: '7', label: 'July' },
      { value: '8', label: 'August' },
      { value: '9', label: 'September' },
      { value: '10', label: 'October' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' },
    ];
  
    return months
      .filter((month) => parseInt(month.value) <= currentMonth) // Filter months up to the current month
      .map((month) => (
        <option key={month.value} value={month.value}>
          {month.label}
        </option>
      ));
  }
  

export function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  }

export const containerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

export  const headerStyle = {
  background: '#333',
  color: 'white',
  padding: '10px',
};

export const leftColumnStyle = {
  backgroundColor: '#f8f8f8',
  border: '1px solid #ddd',
  maxHeight: '80vh',
  overflowY: 'auto',
  padding: '10px',
  borderRadius: '5px',
};
export const rightColumnStyle = {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    height: '600px',
    overflowY: 'auto',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

