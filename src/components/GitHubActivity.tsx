import React, { useMemo, useEffect, useState } from 'react';
import { ActivityCalendar, type Activity } from 'react-activity-calendar';

interface Props {
  data?: Activity[];
  username?: string;
  endpoint?: string;
}

export const GitHubActivity = ({ data, username, endpoint }: Props) => {
  const currentYear = new Date().getFullYear();
  const [activityData, setActivityData] = useState<Activity[]>(data ?? []);
  const [loading, setLoading] = useState<boolean>((data?.length ?? 0) === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ((data?.length ?? 0) > 0) return;
    if (!username && !endpoint) {
      setLoading(false);
      setError('Missing GitHub username.');
      return;
    }

    const cacheKey = `github-activity:${endpoint || username || 'default'}`;
    const cacheTtlMs = 6 * 60 * 60 * 1000;
    const now = Date.now();
    let usedCache = false;

    try {
      const cachedRaw = localStorage.getItem(cacheKey);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (Array.isArray(cached?.data)) {
          setActivityData(cached.data);
          setLoading(false);
          usedCache = true;
        }
        if (typeof cached?.timestamp === 'number' && now - cached.timestamp < cacheTtlMs) {
          setError(null);
          return;
        }
      }
    } catch {
      /* ignore cache parsing issues */
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const url = endpoint || `https://github-contributions-api.jogruber.de/v4/${username}`;

    if (!usedCache) setLoading(true);
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        const contributions = payload?.contributions || [];
        setActivityData(contributions);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ data: contributions, timestamp: now }));
        } catch {
          /* ignore cache write issues */
        }
        setError(null);
      })
      .catch((err) => {
        setError(err?.message || 'Failed to load activity.');
        setActivityData([]);
      })
      .finally(() => {
        setLoading(false);
        clearTimeout(timeoutId);
      });

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [username, endpoint]);

  // Sort and filter for current year only
  const filteredData = useMemo(() => {
    return activityData
      .filter(item => {
        const year = parseInt(item.date.split('-')[0], 10);
        return year === currentYear;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [activityData, currentYear]);

  const totalContributions = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.count, 0);
  }, [filteredData]);

  if (loading) {
    return (
      <div className="text-text-muted text-sm py-4">
        Loading activity…
      </div>
    );
  }

  if (error || filteredData.length === 0) {
    return (
      <div className="text-text-muted text-sm py-4">
        Unable to load activity graph.{' '}
        <a
          href="https://github.com/albanistrefi"
          className="text-accent-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-text-primary">
          {totalContributions} contributions in {currentYear}
        </h3>
      </div>
      
      <div className="github-activity-calendar flex justify-center">
        <ActivityCalendar
          data={filteredData}
          showWeekdayLabels
          blockSize={11}
          blockMargin={3}
          fontSize={12}
          theme={{
            light: [
              'var(--calendar-level-0)',
              'var(--calendar-level-1)',
              'var(--calendar-level-2)',
              'var(--calendar-level-3)',
              'var(--calendar-level-4)',
            ],
            dark: [
              'var(--calendar-level-0)',
              'var(--calendar-level-1)',
              'var(--calendar-level-2)',
              'var(--calendar-level-3)',
              'var(--calendar-level-4)',
            ],
          }}
          labels={{
            months: [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            legend: {
              less: 'Less',
              more: 'More',
            },
          }}
        />
      </div>
    </div>
  );
};
