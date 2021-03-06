export class HttpClient{

     accessTokenKey : string = "access_token_key";

    /**
     * name
     */
    public PostJson(url : string,data : Object) :Promise<Response>{
       return fetch(url,{
          body: JSON.stringify(data), // must match 'Content-Type' header
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'Authorization':this.getAccessToken(),
            'content-type': 'application/json',
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // *client, no-referrer
        })
    }

    public getAccessToken() : string {
        return localStorage.getItem(this.accessTokenKey);
    }

    public setAccessToken(accessToken : string) : void {
        localStorage.setItem(this.accessTokenKey,accessToken);
    }
}