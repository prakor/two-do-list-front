// src/hooks/useInboxItems.js
import { useEffect, useState } from "react";
import inboxService from "@services/inboxService";

export function useInboxItems() {
  const [inboxItems, setInboxItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchInboxItems() {
    try {
      setLoading(true);
      setError(null);

      const data = await inboxService.getInboxItems();
      
      setInboxItems(data);
      console.log('--- Fetched inbox items:', data);
    } catch (err) {
      setError(err.message || "Failed to fetch inbox items");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInboxItems();
  }, []);

  return {
    inboxItems,
    loading,
    error,
    refetch: fetchInboxItems,
  };
}