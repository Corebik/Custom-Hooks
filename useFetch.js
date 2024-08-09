import { useEffect, useState } from "react"

const localCache = {};

export const useFetch = ( url ) => {

    const [state, setState] = useState({ 
        data: null, 
        isLoading: true, 
        hasError: null,
        error: null
    });

    useEffect(() => {
      
        getFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ url ]);

    const setLoadingState = () => {

        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        });

    }

    const getFetch = async() => {

        if( localCache[url] ) {

            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });

            return;
        
        }

        setLoadingState();
        const resp = await fetch( url );

        await new Promise( resolve => setTimeout(resolve, 1000) );

        if(!resp.ok) {

            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    status: resp.status,
                    message: resp.statusText
                }
            });

            console.log( state );

            return;

        }

        const data = await resp.json();
        // console.log( data );

        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        });

        //Manejo de Caché

        localCache[url] = data;

    }


    

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError
  }
}
