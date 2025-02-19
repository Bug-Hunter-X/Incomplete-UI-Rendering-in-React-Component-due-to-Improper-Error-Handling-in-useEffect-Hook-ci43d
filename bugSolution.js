```javascript
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          if (retryCount < 3) {
            console.log(`Retrying... Attempt ${retryCount + 1}`);
            setTimeout(fetchData, 1000);
            setRetryCount(retryCount + 1);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [retryCount]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error.message}
        <button onClick={() => setRetryCount(retryCount + 1)}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      {/* Process data here */}
      {JSON.stringify(data, null, 2)} 
    </div>
  );
}

export default MyComponent;
```