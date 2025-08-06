import { useState } from 'react';
import { API_URL } from '../utils/constants';

const useDental = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecords = async (childId) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/dental-record/${childId}`);
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async (payload) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/dental-record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data && data._id) {
        setRecords([...records, data]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { records, loadRecords, createRecord, loading };
};

export default useDental;