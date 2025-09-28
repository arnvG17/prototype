
  # Rural HealthConnect App Design

  This is a code bundle for Rural HealthConnect App Design. The original project is available at https://www.figma.com/design/GzVblEKhZeE3E2y7zPQfvh/Rural-HealthConnect-App-Design.

  ## Running the code

  Run `npm i` to install the dependencies.



// --- START: Helper Functions ---

/**
 * Formats a timestamp into a readable date and time string.
 */
const formatTime = (timestamp) => {
  if (!timestamp) return 'N/A';
  // Check if the timestamp is a string or number that represents a Date
  const date = new Date(timestamp);
  // Check if the date object is valid
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString(); 
};

// --- END: Helper Functions ---

export default function AdminDashboard() {
  // Original state for the static admin list
  const [users, setUsers] = useState([]);
  
  // 💡 New State: To hold the real-time leaderboard data
  const [leaderboardData, setLeaderboardData] = useState({
      firstCommitRankings: [], // For the 'earliest commit' logic
      recentActivity: [], 
      totalCommits: [],
  });

  const [isConnected, setIsConnected] = useState(false);

  const teamNamea = localStorage.getItem("teamName");
  console.log("Team Admin Token:", teamNamea);

  // 1. Static Data Fetch (Initialization Logic)
  useEffect(() => {
    // This runs once to get the static list of selected repos for general admin viewing
    axios
      .get(`${BACKEND_URL}/admin/selected-repos`, {
        headers: { Authorization: `Bearer ${teamNamea}` }, 
      })
      .then((res) => {
        const fetchedUsers = res.data.users || [];
        setUsers(fetchedUsers);
        
        // 💡 NEW: Initialize Leaderboard with the static list of teams
        const initialRankings = fetchedUsers
          // Filter out teams that haven't registered a repo yet
          .filter(user => user.selectedRepo) 
          .map(user => ({
            teamName: user.teamName,
            // Use null/undefined as a placeholder until real commit data arrives
            firstCommitTimestamp: null, 
        }));

        setLeaderboardData(prevData => ({
            ...prevData,
            firstCommitRankings: initialRankings,
        }));

      })
      .catch((err) => {
        console.error("Error fetching static admin data:", err);
        setUsers([]);
      });
  }, [teamNamea]);

  // 2. Real-Time Socket.IO Setup (The new logic)
  useEffect(() => {
      // Establish the permanent connection to the server
      const socket = io(BACKEND_URL);

      // Connection Status
      socket.on('connect', () => {
          setIsConnected(true);
          console.log('🔌 Socket.IO Connected for real-time updates.');
      });

      socket.on('disconnect', () => {
          setIsConnected(false);
          console.log('❌ Socket.IO Disconnected.');
      });

      // Listen for the server broadcast
      // This event is fired by the server *every time* a commit webhook is received
      socket.on('leaderboard:update', (data) => {
          console.log("this the data ", data)
          console.log('✅ Real-time Leaderboard Update Received.');
          console.log( "learderboard data rn",leaderboardData)
          
          // Update the state, which triggers a re-render of the components below
          setLeaderboardData({
              firstCommitRankings: data.firstCommitRankings || [], 
              recentActivity: data.recentActivity || [],
              totalCommits: data.totalCommits || [],
          });
      });

      // Cleanup: Disconnect the socket when the component is removed
      return () => {
          socket.close();
          socket.off('leaderboard:update');
      };
  }, []); // Runs only on mount

  const { firstCommitRankings } = leaderboardData;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-indigo-700">Admin Leaderboard Dashboard</h1>
        <p className={`text-sm font-medium mt-1 ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
            Status: {isConnected ? 'LIVE (Real-time tracking active)' : 'Disconnected. Check server.'}
        </p>
      </header>

      {/* --- REAL-TIME LEADERBOARD SECTION (NEW) --- */}
      <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            🏆 Real-Time Ranking: First Commit First    
<p>{leaderboardData}</p>
<p>{data}</p>

        </h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-200">
                <thead className="bg-indigo-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Team</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">First Commit Time (Earliest Wins)</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {firstCommitRankings.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                Waiting for initial team list...
                            </td>
                        </tr>
                    ) : (
                        firstCommitRankings.map((u, index) => (
                            // Highlight the top 3 spots if commit time is present
                            <tr key={u.teamName} 
                                className={(index < 3 && u.firstCommitTimestamp) ? 'bg-yellow-50 font-bold' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {u.firstCommitTimestamp ? index + 1 : '-'}
                                    </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.teamName}</td>
                                {/* Assuming the server sends 'firstCommitTimestamp' */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatTime(u.firstCommitTimestamp)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </section>

      {/* --- STATIC ADMIN DATA SECTION (ORIGINAL CODE) --- */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📋 All Submitted Repositories</h2>
        <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selected Repo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.teamName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {u.selectedRepo ? (
                      <a href={u.selectedRepo} target="_blank" rel="noreferrer" className="hover:underline">
                        {u.selectedRepo}
                      </a>
                    ) : (
                      <span className="text-gray-500">No repo selected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
