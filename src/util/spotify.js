let userToken = "";
let clientID = "4e9db861d2e64d499816846ae84be3c9";
let URI = "http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        if (userToken){
            return userToken;
        }else{
            const userTokenMatch = window.location.href.match(/access_token=([^&]*)/); //get the current URL + params with RegExp
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); //get the current URL + params with RegExp

            if (userTokenMatch && expiresInMatch){
                userToken = userTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                window.setTimeout(() => userToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return userToken;
            }else{
                let redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${URI}`;
                window.location = redirect;
            }
        }
    },
    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response =>{
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks){
                return [];
            }else{
                return jsonResponse.tracks.items.map(track =>{
                    return {
                        id: track.id,
                        name: track.name,
                        artists: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                 }
                );
            }
        })
    },
    savePlaylist(name, trackUris){
        if (!(name && trackUris)){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;
        return fetch('https://api.spotify.com/v1/me',{headers: headers}
        ).then(response => {
            return response.json();
        }).then(jsonResponse =>{
            userId = jsonResponse.id;
            return (fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                        headers:headers,
                        method:'POST',
                        body: JSON.stringify({name:name})
                    }).then( response => {
                        return response.json()
                    }).then(jsonResponse =>{
                        const playlistId = jsonResponse.id;
                        return fetch(`/v1/users/${userId}/playlists/${playlistId}/tracks`,
                        {
                            headers:headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackUris})
                            
                        });
                    })
                )
        })

    }
}


export default Spotify;