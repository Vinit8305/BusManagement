import { useState, useEffect } from 'react';
import { busService } from '../services/busService';
import type { busResponseDto } from '../types/bus/busResponseDto';

export const useBuses = () => {
    const [buses, setBuses] = useState<busResponseDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Buses fetch karne ka main function
    const fetchBuses = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await busService.getAllBuses();
            setBuses(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch buses data');
        } finally {
            setLoading(false);
        }
    };

    // Initial load par auto call hoga
    useEffect(() => {
        fetchBuses();
    }, []);

    return {
        buses,
        loading,
        error,
        refreshBuses: fetchBuses // Re-fetch karne ke liye (Nayi bus add/delete hone par)
    };
};