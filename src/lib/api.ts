// Client-side functions to call the API
export const updateUserStats = async (fid: string, outcome: 'win' | 'loss' | 'draw') => {
    const response = await fetch('/api/users/stats', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fid, outcome }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user stats');
    }
    
    return response.json();
  };
  
  export const getUserStats = async (fid: string) => {
    const response = await fetch(`/api/users/stats?fid=${fid}`);
    
    if (!response.ok) {
      throw new Error('Failed to get user stats');
    }
    
    return response.json();
  };