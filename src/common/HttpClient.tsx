export class HttpClient{

    public static setAccessToken(accessToken : string) : void {
        localStorage.setItem(this.accessTokenKey,accessToken);
    }

    public static PostJson(url : string,data : object) :Promise<Response>{
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

     private static accessTokenKey : string = "access_token_key";

     private static getAccessToken() : string {
        return localStorage.getItem(this.accessTokenKey);
    }
}