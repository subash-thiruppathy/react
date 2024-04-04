export const addData = (a:number,b:number) => {
    return a + b;
}

export const jsonToQueryString = (json: any) => {
    if(json) {
      return '?' + 
      Object.keys(json).map(function(key) {
          return encodeURIComponent(key) + '=' +
              encodeURIComponent(json[key]);
      }).join('&');
    } else {
      return ''
    }
  }