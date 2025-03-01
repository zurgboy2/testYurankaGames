import { makeRequestCall } from "../api/api";

const  EventsSection= ()=>{
  //makeRequest('getActiveTournaments')
  // apiCall('tournament_script','getActiveTournaments').then(tournamentData => {
  //     const tournaments = JSON.parse(tournamentData.result);
  //     console.log(tournaments);
  // })
  // .catch(error => {
  //     console.error("Error loading tournaments:", error);
  //     alert("Error loading tournaments for next month. Please try again.");
  // });

  makeRequestCall('tournament_script','getActiveTournaments').then(tournamentData => {
    const tournaments = JSON.parse(tournamentData.result);
    console.log(tournaments);
})
.catch(error => {
    console.error("Error loading tournaments:", error);
    alert("Error loading tournaments for next month. Please try again.");
});
}



// const API_URL = 'https://isa-scavenger-761151e3e681.herokuapp.com';
const API_URL = 'https://isa-scavenger-761151e3e681.herokuapp.com';
// async function getProxyToken(action) {
//     const requestBody = { script_id: 'tournament_script', action };
//     try {
//         const response = await fetch(`${API_URL}/get_token`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', 
//                        'X-CORS-Bypass-Key': 'Naleefwhatare102035940123' 
//             },
//             body: JSON.stringify(requestBody)
//         });
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Token request failed:', errorText);
//             throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//         }
//         const data = await response.json();
//         if (data.token) return data.token;
//         throw new Error('Failed to get token: ' + JSON.stringify(data));
//     } catch (error) {
//         console.error('Error in getProxyToken:', error);
//         throw error;
//     }
// }

// async function makeRequest(action, additionalData = {}) {
//     try {
//         const token = await getProxyToken(action);
//         const requestBody = { token, action, script_id: 'tournament_script', ...additionalData };
//         const response = await fetch(`${API_URL}/proxy`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json',
//                 'X-CORS-Bypass-Key': 'Naleefwhatare102035940123'
//              },
//             body: JSON.stringify(requestBody)
//         });
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Proxy request failed:', errorText);
//             throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//         }
//         return response.json();
//     } catch (error) {
//         console.error('Error in makeRequest:', error);
//         throw error;
//     }
// }

const getProxyToken = async (scriptId, action) => {
    const makeRequest = async () => {
    //   const url = new URL('https://proxy-server-main-b19c53126a4f.herokuapp.com/get_token');
          //const url = new URL('https://isa-scavenger-761151e3e681.herokuapp.com');
          //const API_URL = 'https://isa-scavenger-761151e3e681.herokuapp.com/get_token';
          const API_URL = 'https://isa-scavenger-761151e3e681.herokuapp.com/get_token?bypass_key=Naleefwhatare102035940123';

      const response = await fetchWithTimeout(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CORS-Bypass-Key': 'Naleefwhatare102035940123'
        },
        body: JSON.stringify({ 
          script_id: scriptId, 
          action: action,
        })
      }, 60000); // 60 seconds for token request
  
      if (!response.ok) {
        const errorText = await response.text();
       handleApiError(new Error(errorText), response);
      }
  
      const data = await response.json();
      if (data.token) return data.token;
      throw new Error('Failed to get token: ' + JSON.stringify(data));
    };
  
   return retryWithBackoff(makeRequest);
  };

const apiCall = async (scriptId, action, additionalData = {}) => {
    const noRetry = scriptId === 'admin_tournament_script' && action === 'createEvent';
    const makeRequest = async () => {
      const proxyAuthToken = await getProxyToken(scriptId, action);  // renamed from token
      //const url = new URL('https://proxy-server-main-b19c53126a4f.herokuapp.com/proxy');
     // const url = new URL('https://isa-scavenger-761151e3e681.herokuapp.com');
     const API_URL = 'https://isa-scavenger-761151e3e681.herokuapp.com/proxy?bypass_key=Naleefwhatare102035940123';
      
     const response = await fetchWithTimeout(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'X-CORS-Bypass-Key': 'Naleefwhatare102035940123' 
        },
        body: JSON.stringify({ 
          token: proxyAuthToken,  
          action, 
          script_id: scriptId, 
          ...additionalData 
        })
      }, 180000);
  
      if (!response.ok) {
        const errorText = await response.text();
        handleApiError(new Error(errorText), response);
      }
      return await response.json();
    };
  
    return retryWithBackoff(makeRequest, 5, 2000, noRetry);
  };

  const handleApiError = (error, response) => {
    console.error('API call failed:', error);
    if (response) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Error setting up request');
    }
  };

  
const retryWithBackoff = async (fn, maxRetries = 3, initialDelay = 1000, forceNoRetry = false) => {
    if (forceNoRetry) return fn();
    
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await fn();
      } catch (error) {
        retries++;
        if (retries === maxRetries) throw error;
        const delayTime = initialDelay * Math.pow(2, retries - 1);
        console.log(`Attempt ${retries} failed. Retrying in ${delayTime}ms...`);
        await delay(delayTime);
      }
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithTimeout = async (url, options, timeout = 120000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };



 export default EventsSection; 